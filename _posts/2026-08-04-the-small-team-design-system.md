---
layout: post
title: The Small Team Design System in the AI Era
category: Tech
tag: Featured
---
Recently, I've been leading the implementation of several UI-heavy projects. As more features landed, I found myself thinking more and more about design systems. 

The entire Apple team at my current company consists of around 30 people, including directors, managers, and engineers. Together, we're responsible for two platforms (iOS and macOS), two apps, every product feature, testing, CI/CD, releases, maintenance and infrastructure. We simply don't have the luxury of having a dedicated design system team. So the question has became: 

> **How do we get the benefits of a design system without spending multiple sprints building one?** 

This question is becoming much more relevant in the AI era. AI is fundamentally changing how software gets built. Small teams can now ship products that previously required significantly larger engineering organizations. We're seeing more fully-fledged products being built by just a handful of developers working alongside AI. 

But while the way how softwares get built has changed dramatically in the past year, much of the advice around design systems hasn't. This post shares how I think about building a design system **without having a design system team**, and why I think AI changes the way small teams should approach it.

<!--more--> 

---

## The Nowaday Problem

Most design system articles and talks come from large organizations. They describe companies with: 
- Dedicated design system teams 
- Governance processes 
- Release management 
- Hundreds of reusable components 

These are fascinating engineering stories. But when your team only has a handful of engineers, every reusable component becomes another API someone has to maintain. The same engineers building product features are also maintaining shared UI components, fixing production bugs, reviewing pull requests, and shipping the next release. The problem changes. 

Instead of asking: 

>*How do we build the perfect design system?* 

Small teams should ask: 

>**How do we get the benefit of a design system while minimizing maintenance?**

---

## The benefit of a design system

-Before talking about implementation, it's worth asking what we're trying to get out of a design system in the first place. 

A design system provides five major benefits. 
- **Consistency:** UI should feel consistent across screens, features, and platforms. Users shouldn't notice that different engineers built different parts of the product. 
- **Reusability:** Reusable components reduce duplicate implementation. The benefit is not only writing less code, but also having fewer places to update when requirements change.
- **Separation of concerns:** Feature engineers (or engineers who're working on feature tasks) should focus on product logic. Shared UI components should own styling, accessibility, interaction states, dark/light mode, localization, and other presentation concerns. 
- **Maintainability:** Without shared components, a simple style update often means touching dozens of call sites. With a design system, visual updates happen once. 
- **Better AI-assisted development:** When AI understands the design system, it becomes much more likely to reuse existing components instead of inventing new ones. The result is fewer duplication, smaller and easier prompts, less hallucination and more consistent code generation.

---
## The small design system

I like thinking about a design system as three layers:

```text 
Feature Layer 
────────────────────────── 
Subscription 
Settings 
Profile

Reusable Views 
────────────────────────── 
Buttons 
Containers 
Headers
Remote Image  

Foundation 
────────────────────────── 
Colors 
Typography 
Spacing 
Icons 
Corner Radius
```

The lower it goes, the more reusable the layer becomes. The higher it goes, the closer it gets to product requirements. Every layer should be optimized differently.

### Foundation: automate everything 

The Foundation layer should almost always be reusable. These aren't business requirements but design decisions.  I'd even argue that, in a small team, this layer should primarily be owned by design. 

Modern tooling has made this much easier than before. If the team uses Figma, AI and Figma connectors can generate these tokens directly into the codebase without much effort. Similar workflows are emerging across other design tools as well. Instead of manually recreating colors in Swift, Kotlin, or TypeScript, the design system becomes the single source of truth.

This also naturally improves ownership and streamlines the workflow. Design owns design decisions. Engineering consumes those decisions. Even something as simple as introducing centralized color and typography tokens can dramatically improve consistency across the product.

### Reusable views: optimize for reuse 

The middle layer does not contain feature components but reusable building blocks. A simple question I ask myself is: 

>**Does this become meaningfully more complicated than a one-line implementation?** 

If the answer is yes, it's usually worth considering for this layer. Som examples:
- Components with variants: Take a simple container for example. In SwiftUI, it's just another `View`. In UIKit, it's simply a `UIView`. But real products rarely have only one container style. We quickly end up with filled/unfilled, bordered/borderless, transparent/opaque, full-width/hugging-content, different corner styles, different spacing etc. Rather than letting every feature define these independently, a reusable `Container` provides consistency while remaining generic enough to be shared.
- Components with states: Buttons are another good example. A production-ready button usually contains much more than a tap handler. It often supports primary and secondary variants, icon buttons variants, available/disabled states, accessibility labels, voiceOver support, hover and focus states (where applicable). These are implementation details that shouldn't be solved repeatedly by every feature.
- Components hiding implementation: A good example here is a `RemoteImage` component. The feature doesn't care whether the image is loaded by SDWebImage, Kingfisher or any other networking stack. It shouldn't care whether images are cached in memory, on disk, or both. It shouldn't care whether retries, placeholders, progressive loading, or request deduplication are implemented underneath. Instead, every feature simply writes: `RemoteImage(url: imageURL) `

### Feature components: resist over-engineering 

A question I frequently ask is: 

>**Will I realistically reuse this component without significantly changing it?** 

If the answer is no, I leave it inside the feature. 

A possibly controversial example is a carousel. Carousels are common UI patterns and often involve fairly complicated implementation. It's tempting to immediately build a highly configurable `Carousel` that supports multiple use case. However, for many early-stage products or simpler apps, a carousel may only exist in one place given its large footprint. In that case, I'd argue against making it overly reusable. Instead, focus on building a high-quality carousel for that specific feature. If another feature later needs something similar, that's the right time to extract the shared pieces.

---
## Human Enablement

Before talking about AI, I want to first talk about human enablement. 

Traditionally, many companies with dedicated design system teams also invest in tools like Storybook or dedicated showcase applications. These make it easier for engineers to browse, discover and understand available components. For a small team, I'd argue against investing heavily in these tools early on. Instead, take advantage of what your platform already provides. 

For Apple platforms, SwiftUI Preview is a great example. Every reusable component should have previews covering different variants and states. They serve as lightweight documentation while making development significantly faster. 

---
## AI Enablement

AI-assisted coding changes another important aspect of a design system. Documentation is no longer just written for humans but becomes context for AI. 

AI-assisted software development is another big topic and worths it's own blog post. A few things I've found useful: 
- **Inline documentation.** Explain what the component does, where it should be used, and why it exists. 
- **Include examples.** Showing how a component should be used helps AI understand the intended usage. 
- **Include counterexamples.** Explain when a component should **not** be used. This often prevents AI from misusing a reusable component. 
- **Add reuse to your engineering standards.** If your team has shared AI prompts, Claude Skills, Cursor Rules, or engineering guidelines, include "prefer existing reusable components before creating new ones." 
- **Review for reuse.** If the team uses AI-assisted code reviews, add a check for unnecessary duplicate components or missed reuse opportunities. 
