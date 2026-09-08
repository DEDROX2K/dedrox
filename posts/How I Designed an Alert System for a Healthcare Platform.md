# How I Designed an Alert System for a Healthcare Platform
## The Context

The client was an IoT company looking to offer **RPM as a service** to clinics and hospitals.

They had: A strong vision , clear business intent and stakeholder buy-in.

What they _didn’t_ have was a usable product. There was no defined dashboard, no workflows, and no shared understanding of how doctors and nurses would actually use the system day to day.

My role was to help turn an idea into something concrete something they could **sell, demo, and eventually scale**.

## The Challenge

The real constraints were:

**A short and fixed timeline, limited design and development resources, a strict budget, high expectations from healthcare stakeholders.**

The biggest risk wasn’t under-designing ,it was **over-designing or designing without understanding the scope and system.**

## Step 1: Defining the Path Forward

I started my research by asking questions.

1. **_How RPM system works?_**
2. **_What is the role of the dashboard in it?_**
3. **_Who are we designing for?_**

## Understanding the system

To understand users in a complex RPM ecosystem, I focused on **the decisions different stakeholders are responsible for**,I began by mapping the **end-to-end lifecycle of the process.**

Insights: This is an escalation system -process where alerts are handled in 3 levels of escalation.

P1: Nurse ( who gets first alert when triggered)

P2: Supervisor Nurse ( If nurse is not able to take alert, it auto passes)

P3: Doctor

My role here is to ideate and design a dashboard that would be viewed by this user group.

## Why this is crucial to nail?

If the dashboard are confusing ,complex and not intuitive then response rate will slow down and serious mishaps can happen.

Eg: An SOS should be handled within 8 secs, any more can cause harm to the patient.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*K8gjHeNhpXjBD5x_.png)

## Understanding Users

User persons from healthcare industry helped me map the key users interacting frequently with the dashboard. I conducted user interviews with these users to identify key issues that could significantly impact the platform.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*MqRSC6av8oToszfI.jpeg)

## Building a Shared Vision with Stakeholders

I recognized early that a design of this scale required more than just good ideas **it required total alignment.** That means defining clear vision for the product ,frequent discussions PMs and engineers to create a streamlined approval process. **Regular feedback loops kept stakeholders informed** about design decisions, allowing them to raise concerns early. This collaborative foundation powered our speed to market and ensured that every stakeholder felt invested in the final, life-saving product.

## Advocating for the UX process.

This project wasn’t just about redesigning a product. It was about advocating for a UX-driven, user-centered approach in an environment that was used to more top-down decision-making. **At times, this meant pushing back against established processes**, but the results spoke for themselves.

![](https://miro.medium.com/v2/resize:fit:825/0*dKfuOyC1Uf3nYnkV.png)

## Data Prioritization: Deciding What Truly Matters

Before jumping into layouts or information architecture, there was a critical step that shaped the entire dashboard: **data prioritization**.

## Get RaghavPrasannaUX’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Remember me for faster sign in

Remote Patient Monitoring systems generate large volumes of data, but in clinical environments, **not all data is equally important at all times**. Displaying everything would only increase cognitive load and slow decision-making.

## How the Priority Was Defined

Data prioritization was not based on assumptions. It emerged from:

- Discussions with stakeholders and domain experts
- Research on RPM workflows and industry standards
- Understanding critical vitals and alert thresholds commonly used in clinical practice
- Reviewing SLAs tied to patient safety

## MoScoW prioritization:

**F**aced with limited resources, **I had to strategically prioritize to stay on schedule and within budget.** The challenge was clear: deliver impactful updates that addressed core pain points without overextending the project. I used a **MoSCoW analysis** to define the MVP.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*qViF0fRd3fyk05iY.png)

## Competitive Research:

I analysed competitor interfaces aiming to aimed to uncover best practices, innovative features, and potential gaps in our exisiting solution.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*pUDjaAVvmQl_2xwL.png)

Following the User feedbacks, UX evaluation and competitve analysis, the client agreed to implement the recommended changes, enabling a comprehensive range of improvements and the development of new features.

## Part 2: Planning and Information Architecture

## Sitemaps & Wireframes

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*9gLdT892VhUevP14.png)

wirefram and low fi UI versions

To validate the data priorities early, I created multiple versions of the dashboard using sketches, low-fidelity wireframes, and simplified UI models. These variations were used to informally **A/B test** how quickly clinical **staff could identify critical alerts, which data points naturally drew attention, and what information was getting visually buried.** Rather than testing visual preference, the focus was on reaction time and clarity understanding whether alerts stood out immediately, whether key vitals were competing with secondary data, and whether added information slowed decision-making. Insights from these iterations helped refine visual hierarchy, reduce unnecessary density, and ensure that the most critical data remained prominent and actionable in the final design.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*fK6M-EXFX3SUQ-Ds.png)

Site mapping

## Final Designs

## A. Nurse view dashboard:

The nurse has certain patients alloted to her and they will be visible in the right side list. The dashboard keeps patient profile, key vitals and alert history in visiblity.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*U1P8JUIsFw7pMA9C.png)

Nurse dashboard in normal conditions

## A.1: Vital alert triggered:

Patient heart rate crossed threshold frequency. ( Set by doctor for patient)

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*i2qXQHckiInA83wJ.png)

## A.2: SOS alert triggered:

Patient clicked on SOS for help. Quick action need.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*hPbhsqy28bG4bFil.png)

## B. Doctor View

A doctors view dashboard. This dashboard shows more features because it goes from being read and react only( nurse) to actionable. The doctor is able to see through all his patients from different wards, add new patients, check patient graphs, history and other detaisl crucial to monitor health.

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*gICtHbMJ2_QM4JCu.png)

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*CNPNunPTezLINbIX.png)

Press enter or click to view image in full size

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1228/0*9UvEgj1bPkD12pjF.png)

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Frepost%2Fp%2F80d48fca99cc&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40RaghavPrasannaUX%2Fhow-i-designed-an-alert-system-for-a-healthcare-platform-a-ux-journey-80d48fca99cc&user=RaghavPrasannaUX&userId=cebfc5aabfe6&source=---footer_actions--80d48fca99cc---------------------repost_footer--------------------)

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F80d48fca99cc&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40RaghavPrasannaUX%2Fhow-i-designed-an-alert-system-for-a-healthcare-platform-a-ux-journey-80d48fca99cc&source=---footer_actions--80d48fca99cc---------------------bookmark_footer--------------------)

[](https://medium.com/@RaghavPrasannaUX?source=post_page---post_author_info--80d48fca99cc-----------------------------------------)