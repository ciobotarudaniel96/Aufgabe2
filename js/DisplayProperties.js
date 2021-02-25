"use strict";

//display settings which can be influenced by the user
var PageDisplayData = {
    get ActiveCategory() {
        return  sessionStorage.getItem(ACTIVECATEGORYFIELD)?JSON.parse(sessionStorage.getItem(ACTIVECATEGORYFIELD)):null;
    },
    set ActiveCategory(activeCategory) {
        sessionStorage.setItem(ACTIVECATEGORYFIELD, JSON.stringify(activeCategory));
    },
    get loadMoreAmount() {
        return JSON.parse(sessionStorage.getItem(LOADAMOUNT));
    },
    set loadMoreAmount(amount) {
        sessionStorage.setItem(LOADAMOUNT, JSON.stringify(amount));
    },
    get showCompleteTasks() {
        return JSON.parse(sessionStorage.getItem(SHOWFINISHEDTASKS));
    },
    set showCompleteTasks(show) {
        sessionStorage.setItem(SHOWFINISHEDTASKS, JSON.stringify(show));
    }
}

//increase the multiplier for the amount of tasks that should be shown 
function increaseTaskLoadAmount() {
    PageDisplayData.loadMoreAmount++;
    ShowTasks(PageDisplayData.ActiveCategory, PageDisplayData.loadMoreAmount);
}

//enables or disables showing the categories
function toggleFinishedTasks() {
    if (PageDisplayData.showCompleteTasks) {
        PageContainers.CompleteTaskList.style.display = "none";
    } else {
        PageContainers.CompleteTaskList.style.display = "list-item";
    }
    PageDisplayData.showCompleteTasks = !PageDisplayData.showCompleteTasks;
}
