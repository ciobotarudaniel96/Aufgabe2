"use strict";

//dynamically created Ids for modifying the class, values etc
var ControlNames = {
    CategoryListItem(Id) {
        return "category" + Id;
    },
    CategoryButton(Id) {
        return this.CategoryListItem(Id) + "Button";
    },
    CategoryNameLabel(Id) {
        return this.CategoryListItem(Id) + "NameLabel";
    },
    CategoryRemainingTasksLabel(Id) {
        return this.CategoryListItem(Id) + "TaskLabel";
    },
    TaskListItem(Id) {
        return "task" + Id;
    },
    TaskCheckbox(Id) {
        return this.TaskListItem(Id) + "Checkbox";
    },
    TaskButton(Id) {
        return this.TaskListItem(Id) + "Button"
    }
}