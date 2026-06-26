import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);

  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);

  return todo.getView();
};

const section = new Section({
  items: initialTodos,

  renderer: (item) => {
    renderTodo(item);
  },

  containerSelector: ".todos__list",
});

const renderTodo = (item) => {
  const todoElement = generateTodo(item);

  section.addItem(todoElement);
};

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",

  handleFormSubmit: (inputValues) => {
    const date = inputValues.date ? new Date(inputValues.date) : "";

    if (date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const newTodo = {
      name: inputValues.name,
      date,
      id: uuidv4(),
      completed: false,
    };

    renderTodo(newTodo);

    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
