"use strict";


//variables containing the data of the lists
var Categories, Tasks, ActiveTask;

//wait for page to load before building the elements
document.addEventListener('DOMContentLoaded', function (event) {
    InitializeData();
})

//builds the page elements 
function InitializeData() {
    //add keyup event for the search bar
    document.getElementById(SEARCHTEXT).addEventListener("keyup", function (event) {
            searchAndHighlight(PageInputs.searchBar);
    })

    //load categories and tasks
    Categories = GetCategories();
    Tasks = GetTasks();
    //if no data is present, initialize the multiplier
    if(PageDisplayData.loadMoreAmount==null)
    {
        PageDisplayData.loadMoreAmount=1;
    }
    //if there is no category yet, there cant exist other elements
    if (Categories.length == 0) {
        return;
    }

    //create the categories and append them to their container
    Categories.forEach(category => {
        let domCategory = CreateCategory(category);
        PageContainers.CategoryList.appendChild(domCategory);
    })
    //create the tasks and append them to their container
    Tasks.forEach(task => {
        let domTask = CreateTask(task, true);
        if (task.completed) {
            PageContainers.CompleteTaskList.appendChild(domTask);
        } else {
            PageContainers.IncompleteTaskList.appendChild(domTask);
        }
    })
    //default to the first category as selected if none is selected
    if (isNaN(parseInt(PageDisplayData.ActiveCategory))) {
        SelectCategory(Categories[0].Id, false);
    } else {
        SelectCategory(PageDisplayData.ActiveCategory, false);
    }
    if (PageDisplayData.showCompleteTasks == true) {
        PageContainers.CompleteTaskList.style.display = "list-item";
    } else {
        PageContainers.CompleteTaskList.style.display = "none";
    }
}
