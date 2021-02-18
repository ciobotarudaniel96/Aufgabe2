//sets the active task and opens the popup
function TaskClicked(taskId) {
    //setActiveTask
    ActiveTask = taskId;
    //show popup
    PageInputs.taskPopup.style.display = "flex";
    //fill in values
    let activeTask = Tasks[Tasks.findIndex(task => task.Id == taskId)];
    PageInputs.taskPopupName = activeTask.Name;
    PageInputs.taskPopupDeadline = activeTask.Deadline;
    if (activeTask.Description != undefined) {
        PageInputs.taskPopupDescription = activeTask.Description;
    } else {
        PageInputs.taskPopupDescription = "";
    }
}

function closeTaskPopup() {
    PageInputs.taskPopup.style.display = "none";
}

//saves modifications done to a task through the popup
function saveTaskChanges() {
    if (!validateName(PageInputs.taskPopupName) || !validateDescription(PageInputs.taskPopupDescription)) {
        alert(BADINPUTS);
        return;
    }
    let activeTaskIndex = Tasks.findIndex(task => task.Id == ActiveTask);
    Tasks[activeTaskIndex].Description = PageInputs.taskPopupDescription;
    Tasks[activeTaskIndex].Deadline = PageInputs.taskPopupDeadline;
    Tasks[activeTaskIndex].Name = PageInputs.taskPopupName;
    SaveTasks(Tasks);

}

//close the popup when clicking outside it
window.onclick = function (event) {
    if (event.target == PageInputs.taskPopup) {
        closeTaskPopup();
    }
}

//close popup on esc key down
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape")
        closeTaskPopup();
})
