"use strict";

class Category {
    constructor(Id, Name) {
        this.Id = Id;
        this.Name = Name;
    }
}

class Task {
    constructor(Id, Name, Category, Description, Deadline = null, completed) {
        this.Id = Id;
        this.Name = Name;
        this.Category = Category;
        this.Description = Description;
        this.Deadline = Deadline;
        this.completed = completed;
    }
}
