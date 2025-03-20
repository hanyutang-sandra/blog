```
layout: post
title: What Happens when the User Taps on Screen?
category: Tech
tag: Featured
```

I was recently asked this question in an iOS engineer interview. Instead of the simple answer regarding **responder chain**, the interviewer requested the answer to be as detailed as possible. After the interview, I digged through internet archives, UIKit documentation as well as answers from ChatGPT to look for information, and this is an revisited version of my answer to the question **"What happens when the User Taps on Screen?"** 

<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2pheWhzdW1wZXkxOHZvdXE2MHFuaGRpdzI2ZGljcHc2N2I2ZzJoNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/st3jqoJJn6qdGPv9br/giphy.gif" title="" alt="Tapping Like This" data-align="center">

# Step 0: Before the Touch Events

Before the touch events start and during view initialization (usually in `viewDidLoad`), target-action pairs are registered and stored for later user. 

- `AddGestureRecognizer` is called, and the target-action pair is registered and stored in an internal array as part of the `UIGestureRecognizer` class

- `addTarget(:action:for)` is called, and the target-action pair is registered and stored in the `UIControl` class

# Step 1: Touch Events are Detected

### Physical Interaction: Hardware Detects the Touch

1. The screen (digitizer) detects the user's finger or Apple Pencil Movement

2. Electronic signals are generated and converted into digital data (raw touch points), and sent to the device's **Touch Controller**

3. The **Touch Controller** analyzes signals to determine precise touch points, pressure, and even multiple touches if applicable.

### Low-level Processing: Touch event is sent to iOS kernel

1. The **iOS kernel** processes the raw touch data from the hardware.

2. Converts raw data into multi-touch events, identifying gestures like taps, swipes, etc.

3. The kernel associates a timestamp with the touch event, which helps order multiple touch events accurately.

### UIKit Processing: Event is forwarded to `UIApplication` via Run Loop

1. The iOS kernel packages the touch data into a `UIEvent` object and sends it to the **main run loop**.

2. The `UIApplication` instance (managed by `UIApplicationMain()`) picks up the event and initiates event-dispatching.

### Hit testing: Event is sent to the active `UIWindow`

1. The `UIWindow` receives the `UIEvent` from `UIApplication`.

2. The window asks the root view controller to perform hit-testing by calling `hitTest(_:with:)` on the root view.

3. `hitTest(_:with:)` starts from the root view and recursively traverses all subviews in reverse drawing order (top-most drawn view first).

4. The traversal continues until a view returns itself as the hit view or `nil` if not found.
   
   - `hitTest` could return `nil` when:
     
     - The user taps on a transparent area (`isUserInteractionEnabled = false`).
     
     - The view has `isHidden = true`.
     
     - The view has `alpha = 0.0`.

### **Passing Event to Responder Chain**

1. Once a `UIView` is identified, UIKit passes the event through the responder chain to the target `UIView`.

# Step 2: **UIEvent Handling Begins**

### Check for Gesture Recognizers

1. If the view has a `UIGestureRecognizer`, it gets the first chance to handle the touch. The gesture recognizer decides whether to intercept the touch or let the view handle it.

### UIView handling

1. `touchesBegan(_:with:)` - Called when a touch begins.

2. `touchesMoved(_:with:)` - Called when the touch moves.

3. `touchesEnded(_:with:)` - Called when the user lifts their finger.

4. `touchesCancelled(_:with:)` - Called if the system interrupts the touch (e.g., incoming call).

### UIControl Handling:

Assuming the view is a `UIButton` and the event is `.touchUpInside`:

1. `UIKit` detects `.touchUpInside` and sends the event to the `UIButton` instance

2. `UIButton` check the internal target-action mapping
   
   - if found:
     
     - By default `UIButton` calls `UIControl.sendAction(_:to:for:)` to trigger the handler locally
     
     - However, if the target is nil, `UIButton` calls `UIApplication.shared.sendAction(_:to:from:for:)`to propagate the event up the response chain
- If not found, the event is not handled.

### **Event Propagation (Responder Chain)**

1. If the view does not handle the event, `UIKit` pass it up the responder chain;

2. If no object handles the event, `UIKit` discards it.

# Step 3: Triggers an Action

### Objc Runtime Handling

1. The target’s selector function (`@objc func buttonTapped()`) executes.

2. The Objective-C runtime uses `objc_msgSend` to invoke the method on the target. (`objc_msgSend(target, action, self)`). GCD/Run Loop ensures the method is called on the correct thread (eg. main thread for UI-related actions).
   
   1. The method is called synchronously within the **current run loop cycle** and returns control to the run loop upon completion.
   
   2. Once the function returns, control goes back to the UIKit event loop. UIKit marks the event as handled. The event does not propagate further in the responder chain.
   
   3. `UIKit` finishes processing the touch event

# Step 4: UI Update (If Needed)

1. `UIKit` schedules the UI updates on the main thread. Views are updated on the next run loop cycle.

# Step 5: Completion

1. Main thread resumes, `UIKit` resumes handling other events

2. After all processing, `UIKit` returns to idle mode, waiting for the next user interaction.
