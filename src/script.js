import * as Croquet from "@croquet/croquet";

class MyModel extends Croquet.Model {
  init() {
    this.todos = new Set();
    this.subscribe("todo", "add", this.onTodoAdded);
  }

  onTodoAdded(todoText) {
    this.todos.add(todoText);
    this.publish("todo", "added", todoText);
  }
}
MyModel.register("MyModel");

class MyView extends Croquet.View {
  constructor(model) {
    super(model);
    todoList.innerHTML = "";
    model.todos.forEach((element) => this.addTodo(element));

    createTodo.onclick = event => this.publish("todo", "add", message.value)
    this.subscribe("todo", "added", this.addTodo);
  }

  addTodo(todoText) {
    const todo = document.createElement("li");
    todo.innerText = todoText;
    todoList.appendChild(todo);
  }
}

Croquet.Session.join({
  appId: "io.croquet.croquet-video-example",
  apiKey: "1_bdoj07sd3kzujn95jhplk2pz8xuio3pbmxx3k7q6",
  name: Croquet.App.autoSession(),
  password: Croquet.App.autoPassword(),
  model: MyModel,
  view: MyView
});