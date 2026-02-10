---
layout: post
title: "Measuring Best-Effort Features: How Good is 'Good Enough'"
category: Tech
tag: Featured
---

You finished your day of hard browsing and casually clicked 'Clear My Data' on your browser. Behind the scenes, 16 different systems spring into action—cookies, cache, browsing history, autofill data, site permissions... along with a cool fire animation. A few seconds later, the animation completes and you close the browser.

My analytics dashboard says: **Clear Data Button Clicked: 1**.

However, it doesn't tell me something I really care as a developer: Did your data actually get cleared? Did one of those 16 systems fail silently? Did you wait 30 seconds staring at the spinner and give up? Did you trust that it worked, or did you immediately check your history to verify?

I have no idea. And that's a problem.

<img title="" src="/assets/images/burn.png" alt="Burning Data" width="686" data-align="center">

<!--more-->

## The Problem

The data clearing flow is a complicated flow that consists of 16+ independent fire-and-forget actions with no single "success" state. Just to name a few:

- Clear last session restore data
- Hard-delete previously soft-deleted bookmarks
- Close/reset all tabs and windows
- Clear cookies, local storage, cache, and other site data
- Clear browsing history
- Clear favicon cache
- Revoke site permissions (geo, notifications, etc.)
- Clear download records
...

These actions consist of both sync and async operations: some are awaited while others are pushed to background threads with `Task`. Some actions fail silently, some retry immediately, while others retry the next time the user launches the browser. There are no atomic transaction guarantees.

Traditionally we only tracked usage metrics, things like fire button tapped, auto-clearing triggered. But these weren't enough. As users accumulated large amounts of data over the years and cleared it in one go, quality issues began surfacing via user reports: freezes (or perceived freezes), noticed residue, crashes. We needed to know what was happening underneath.
The question we needed to answer: "Is this feature working well?"

## Defining "Good Enough"

### The Two Metrics

Before starting the implementation, we needed to clarify what we were actually measuring. 

There are two different kinds of metrics:
- **Engineering metrics:** They log technical errors, system latencies, traces, all sorts of signals that provide valuable feedback to the engineering team to monitor system health.
- **Product metrics:** They answer a different question: "How's the feature working from a user perspective?"

These two types of metrics have intersections. For example, some errors surface in code via `throw` and get handled in the UX layer with a popup: "Sorry, we encountered a system error. Please try again." Both engineering and product teams care about this. But they're also different. Some errors never surface to users, like background retries that eventually succeed, degraded caches that rebuild automatically. From an engineering perspective, these are errors worth tracking. From a product perspective, if the user never noticed, they're not product failures. The inverse is also true. Consider a search feature where the "next page" component is sent from the backend but fails to render on an older client version due to a type mismatch. No technical error is thrown and no exception is logged on the dashboard. But from a product perspective, this is a critical failure: users can't view search results past page one.

<img title="" src="/assets/images/amazonfail.png" alt="Amazon Fail" width="686" data-align="center">

So when we asked "Is this feature working well?" we needed to clarify: is this an engineering question or a product question? The team I'm working with heavily focuses on the product side aiming to "Build tooling to determine the real user experience of our most important features, and drive discussions about what 'good enough' is for those experiences.". This meant we needed to answer: **"Is this feature working well from the user's perspective?"** 

The question at the beginning shifted from "What should we log?" to "What does the user expect to happen when they trigger this flow?" Users don't know that 16+ operations are happening in the background. From their perspective, success means: "What I think should be cleaned gets cleaned."

### Partnering with Product

I sat down with Product and walked through the user journey. We reviewed bug reports from recent months along side a crash course of what each action actually does. We asked: **"What is good enough?"**

The deliverable was a tier list of actions ranked by user impact:
- **Tier 1 (Critical):** If these fail, the whole flow fails from a user perspective.
Example: Clear browsing history
- **Tier 2 (Important):** We want these to succeed, and users might notice if they don't.
Example: Clear favicon cache
- **Tier 3 (Best-effort):** Good to have, but users likely won't notice failures.
Example: Hard-delete previously soft-deleted bookmarks

This exercise did two things:
- It redefined the problem space. We weren't measuring "Did all 16 operations complete?" We were measuring "Did the operations users care about complete?"
- It also tightened the scope. An instrumentation project shouldn't take 2 months to deliver value. In the first phase, we focused specifically on Tier 1 actions.

## Choosing the Tool

We had two options for instrumentation:

##### Option 1: The new wide pixel format (which I co-led in building)
A modern telemetry system designed for multi-step user journeys with a single event. Also a great chance to expand its usage and my impact
##### Option 2: The status quo telemetry system
An existing tool we'd been using for years. Less sophisticated, but proven and flexible.

I chose the old system instead. Reasons being:

1. **It matched this specific system's architecture:** The data clearing flow is fire-and-forget. Operations complete (or fail) asynchronously with no guaranteed order. The old telemetry system had the same fire-and-forget characteristic and the events don't block execution. This alignment meant less impedance mismatch, less risk of introducing new failure modes.

2. **It required no refactoring:** Adopting the wide pixel format would have required restructuring how we track the clearing flow by aggregating state across multiple independent operations, ensuring the final event fires even if some operations are still retrying in the background. That's a significant refactor in a critical privacy feature.

3. **It could deliver value faster:** We needed answers in weeks, not months. The old system was already deeply integrated. We understood its limitations. We could instrument the Tier 1 actions, ship it, and start collecting data while the wide pixel migration was still in planning.

However, this means we also had to accept the trade-offs:
- Multiple events instead of one cohesive journey event
- Manual stitching in our dashboards
- Less elegant instrumentation code

But in the end we got data flowing in 1 week for both iOS and MacOS. And that data was already answering the question: "Is this feature working well from a user perspective?" Sometimes the right tool isn't the best tool—it's the tool that ships.

## Epilogue
We shipped the instrumentation. Data started flowing. And for the first time, when Product asked "Is the Fire Button working well?" I could answer with confidence:

> "Yes. 99.1% of flows complete all Tier 1 actions within 10 seconds. Error rate is 0.3%. P99 latency is 18 seconds."

Not because we logged everything, but because we logged what mattered. The wide pixel format I co-built is still there, waiting for the right use case. But for this project, the old system was the right choice. 

### Now a simplified framework for Measuring Best-Effort Features
If you're facing a similar problem: measuring a complex, multi-action feature with no clear success state, here's what worked for us:

- Ask Product: "What does the user expect?" Not "What should we log?" but "What does success look like from the user's perspective?"
- Tier your operations by user impact. Not all failures matter equally. Focus on what users can actually observe.
- Choose pragmatic tooling. The right instrumentation is the one that ships and answers your questions—not necessarily the newest one.
- Measure outcomes, not operations. Log whether things worked from a user perspective, not whether each internal operation completed.
- Ship fast, iterate with data. Get baseline data flowing quickly. Instrumentation is a two-way door. You can always refine later.

The question "Is this feature working well?" can't be answered by engineering metrics alone. It requires understanding what "working well" means to your users first.
