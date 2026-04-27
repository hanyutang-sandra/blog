---
layout: post
title: "When Things Are No Longer Working: An Engineer's Approach to Speaking Up About Work Friction"
category: Work
tag: Featured
---
Every engineer has a version of this story: It's the third review round on the same proposal. The questions keep coming back — only that they aren't really questions. **They're objections wearing question marks.** The thread closes without a path forward, and the people on it aren't aligned on what a path forward would even need to look like.

Each round had the same shape. Questions phrased to expose and object, not to contribute and converge. Skepticism with no alternative attached. *"I don't really see what this is solving." "Aren't these basically equivalent?" "I'm not convinced this is even the right problem."* *"That's a false choice."* Any one of these, in isolation, might be a fair technical concern. But stacked together week after week and round after round, they weren't pushing for a path forward. They were a wall built one brick at a time.

It's a painful moment and I had just lived through one. My usual instinct is to swallow it and keep moving, quieter than I started. But this time the cost was too high to absorb. I decided to speak up, and it saved a whole team of engineers and a critical project.

<!--more-->
## The cost

Three weeks of carrying friction left marks:

- **My ideas shrank.** I got stuck in defensive mode and stopped proposing creative solutions, afraid of facing the same pushback again. This was the kind of feature that genuinely needed unconventional thinking, but the personal cost of pushing felt higher than the project cost of shrinking.
- **My code got shallower.** I rushed to ship and finish the project and stopped asking deeper questions about the implementation. What I delivered was good enough on the surface and weak underneath.
- **My confidence eroded.** Constant pushback with zero validation has a way of turning into a question about your own competence. I started doubting the skills I'd built for years.
- **My body felt it.** A month of high-vigilance mode leaves marks. I noticed it in my sleep, body, and mental health. 

Three weeks in, I finally scheduled time with my manager and named the pattern. Speaking up broke the loop: everybody involved was relieved, and the project moved forward successfully.

---

## Friction detection and escalation is a craft, not a personality trait

For a long time, I thought speaking up was a temperament sort of thing. That framing kept failing me. **The moments where I should've spoken up weren't moments where I gathered all my courage. They were moments where I'd noticed something and didn't know what to do with the signal.** And this is a technique.

Technique is something we engineers already know how to think about. We don't say *"she's the kind of person who finds bugs."* Bug-finding is a learnable skill, improving with practices and frameworks. So is catching performance regressions, identifying flaky tests, or spotting API design tradeoffs during review. 

Working friction is just another kind of signal. The skill is two-part:

1. **Friction detection**: noticing the off-ness early, naming it to yourself precisely enough that you could explain it to someone else.
2. **Escalation**: routing the signal at the right level, with the right framing, to the right person.

---

## The escalation ladder

Here's the framework I used. Each level is "louder" than the one before, but also more expensive. The goal isn't to climb to the top; it's to **match the friction to the cheapest level that resolves it.**

**L0 — Notice it. Write it down.** The level most engineers skip. You don't have to act yet, but you do have to name the friction to yourself in writing, with enough specificity that you'd recognize it again next week. Without this step, friction stays vague. This step also helps validate if this is a pattern or just one-off.

**L1 — Ask a clarifying question in the moment.** The cheapest external move. *"What's the assumption here?"* Or: *"What would 'good' look like here?"* It's not pushback, but it surfaces the friction to the person without committing you to anything. Often it ends here, but sometimes it has to go further.

**L2 — Follow up async.** A doc comment, a Slack thread, a reply on the PR. Async gives you time to phrase carefully and gives the other person time to think instead of react. This also leaves a record should a third person be needed.

**L3 — Bring it to your manager (or further).**  When the friction is structural and recurring across surfaces, this is the right venue. Bring data from L2: *"Over the last three weeks, I've seen this shape on the proposal, the doc, and the PR. I'm trying to figure out the right way to route this."*

---

## A note on cost

Each level on the ladder is more expensive than others. An L1 question that reads as *engaged* from one engineer can read as *combative* from another. An L3 escalation that goes in someone's file as *good judgment call* can go in another's as *difficult to work with*. 

The honest version of this advice is **know the price you're being asked to pay, and choose deliberately.** Knowing the price doesn't make it lower. But it does make the choice yours instead of the room's.

---

## Caring for yourself while you're carrying it

The escalation ladder helps you act. It doesn't help you survive the act of carrying friction in the meantime. Here's what I wish I'd done sooner: not as substitutes for speaking up, but as scaffolding while I was getting there:

- **Name it also as a psychological event, not just a work problem.** *"I'm in a sustained pushback loop and it's affecting my mental health"*. Naming the cost is the first step to interrupting it.
- **Tell one person outside the situation.** A trusted friend, a partner, a therapist. When constant pushback is the only signal you're getting, you need at least one external signal that says *you're not bad at your job.*
- **Protect the basics ruthlessly.** Sleep. Food. Working out. The instinct under threat is to grind harder; the actual move is to grind less and recover more, because you need your full self when you do escalate.
- **Set boundaries.** Quiet hours, app off your phone, scheduled check-ins instead of constant notifications.
- **Validate yourself on a schedule.** When the room isn't validating you, you have to do it yourself. Write down one thing you got right that day. Even if it's small. 

None of this fixes the friction. But all of it keeps you intact while you're working the framework, and you need to be intact for the framework to work.

---

## What I took away

In a post-project reflection, my manager named something I'd already been carrying: I should have spoken up earlier. They were right, but *"speak up earlier"* is the kind of advice that doesn't help unless I know what was in the way. For a long time, I told myself the answer was courage. I needed to be braver, more confident, more willing to take the social hit. 

What I learned this round is that the real answer is technique. The reason I didn't speak up earlier wasn't that I was too quiet. It was that I was waiting to feel ready, and "ready" was never going to arrive on its own. Next time I notice friction, the work won't be to push past my discomfort. It'll be to pull out the ladder.