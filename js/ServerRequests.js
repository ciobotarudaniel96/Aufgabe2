"use strict";

//retrieves the tasks from the localstorage/server
function GetTasks() {
    let tasks = JSON.parse(localStorage.getItem(TASKS));
    if (tasks == null) {
        tasks = [];
    }
    return tasks;
}

//overwrites the tasks
function SaveTasks(tasks) {
    localStorage.setItem(TASKS, JSON.stringify(tasks));
    return SUCCESS;
}

//retrieves the categories from localstorage/server
function GetCategories() {
    let categories = JSON.parse(localStorage.getItem(CATEGORIES));
    if (categories == null) {
        categories = [];
    }

    return categories;
}

//overwrites the categories
function SaveCategories(categories) {
    localStorage.setItem(CATEGORIES, JSON.stringify(categories));
    return SUCCESS;
}