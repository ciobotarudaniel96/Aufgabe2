"use strict";

//mark the task as complete or incomplete
function TaskCheckboxClicked(taskId) {
    let taskIndex = Tasks.findIndex(task => task.Id == taskId);
    Tasks[taskIndex].completed = !(Tasks[taskIndex].completed);
    return SaveModifiedTask(Tasks[taskIndex]).then(function (response) {
        if (response != SUCCESS) {
            alert(response);
            return response;
        }
        //move the element to complete tasks list
        if (Tasks[taskIndex].completed) {
            let domTask = document.getElementById(ControlNames.TaskListItem(taskId));
            let domTaskCheckBox = document.getElementById(ControlNames.TaskCheckbox(taskId));
            domTaskCheckBox.style.display = "none";
            PageContainers.IncompleteTaskList.removeChild(domTask);
            //find the newest complete task before the modified one
            let prependIndex = 0;
            //exclude itself from the count
            let completeTasks = -1;
            Tasks.forEach(task => {
                if (task.Category == PageDisplayData.ActiveCategory && task.completed && task.Id != Tasks[taskIndex]) {
                    completeTasks++;
                    if (task.Id < Tasks[taskIndex].Id) {
                        prependIndex++;
                    }
                }
            })
            if (completeTasks == prependIndex) {
                PageContainers.CompleteTaskList.appendChild(domTask);
            }
            else {
                PageContainers.CompleteTaskList.insertBefore(domTask, PageContainers.CompleteTaskList.childNodes[prependIndex + 1]);
            }
            //update tasks remaining for the category
            let categoryLabel = document.getElementById(ControlNames.CategoryRemainingTasksLabel(Tasks[taskIndex].Category));
            let tasksLeftForCategory = CountIncompleteTasksForCategory(Tasks[taskIndex].Category);
            if (tasksLeftForCategory == 0) {
                categoryLabel.textContent = "";
            } else {
                categoryLabel.textContent = tasksLeftForCategory;
            }
        } else {
            //not necessary at the moment, since finished tasks cant be marked as "incomplete"
        }
        return response;
    })

}

//shows the first x tasks, x being 10 * how many times the user clicked load more + 1
function ShowTasks(categoryId, amountMultiplier) {
    let numberOfVisibleTasks = 0;
    for (let index = 0, task; index < Tasks.length && (task = Tasks[index]) && numberOfVisibleTasks < 10 * amountMultiplier; index++)
        if (task.Category == categoryId) {
            let domTask = document.getElementById(ControlNames.TaskListItem(task.Id));
            domTask.style.display = "list-item";
            if (!task.completed) {
                numberOfVisibleTasks++;
            }
        }
}

//saves a new task, page refresh happens at the end
function SaveNewTaskClicked() {
    if (PageDisplayData.ActiveCategory == "null" || Categories.length == 0) {
        return new Promise(function(resolve,reject){
            alert("Keine Kathegorie gewählt");
            resolve("Keine Kathegorie gewählt");
        });
    }
    if (validateName(PageInputs.NewTaskInput)) {
        return SaveDesiredTask(PageInputs.NewTaskInput, PageDisplayData.ActiveCategory)
            .then(function (result) {
                if (result != SUCCESS) {
                    alert(result);
                }
              return result;  
            })
    }
    else {
        return new Promise(function(resolve,reject){
            alert(BADINPUTS);
            resolve(BADINPUTS);
        });
    }
    //refresh not necessary since a postback happens on submits
}

function HideAllTasks() {
    if (Tasks == undefined || Tasks.length == 0) {
        return;
    }
    Tasks.forEach(task => {
        let domTask = document.getElementById(ControlNames.TaskListItem(task.Id));
        domTask.style.display = "none";
    })
}

//creates a task list item and its children and returns it
function CreateTask(task, hidden) {
    let newTask = document.createElement("li");
    newTask.setAttribute("Id", ControlNames.TaskListItem(task.Id));
    if (hidden) {
        newTask.style.display = "none";
    }
    //only create the checkbox if the task isnt already completed (since it cant be marked as incomplete)
    if (!task.completed) {
        //checkbox
        let newTaskCheckbox = document.createElement("input");
        newTaskCheckbox.setAttribute("type", "checkbox");
        newTaskCheckbox.setAttribute("Id", ControlNames.TaskCheckbox(task.Id));
        newTaskCheckbox.addEventListener("click", function () { TaskCheckboxClicked(task.Id) }, false);
        newTask.appendChild(newTaskCheckbox);
    }

    //button
    let newTaskButton = document.createElement("button");
    newTaskButton.setAttribute("Id", ControlNames.TaskButton(task.Id));
    newTaskButton.setAttribute("type", "button");
    newTaskButton.addEventListener("click", function () { TaskClicked(task.Id) }, false);
    newTaskButton.classList.add("task-button");
    newTaskButton.appendChild(document.createTextNode(task.Name));
    newTask.appendChild(newTaskButton);
    return newTask;
}
