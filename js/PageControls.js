"use strict";
//view containers for the data
var PageContainers = {
    get CategoryList() {
        return document.getElementById(CATEGORYLIST);
    },
    get CompleteTaskList() {
        return document.getElementById(FINISHEDTASKLIST);
    },
    get IncompleteTaskList() {
        return document.getElementById(UNFINISHEDTASKLIST);
    }
}

//user inputs
var PageInputs = {
    get NewCategoryInput() {
        return document.getElementById(NEWCATEGORYINPUT).value;
    },
    get newTaskInput() {
        return document.getElementById(NEWTASKINPUT).value;
    },
    get taskPopup() {
        return document.getElementById(TASKPOPUP);
    },
    get taskPopupName() {
        return document.getElementById(TASKPOPUPNAME).value.trim();
    },
    set taskPopupName(name) {
        document.getElementById(TASKPOPUPNAME).value = name.trim();
    },
    get taskPopupDeadline() {
        return document.getElementById(TASKPOPUPDEADLINE).value;
    },
    set taskPopupDeadline(date) {
        document.getElementById(TASKPOPUPDEADLINE).value = date;
    },
    get taskPopupDescription() {
        return document.getElementById(TASKPOPUPDESCRIPTION).value.trim();
    },
    set taskPopupDescription(description) {
        document.getElementById(TASKPOPUPDESCRIPTION).value = description.trim();
    },
    get searchBar() {
        return document.getElementById(SEARCHTEXT).value.trim();
    },
    set searchBar(text) {
        document.getElementById(SEARCHTEXT).value = text.trim();
    }

}