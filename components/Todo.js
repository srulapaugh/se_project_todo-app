class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _toggleCompletion() {
    this._completed = !this._completed;

    this._todoElement.classList.toggle("todo_completed", this._completed);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();

      this._handleCheck(this._completed);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector("todo")
      .cloneNode(true);
  }

  _generateDateEl() {
    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      this._todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");

    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;

    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _remove = () => {
    this._todoElement.remove();
  };

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDateEl = this._todoElement.querySelector(".todo__date");

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDateEl();
    return this._todoElement;
  }
}

export default Todo;
