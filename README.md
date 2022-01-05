# Croquet Dice Rolling Example

This is a simple example of a Croquet application as used in our promotional video (link to be provided).

## Complete code for example

See [index.html](index.html)

## Walkthrough

NARRATION: We start out with a basic web page and import the Croquet library.

```html
<html>
  <head>
    <script src="https://unpkg.com/@croquet/croquet@1.0"></script>
  </head>
  <body>
    <script></script>
  </body>
</html>
```

NARRATION: Now we create a Croquet model which will handle all the calculation and store the synchronized state for all users.

```html
<script>
  class Dice extends Croquet.Model {
    init() {
      this.roll = 1;
    }
  }
</script>
```

NARRATION: Next, we create a Croquet view which will handle all input and output and display the UI.

```html
<h1 id="diceRoll">0</h1>
<script>
  class Display extends Croquet.View {
    constructor(model) {
      super(model);
      diceRoll.textContent = model.roll;
    }
  }
</script>
```

NARRATION: Now we need to roll that dice. Let's create a button and send a message to the model to let it know a user has rolled the dice.

```html
<button id="rollButton">Roll</button>
```

```js
rollButton.onclick = (event) => {
  this.publish("dice", "roll");
};
```

NARRATION: The model now needs to update the dice roll. Let's subscribe to the message ...

```js
this.subscribe("dice", "roll", this.rollDice);
```

NARRATION: ... and tell all the views what happened.

```js
rollDice() {
  this.roll = Math.floor(Math.random() * 6) + 1;
  this.publish("dice", "changed");
}
```

NARRATION: Now we can have the view update the UI.

```js
this.subscribe("dice", "changed", () => {
  diceRoll.textContent = model.roll;
});
```

NARRATION: Finally, we connect to a Croquet session.

```js
Croquet.Session.join({
  apiKey: "get-your-own-key!",
  appId: "io.croquet.video-example",
  name: Croquet.App.autoSession(),
  password: Croquet.App.autoPassword(),
  model: Dice,
  view: Display,
});
```

NARRATION: And we’re done! Simply scan the QR code in the lower left or share the session URL. Both clients will be perfectly in sync.

