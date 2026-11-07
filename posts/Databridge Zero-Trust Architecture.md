## 1. Context

The first two case studies assumed the platform holds the data. Ingestion copies files into our object store, scans them there, and serves samples from there. That works for mid-market suppliers. It fails for the suppliers with the most valuable data.

A bank's transaction logs, a hospital's imaging archive, and an enterprise's security telemetry are not shared as uploads. Their legal teams refuse to hand raw records to any third party, even a well-audited one. Their regulators often require data to stay in-region or under the owner's control. The refusal is not a trust problem we can win with a better UI. It is a sovereignty constraint.

Two things follow. First, the platform must be able to work against data it never copies. Second, buyers who need to train on sensitive data often cannot download it either. The engine has to let models learn from data that stays put, and prove what happened to it.

### Objectives

This blueprint must prove and decide five things:

1. **Sovereignty.** Suppliers keep raw data in their own cloud account, under their own keys, with revocable access we never hold permanently.
2. **Compute in place.** Our ingestion, scanning, enrichment, and sampling run against supplier-held data through scoped roles, not copies.
3. **Train without download.** Buyers can train or evaluate models on sensitive data inside an isolated environment, with only permitted outputs leaving.
4. **Verifiable guarantees.** Each technique (BYOS, enclaves, differential privacy, secure multi-party computation) is mapped to a concrete threat it does and does not address, so claims stay honest.
5. **Delivery order.** A phased path that ships BYOS first, then enclave training, then cryptographic options, with go/no-go gates.

<div class="article-callout">Out of scope: formal certification (SOC 2, HIPAA BAA, ISO 27001) beyond listing required controls. Flagged for security and legal review.</div>

## 2. Impact

### Unlocked buyers and sellers

Regulated suppliers in finance, healthcare, and large enterprise become reachable. These are the highest-value datasets and the least served by upload-based marketplaces.

### Suppliers

Data never leaves their control, so legal review cycles shrink from months to weeks. Revenue comes from access and compute, not transfer. Revocation is a key rotation, not a takedown request.

### Buyers

Access to sensitive corpora they could not otherwise license. Provenance is provable without trusting our storage.

### Platform

Lower storage liability and smaller breach surface, since we hold metadata and grants rather than raw files. Premium pricing for enclave compute and privacy guarantees.

<div class="article-metrics">
<div class="article-metric"><span class="n">BYOS</span><span class="d">connected suppliers</span></div>
<div class="article-metric"><span class="n">% in-place</span><span class="d">revenue from in-place compute</span></div>
<div class="article-metric"><span class="n">Time to connect</span><span class="d">intent &rarr; first connected dataset</span></div>
<div class="article-metric"><span class="n">Pass rate</span><span class="d">security review, first submission</span></div>
</div>

Also tracked once live: number of training jobs completed in enclaves without a data egress exception.

## 3. Challenges

- **Cross-account trust is a blast radius.** A misconfigured role can expose a supplier's whole bucket. Mitigation: least-privilege policies scoped to prefixes, external ID on every assume-role call, session duration capped at minutes, and continuous policy linting.
- **We cannot see what we cannot copy.** Scanning and enrichment on supplier-held data must run inside their account or enclave. Mitigation: deploy a pipeline worker into the supplier's account via infrastructure-as-code, with outbound results limited to metadata and aggregate statistics.
- **Multi-cloud sprawl.** Suppliers use AWS, GCP, Azure, and on-prem object stores. Each needs its own adapter and test suite. Start with two clouds and a generic S3-compatible path.
- **Enclave limits.** Nitro Enclaves have no persistent storage, no general networking, and constrained memory. Large model training will not fit. Scope enclave work to evaluation, inference, and small fine-tunes; use the supplier's own GPU account for bulk training.
- **Differential privacy costs utility.** Noise hurts small or skewed datasets and rare classes. Set privacy budgets per dataset class and publish the epsilon used.
- **MPC is slow.** Secure multi-party computation scales poorly for deep learning. Use it for joint statistics and set intersection, not for training large models.
- **Attestation trust.** Enclave attestation proves code identity, not honest behavior. Pair it with output review and contractual audit rights.
- **Output exfiltration.** A buyer model can memorize and leak training rows. Enforce output checks, membership inference tests, and extraction limits before any weights leave the enclave.
- **Legal fragmentation.** Data residency, sector rules (HIPAA, GDPR, financial regulators), and EU AI Act documentation differ by buyer. Compliance tiers must be explicit per listing.
- **Operational cost.** Dedicated enclaves and per-supplier deployments raise cost per connection. Charge a connection fee and enclave-hour pricing; do not absorb it.

## 4. Blueprint 1: Bring-Your-Own-Storage (BYOS)

**Principle.** The supplier owns the bucket, the keys, and the retention policy. We receive a role that can do exactly what the listing permits, for as long as the listing is live.

### Components

- **Supplier account.** Holds the S3 or GCS bucket, a KMS key the supplier controls, and a deployment of our pipeline worker (containers or serverless) provisioned by a Terraform module the supplier reviews.
- **Platform account.** Holds the control plane: listings, grants, metering ledger, and job orchestration. Never holds raw data.
- **Trust link.** A cross-account IAM role in the supplier account. Trust policy allows only our platform role, requires an external ID unique to the supplier, and enforces a maximum session duration.

### Flow

1. Supplier runs the onboarding module, which creates the role with least-privilege permissions scoped to specific prefixes (read-only on a staging prefix, write-only on a results prefix).
2. Platform requests a short-lived session through assume-role. Session carries only the prefixes in the active grant.
3. Scan, schema probe, and enrichment jobs execute inside the supplier account via the worker. Only metadata, aggregate statistics, and redacted samples return to the platform.
4. Grant changes, price tier changes, and revocations are enforced by IAM and by the platform grant check on every request.
5. Revocation: supplier deletes the trust policy statement or rotates the external ID. Access ends at the next session expiry, which is minutes.

### Controls

- Every assume-role call is logged in the supplier's CloudTrail and mirrored in our metering ledger.
- Suppliers can set a per-session data-access budget that the worker enforces.
- Policy drift detection runs daily and alerts both sides.

<div class="article-callout">Why this beats upload: the supplier never loses custody. Our breach surface is the control plane, which holds metadata, not records. Compliance review shifts from "where is our data" to "what can this role do," which legal teams can read.</div>

## 5. Blueprint 2: Encrypted compute and privacy-preserving ML

Goal: a buyer trains or evaluates a model on data it cannot download. Only permitted outputs cross the boundary.

<div class="article-grid">
<div class="article-grid-card"><h4>Layer A &middot; Primary</h4><p><strong>Isolated execution.</strong> Training or eval runs inside a hardened enclave in the supplier's account (e.g. AWS Nitro). Attestation proves the exact image hash; KMS releases keys only to a matching enclave. An egress gate allows checkpoints and metrics but blocks raw rows, logits, and per-example losses.</p></div>
<div class="article-grid-card"><h4>Layer B &middot; Statistical</h4><p><strong>Differential privacy.</strong> DP-SGD bounds how much any single row can change the model. Privacy budget (epsilon, delta) is set per dataset class and recorded in the provenance bundle. Used for aggregate stats and for models released beyond the enclave.</p></div>
<div class="article-grid-card"><h4>Layer C &middot; Joint analysis</h4><p><strong>Secure multi-party computation.</strong> Two or more parties compute a joint result &mdash; overlap counts, joint benchmarks, a shared metric &mdash; without revealing inputs. Used for cross-supplier evaluation, not for training large models.</p></div>
<div class="article-grid-card"><h4>Layer D &middot; Later</h4><p><strong>Homomorphic encryption.</strong> Encrypted inference on small models for narrow scoring tasks. Too slow for training today; watch for hardware acceleration.</p></div>
</div>

**Operational flow.** Buyer requests an enclave job against a grant. Platform checks the grant, provisions the job in the supplier account, verifies attestation, runs training, applies the egress gate, and writes a metered event with the attestation hash and output hashes. The provenance bundle now proves what was trained, where, under which privacy budget, and what left.

## 6. Trust model: deployment tiers

No single technique covers every case. Each listing declares its tier, and the buyer sees exactly which guarantees apply.

| Tier | Data location | Compute location | Buyer gets | Guarantee |
| --- | --- | --- | --- | --- |
| T1: Standard | Platform storage (encrypted, region-pinned) | Platform | Downloadable sample and grant | Contractual, audited |
| T2: BYOS | Supplier bucket | Supplier account worker | Metadata, samples, metered access | Supplier custody, IAM-enforced |
| T3: Enclave | Supplier bucket | Isolated enclave in supplier account | Trained model checkpoint, metrics | Attested code, egress-gated outputs |
| T4: Enclave + DP | Supplier bucket | Enclave with DP-SGD | Model with stated epsilon | Statistical bound on memorization |
| T5: Joint analysis | Both parties' buckets | MPC protocol | Joint metric only | Cryptographic, inputs never revealed |

**Mapping rule.** Start buyers on the lowest tier that meets their legal need. Upgrade only when a contract or regulator requires it. Each step up costs more to run and must be priced accordingly.

<div class="article-callout">Threat clarity: each tier states what it defends against and what it does not. T3 stops raw data exfiltration but does not stop a buyer model from memorizing rows it was trained on. T4 bounds memorization but reduces accuracy on rare classes. Publish these trade-offs in plain language on each listing.</div>

## 7. Next steps and open decisions

### Phased delivery with gates

1. **Phase 1, BYOS on one cloud (0&ndash;3 months).** Ship onboarding Terraform module, cross-account role, worker, and drift detection for AWS. Gate: two pilot suppliers complete scan and publish with zero raw-data egress.
2. **Phase 2, second cloud and T3 enclave for eval (3&ndash;6 months).** Add a GCP adapter. Enclave runs buyer eval jobs only. Gate: attestation and egress gate pass an external security review.
3. **Phase 3, DP training and joint analysis (6&ndash;12 months).** DP-SGD for T4 listings; MPC pilot for cross-supplier benchmarks. Gate: utility loss published and accepted by at least one regulated buyer.
4. **Phase 4, scale (12+ months).** Automated tier recommendation, marketplace SLAs for enclave capacity.

### Decisions needed now

1. Choose the first cloud for BYOS. Recommendation: AWS, for the Nitro Enclave path.
2. Decide whether T1 remains available for sensitive categories, or is restricted to non-personal data.
3. Select the external security firm for enclave and egress review.
4. Agree the epsilon policy per dataset class with legal and at least one supplier.
5. Confirm connection fee and enclave-hour pricing with the licensing engine design from the previous case study.

<div class="article-callout">Caveat: security and certification claims in this document are design targets. Validate with penetration tests and independent review before any customer-facing statement.</div>
