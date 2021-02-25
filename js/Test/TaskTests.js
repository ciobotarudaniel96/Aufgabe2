"use strict";

async function AddTaskToUnselectedCategory() {
    let desc = "add task without category, should fail";
    PageDisplayData.ActiveCategory = null;
    PageInputs.NewTaskInput = "NoCateg";
    return SaveNewTaskClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

//must be tested with at least one Category present (after postback)
async function AddTaskWithBadCharacters() {
    let desc = "add task containing < or >, should fail";
    SelectCategory(Categories[0].Id, true);
    PageInputs.NewTaskInput = "NoCateg><";
    return SaveNewTaskClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}


async function AddNamelessTask() {
    let desc = "add nameless task, should fail";
    PageInputs.NewTaskInput = "";
    return SaveNewTaskClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

//must be tested with at least one Category present (after postback)
async function AddValidTask() {
    let desc = "add task";
    SelectCategory(Categories[0].Id, true);
    PageInputs.NewTaskInput = "VT";
    return SaveNewTaskClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

//must be tested with at least one incomplete Task present (after postback)
async function FinishTask() {
    let desc = "complete Task";
    let incompleteTask = Tasks[Tasks.findIndex(task => task.completed == false)];
    return TaskCheckboxClicked(incompleteTask.Id).then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

async function moreTasks() {
    return new Promise(function (resolve, reject) {
        let desc = "load more";
        let loadMore = PageDisplayData.loadMoreAmount;
        increaseTaskLoadAmount();
        failIfWrong(PageDisplayData.loadMoreAmount == loadMore + 1);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

    //hard to determine success state, easily obserable if there are any completed tasks in the curent category
    async function ToggleVisibility() {
        let desc = "toggle Task visibility";
        return new Promise(function (resolve, reject) {
            toggleFinishedTasks();
            console.log(desc + ": OK");
            resolve(desc + ": OK");
        }).catch(function (error) {
            console.log(desc + ": " + error);
        })
    }