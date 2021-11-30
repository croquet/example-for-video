# Walkthrough

Current Timing: 39 seconds

---

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

NARRATION: The model now needs to update the dice roll. Let's subscribe to the message and tell all the views what happened.

```js
this.subscribe("dice", "roll", () => {
  this.roll = Math.floor(Math.random() * 6) + 1;
  this.publish("dice", "update");
});
```

NARRATION: Now we can have the view update the UI.

```js
this.subscribe("dice", "update", () => {
  diceRoll.textContent = model.roll;
});
```

NARRATION: And we’re done! Simply scan the QR code in the lower left or share the session URL. Both clients will be perfectly in sync.

VISUAL:

- Expand the QR code in the bottom left corner.
- Show an iPhone Camera overlay scanning it.
- Show an iPhone sitting next to a browser, both with the app up.

## Complete code for example

```html
<html>
  <head>
    <script src="https://unpkg.com/@croquet/croquet@1.0"></script>
  </head>
  <body>
    <script>
      class Dice extends Croquet.Model {
        init() {
          this.roll = 1;
          this.subscribe("dice", "roll", () => {
            this.roll = Math.floor(Math.random() * 6) + 1;
            this.publish("dice", "update");
          });
        }
      }
      Dice.register("Dice");

      class Display extends Croquet.View {
        constructor(model) {
          super(model);
          diceRoll.textContent = model.roll;

          rollButton.onclick = (event) => {
            this.publish("dice", "roll");
          };

          this.subscribe("dice", "update", () => {
            diceRoll.textContent = model.roll;
          });
        }
      }

      Croquet.Session.join({
        apiKey: "18fIEcbGu1vlEAc4bnppPMtIccJ5xIn6J1dJGMeay",
        appId: "io.croquet.video-example",
        name: Croquet.App.autoSession(),
        password: Croquet.App.autoPassword(),
        model: Dice,
        view: Display,
      });

      Croquet.App.makeWidgetDock();
    </script>

    <h1 id="diceRoll">0</h1>
    <button id="rollButton">Roll</button>
  </body>
</html>
```
