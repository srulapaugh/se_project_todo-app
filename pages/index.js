import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const addTodoPopupEl = document.querySelector("#add-todo-popup");

const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");

  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",

  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    let date = "";

    if (dateInput) {
      date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const newTodo = {
      name,
      date,
      id: uuidv4(),
      completed: false,
    };

    const todoElement = generateTodo(newTodo);

    section.addItem(todoElement);

    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
