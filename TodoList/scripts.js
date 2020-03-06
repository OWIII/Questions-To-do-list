'use strict';

const taskInput = document.querySelector(".main__newtask"),
    addButton = document.getElementsByTagName("button")[0],
    incompleteTaskHolder = document.querySelector(".main__incompletetasks"),
    completedTasksHolder = document.querySelector(".main__completedtasks");


const createNewTaskElement = taskString => {
    let listItem = document.createElement("li"),
        checkBox = document.createElement("input"),
        label = document.createElement("label"),
        editInput = document.createElement("input"),
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button");

    label.innerText = taskString;

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Изменить";
    editButton.className = "edit";
    deleteButton.innerText = "Удалить";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};


const addTask = function () {
    if (taskInput.value) {
        let listItem = createNewTaskElement(taskInput.value);

        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    };

    taskInput.value = "";
};

const editTask = function () {
    let listItem = this.parentNode,
        editInput = listItem.querySelector('input[type=text]'),
        label = listItem.querySelector("label"),
        containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode");
};

const deleteTask = function () {
    let listItem = this.parentNode,
        ul = listItem.parentNode;

    ul.removeChild(listItem);
};

const taskCompleted = function () {
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


const taskIncomplete = function () {
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    let checkBox = taskListItem.querySelector("input[type=checkbox]"),
        editButton = taskListItem.querySelector("button.edit"),
        deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

addButton.addEventListener("click", addTask);