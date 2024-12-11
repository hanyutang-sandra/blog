---
layout: post
title: What I have learnt from leading a 6-month-long project
categories: Work
---

**1:30 pm EDT, Auguest 2nd, 2024, Toronto Canada.**  I wrapped up my morning with the final project meeting and treated myself to a Baskin Robbins Strawberry Cheesecake Scoop in a waffle cone to celebrate. I don't often indulge in sweets for *health*, but today was an exception because it marked the end of my six-month journey as the project lead. 



For companies that have adopted the Sprint process and prioritize fast and efficient value delivery, a six-month-long project is uncommon. In my five years as a Software Engineer, leading countless projects, most feature projects have run from two to four months, with only a few extending to five months before starting experiments. For the longer platform projects, most reach a milestone around four to five months. A six-month-long project is truly exceptional and deserves to be named the **Project of the Year**.

<!--more-->

> *But wait, before getting into the learnings, why does the project have such a long timeline ..... and does it really need 6 months?*





**For the first question**, the simplier tl;dr is that we delivered the very first video feature on individual iOS search results starting from almost ground zero. This project involved integrating three backend services and adopting a new client library on one of the oldest screens. It was a highly complex technological challenge and it will take more than 2 months of work.

**For the second question**, the answer is both yes and no, though my teammates might tell you otherwise. Read on to discover why it's not because I'm a pushy leader who demands everyone to work 12-hour days.

<br/>

## What went well

During the project retrospective, the two words heard most frequently were **thank you**, closely followed by **kudos**, **appreciate**, and **proud**. We successfully delivered a new feature that marks a significant milestone in the company's app history, and most importantly, it looks fantastic in production. 

Coordinating among four different teams across two organizations was also no small feat. We held sync meetings every Friday morning since March, discussing everything from technical alignment to project updates.We kept well-organized meeting notes and assigned action items to individuals, ensuring that all questions were answered before the next sync meeting. Communication was key, with everything—good or bad, early or delayed, PTO, WTO, and holidays—being conveyed without any blame. The project Slack channel became a bustling but well-organized virtual space where announcements were made and questions were asked and answered promptly.

From my personal perspective as a client engineer with some backend knowledge, this was my first time delving deeply into the broad world of backend development. As the project lead, I needed to understand the work required from my backend engineers and the blockers they faced. As a client engineer, I had to explore everything related to video, from `AVAssets` and `AVAudio` to video performance, quality, and latency. This project was not just about delivering a feature but also about learning and growing, building on my five years of experience.

<br/>

## What went no so well

I have a bad habit of being hesitant to talk about the negative aspects of a project, fearing I be perceived as too harsh or critical. However, we need to address these issues—it's such a loss *not* to reflect on the process and learn from mistakes, especially for a project of this size.

#### Long Initial Alignment

As the first of its kind, this project began with many uncertainties. Stakeholders from different organizations gathered to debate the project's direction. On the technological side, we discussed services and frameworks. Financially, we deliberated on costs - videos are expensive and budgets are tight. On the content side, we questioned what types of videos to show and whether we had enough content. During each sync meeting, we would spend an hour discussing these issues without reaching conclusions, and as such, the project was delayed.

###### The takeaways

Given the project's unique nature, these discussions were necessary, so there wasn't much we could change. However, involving a smaller group focused on decision-making may help. In a fast-paced development environment, the first version of a product doesn't have to be perfect; more iterations can, will, and needs to be done on it.

#### The changing Product requirement

Due to its ambiguous nature, the product requirements were not finalized before the engineering work began and changed twice mid-project. Depending on the specific changes and platform, implementing changes can be easy or difficult. In our case, unfortunately, the change requires quite some work on the engineering side.  

###### The takeaways

*If we can't change , we should adapt.* For areas with unknowns at the time of PEP (Product Enhancement Proposal),  it would be helpful to communicate the underlying goals to developers during the technological scoping phase. From a technological perspective, there might be solutions the product team is unaware of that engineers can provide.

#### Blocked Eng-Product Communication

Without divulging too many technical details, one of the project requirements was to establish a specific filtering threshold for video quality. This is a common feature for any video-rich application. However, there was a disconnect between the engineering and product teams regarding the meaning of the filter and its values. It took nearly two sync meetings and countless Slack threads to resolve the misunderstanding and move forward.

###### The takeaways

Sometimes it can feel as if the product and engineering teams are speaking two different languages, especially in a large company where the word like *filter* can have various meanings. For engineering managers and project leads, it's time to develop the skill to translate and communicate effectively in the product team's language.

Most engineering teams have documentation, but these are often focused on technical details, which can be intimidating for non-technical stakeholders. It may be time to include a section that caters to the product team’s perspective. Useful additions could be screenshots with annotations to demonstrate how features look, and flowcharts to visualize the application's lifecycle. A product-friendly documentation page can help align understanding and provide valuable knowledge to aid in better and faster product decision-making.

#### Testing and Observability

After six months of hard work, it was finally time to integrate all services and let the data flow! However, our initial integration testing was slow, and unexpected problems emerged. With multiple backend services and team members scattered across different time zones and varying out-of-office schedules, the debugging process was lengthy and challenging.

###### The takeaways

Observability is crucial not only for established services but also for those still in progress. Well-established logging can significantly aid in the debugging process by exposing hidden backend bugs. In our case, we caught a silent timeout issue only after setting up a complete logging system.

For a project of this size, encountering issues is understandable, and this is where expectation management becomes essential. It's advisable to pre-set a one-week buffer solely for end-to-end testing in the production environment, ensuring that most, if not all, team members are on board to participate together.
