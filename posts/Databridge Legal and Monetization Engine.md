## 1. Context

The first case study treated the marketplace as a catalog of whole datasets sold under flat licenses. That model fits bulk pretraining corpora. It fits poorly with how models are now built and used.

Three shifts change the economics:

- **Agentic and RAG workloads consume slices, not files.** A retrieval evaluation may need a few hundred labeled query-answer pairs out of a 2 million row corpus. A buyer paying for the whole file pays for 95% waste.
- **Fine-tuning is iterative.** Teams run many short training and eval cycles. They want to pay per experiment, not per download, and they want to stop when results plateau.
- **Provenance is now a compliance product.** The EU AI Act's full enforcement date of August 2, 2026 requires documented, traceable training data for high-risk systems. Buyers pay for proof of rights as much as for the data itself.

So the engine must price three things at once: the data slice, the permitted use, and the verified consumption. This section defines the licensing model and the metering layer that makes it real.

### Objectives

This section must prove and decide five things:

1. **Pricing unit.** Choose the billing unit (rows, tokens, eval runs, or model-weight usage) and show why it matches how buyers actually consume data.
2. **License tiers.** Define tiers for internal RAG evaluation, commercial model training, and open-source release, with clear permitted-use boundaries.
3. **Metering.** Specify how consumption is measured and proven to both sides without exposing the data itself.
4. **Derivative rights.** State who owns model weights trained on licensed data, and what the license can and cannot say about it under current and expected EU rules.
5. **Unit economics.** Show that a worked example (5% row slice for a RAG eval) yields positive margin for supplier and platform at realistic volumes.

<div class="article-callout">Out of scope: payment rails, tax handling, and jurisdiction-specific contract drafting. Flagged as dependencies for legal counsel.</div>

## 2. Impact

### For suppliers

Revenue scales with actual use instead of one-time sales. A dataset that powers 40 eval runs earns from all 40, not from the first buyer alone. Suppliers can license the same corpus to many use classes at different prices without re-publishing.

### For AI Trainers

Pay only for what is consumed. Small teams can run a RAG eval on a 5% slice for tens of dollars instead of buying a full corpus. Procurement gets a clean audit trail: which data, which use, which rights, which cost.

### For enterprise compliance teams

Every training run maps to a license snapshot, a permitted-use class, and a metered access record &mdash; the evidence an auditor asks for under high-risk AI documentation duties.

### For the platform

Take rate applies to consumption, which compounds with usage. Trust improves because billing and provenance come from the same ledger, reducing disputes.

<div class="article-metrics">
<div class="article-metric"><span class="n">Per-use</span><span class="d">revenue per listing, per month</span></div>
<div class="article-metric"><span class="n">% metered</span><span class="d">revenue from metered vs. flat deals</span></div>
<div class="article-metric"><span class="n">Median</span><span class="d">slice size purchased</span></div>
<div class="article-metric"><span class="n">Upgrade rate</span><span class="d">eval-tier &rarr; training-tier</span></div>
</div>

Measures to report once live also include: dispute rate per 1,000 metered sessions.

## 3. Challenges

- **Metering trust.** Supplier and buyer must agree on consumption counts. A platform that meters alone is a single point of dispute. Mitigation: signed usage receipts from the proxy, periodic reconciliation with buyer-side logs, and hash-chained ledger entries.
- **Leakage through metering.** Usage logs can reveal what a buyer is probing. Aggregate or noise-add usage data shared with suppliers; keep row-level access logs private to the platform.
- **Row-level pricing is gameable.** Buyers may request many small slices to avoid tier thresholds, or suppliers may pad row counts. Mitigation: minimum billable units, deduplication by content hash, and tier pricing based on distinct rows touched.
- **Derived data boundaries.** Embeddings, summaries, and synthetic rows built from licensed data may still carry license obligations. Licenses must define these explicitly.
- **Open-source release is irreversible.** Once weights or data are released openly, revocation is impossible. Require a separate, explicit tier with supplier sign-off and a cooling-off step.
- **Latency and cost of proxy access.** Per-request metering adds overhead on hot retrieval paths. Batch metering with signed periodic commitments, and keep the proxy off the critical path for bulk pulls.
- **Cross-jurisdiction enforcement.** A license valid in one region may not bind a buyer elsewhere. Governing-law clauses and region-pinned processing reduce but do not remove this.
- **Legal counsel dependency.** Derivative IP positions are not settled law in every jurisdiction. Every clause in the derivative section needs counsel review before launch.

## 4. Licensing tiers and dynamic pricing

Price follows use class first and consumption second. The same slice can carry three prices depending on what the buyer does with it.

| Tier | Permitted use | Billing unit | Indicative pricing logic |
| --- | --- | --- | --- |
| Internal evaluation | RAG and model evals, internal benchmarks, no redistribution, no training | Distinct rows touched per eval run, with a minimum billable block | Low per-row rate; capped monthly fee for heavy internal use |
| Commercial training | Pretraining, fine-tuning, RLHF or preference training, derivative models for sale | Tokens or rows consumed in training, plus a flat rights fee per model release | Higher per-token rate; rights fee sets floor; volume tiers step down |
| Open-source release | Public release of weights or derived data under an open license | Flat fee plus revenue share, or fixed buyout | Premium; supplier sign-off required; irreversible, so priced as a sale of rights |

### Dynamic adjustments

- **Freshness premium.** Newer versions of a dataset carry a higher rate for the first 90 days, then decay.
- **Scarcity premium.** Rare or domain-specific slices (medical imaging, low-resource languages) price above general text.
- **Exclusivity.** Exclusive commercial-training rights cost a multiple of the non-exclusive rate and expire on a set date.
- **Supplier floors.** Suppliers set a minimum price per tier. The engine never prices below the floor, even under volume discounts.

<div class="article-callout">Design rule: the buyer chooses the use class at access time. The license enforces it. Changing class triggers a new grant and a new charge, never a silent upgrade.</div>

## 5. Consumption metering

Goal: suppliers are paid on proven use, buyers can verify what they were charged for, and neither side needs to see the other's raw queries.

### Two access paths

1. **Data-proxy endpoint.** The buyer never receives the full dataset. Each retrieval or training batch request goes through a platform proxy that checks the grant, enforces the use class, returns only the requested rows or tokens, and writes a metered event.
2. **Scoped bulk grant.** For large training jobs, the buyer receives a time-limited, encrypted snapshot. Keys are released to a registered compute environment only. Usage is metered by signed attestations from that environment at job start and end, plus row-count commitments.

### Metering pipeline

- **Grant.** Contains dataset ID, version hash, use class, row-set scope (a row-ID list or filter predicate), expiry, and price terms. Signed by the platform.
- **Event.** Each billable action writes: grant ID, row IDs or token count, timestamp, use class, and a hash of the previous event. The chain is append-only.
- **Commitment.** At intervals, the platform publishes a Merkle root of the event chain. Suppliers verify inclusion of their own dataset's events without seeing other events.
- **Reconciliation.** The buyer receives a statement mapping events to billed units. Disputes reference event hashes, not raw data.

### Cryptographic options, by maturity

<div class="article-grid">
<div class="article-grid-card"><h4>Now</h4><p>Signed proxy logs, hash-chained ledger, Merkle commitments. Cheap, auditable, well understood.</p></div>
<div class="article-grid-card"><h4>Next</h4><p>Trusted execution environments (TEE) for the proxy, so the platform itself cannot read supplier rows outside the requested slice.</p></div>
<div class="article-grid-card"><h4>Later</h4><p>Zero-knowledge proofs of usage counts, if buyer and supplier both need to verify without shared trust in the platform. Costly today; watch for proving-cost drops.</p></div>
</div>

**Pricing unit choice.** Rows are easy for suppliers to understand but gameable on wide tables. Tokens map to model cost but vary by tokenizer. Recommend distinct rows touched as the billing unit for evals, and tokens consumed for training, with a published conversion table per tokenizer.

## 6. Derivative IP: who owns the weights?

This is the question enterprise buyers ask first. The position below is a product design stance to be confirmed by counsel, not legal advice.

### Default position

- **Platform does not own weights trained by buyers.** The buyer owns the model it trains, subject to the license.
- **Supplier retains ownership of the underlying data.** The license grants use rights only &mdash; no transfer of copyright or database rights unless a separate assignment is signed.
- **License defines what the buyer may do with the model.** Permitted: internal deployment, commercial deployment for the tier purchased. Restricted: distillation into a competing dataset product, release of weights, or use outside the granted domain.

**Why this matters under the EU AI Act.** High-risk system providers must document training data sources, data governance, and how data was obtained and processed. A buyer that cannot show a license snapshot for its training data carries compliance risk. The platform therefore sells a provenance bundle with each training grant: license snapshot, use class, dataset version hash, metered event chain, and a signed training-data summary.

**Memorization and extraction.** Models can memorize portions of training data. License terms should require buyers to run agreed extraction tests before release, and grant suppliers audit rights over those test reports for high-sensitivity datasets.

### Tiered derivative rights

| Tier | Buyer owns model | Supplier may audit | Model may be released |
| --- | --- | --- | --- |
| Internal evaluation | No model trained | N/A | N/A |
| Commercial training | Yes, subject to license | Yes, for high-sensitivity data | No, unless tier upgraded |
| Open-source release | Yes, with public license | Pre-release review | Yes, with supplier sign-off |

### Open questions for counsel

- Whether model weights count as a derivative database or copyrighted work in each target jurisdiction.
- Whether supplier rights survive when a model is fine-tuned on top of a third-party base model.
- How opt-out and removal requests interact with weights already trained.
- Liability allocation when a derived model reproduces licensed content.

## 7. Worked example: pricing a 5% slice for a RAG eval

**Scenario.** A buyer needs a retrieval evaluation set from a 2,000,000 row legal-contracts corpus. The eval uses 100,000 distinct rows (5%) sampled across clause types. Use class: internal evaluation. Eval runs monthly for three months.

<div class="article-panel">
<div class="article-panel-head"><span class="dot"></span><span class="dot"></span><span class="dot"></span>&nbsp;Illustrative inputs (not market rates)</div>
<div class="article-panel-body">
<div class="article-panel-col">
<h5>Rates</h5>
<div class="article-panel-row">Internal eval rate <span class="article-badge">$0.0005 / row</span></div>
<div class="article-panel-row">Min billable block <span class="article-badge">10,000 rows</span></div>
<div class="article-panel-row">Supplier floor <span class="article-badge">$0.0004 / row</span></div>
</div>
<div class="article-panel-col">
<h5>Split</h5>
<div class="article-panel-row">Platform take rate <span class="article-badge">20%</span></div>
<div class="article-panel-row">Flat full-corpus price <span class="article-badge warn">$6,000</span></div>
</div>
<div class="article-panel-col">
<h5>Per run</h5>
<div class="article-panel-row">Rows billed <span class="article-badge ok">100,000</span></div>
<div class="article-panel-row">Gross charge <span class="article-badge ok">$50</span></div>
<div class="article-panel-row">Platform / Supplier <span class="article-badge ok">$10 / $40</span></div>
</div>
</div>
</div>

**Three runs.** Buyer pays $150; supplier earns $120.

**Comparison.** The buyer pays $150 against $6,000 for the full corpus. The supplier earns $120 across three runs, versus $6,000 flat for one buyer. Flat pricing wins only if one buyer takes the full corpus. Metered pricing wins if many buyers each take a slice, or if one buyer returns for many runs.

**Break-even logic.** Metered revenue beats the flat fee when expected runs per listing exceed the flat fee divided by the per-run payout. Here: $6,000 &divide; $40 = 150 runs. Few listings reach that. So the engine must also sell full-corpus grants for buyers who need them, and let the metered tier capture long-tail demand.

### Pricing guardrails

- Block manipulation (many 9,000-row requests to dodge the minimum) is billed at the minimum block and flagged.
- Repeat runs on identical row sets are deduplicated for the same grant period, so the buyer is not charged twice for the same rows within one run.
- Price changes never reduce a supplier below the floor set at listing.

<div class="article-callout">All figures are placeholders to test the model. Replace with market data from pilot listings before using externally.</div>

## 8. Next steps and open decisions

### Decisions needed now

1. Confirm distinct rows touched as the eval billing unit, and tokens as the training unit.
2. Set the default derivative position (platform does not own buyer weights) and get counsel sign-off before any pilot.
3. Choose metering maturity for the pilot: signed proxy logs and Merkle commitments first; TEE after pilot.
4. Decide whether open-source release is in the v1 product or deferred. Recommendation: defer.

### Next steps

1. Build a proxy prototype for the eval tier on one pilot corpus.
2. Run a pricing pilot with three suppliers and five buyers; collect real per-row willingness to pay.
3. Draft tier-specific license templates with counsel.
4. Replace illustrative prices in the worked example with pilot data.
5. Add a provenance bundle export (license snapshot, event chain, training-data summary) to the buyer checkout flow.
