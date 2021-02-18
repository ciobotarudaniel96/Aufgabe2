"use strict";

//makes a category as the currently displayed one and hides the tasks belonging to other categories
function SelectCategory(categoryId, resetLoadAmount) {
    PageDisplayData.ActiveCategory = categoryId;
    if (resetLoadAmount) {
        PageDisplayData.loadMoreAmount = 1;
    }
    //deselect all categories
    HideAllTasks();
    Categories.forEach(category => {
        let domCategory = document.getElementById(ControlNames.CategoryButton(category.Id));
        domCategory.classList.remove(ACTIVECATEGORYCLASS);
    })
    //select the correct category
    let selectedCategoryButton = document.getElementById(ControlNames.CategoryButton(categoryId));
    selectedCategoryButton.classList.add(ACTIVECATEGORYCLASS);

    //make the first 10 tasks visible
    ShowTasks(categoryId, PageDisplayData.loadMoreAmount);
}

//saves a new category, page refresh happens at the end
function SaveNewCategoryClicked() {
    if (validateName(PageInputs.NewCategoryInput)) {
        let status = SaveDesiredCategory(PageInputs.NewCategoryInput);
        if (status != SUCCESS) {
            alert(status);
        }
    } else {
        alert(BADINPUTS);
    }
    //refresh not necessary since a postback happens on submits

}

//creates a category list item and its children and returns it
function CreateCategory(category) {
    let newcategory = document.createElement("li");
    newcategory.setAttribute("Id", ControlNames.CategoryListItem(category.Id));

    //category button
    let newcategoryButton = document.createElement("button");
    newcategoryButton.setAttribute("Id", ControlNames.CategoryButton(category.Id));
    newcategoryButton.setAttribute("type", "button");
    newcategoryButton.addEventListener("click", function () { SelectCategory(category.Id, true) }, false);
    newcategoryButton.classList.add(CATEGORYBUTTON);

    //name label
    let categoryNameLabel = document.createElement("label");
    categoryNameLabel.setAttribute("Id", ControlNames.CategoryNameLabel(category.Id));
    categoryNameLabel.classList.add(CATEGORYNAMELABEL);
    categoryNameLabel.textContent = category.Name;

    //number of tasks label
    let taskAmountLabel = document.createElement("label");
    taskAmountLabel.setAttribute("Id", ControlNames.CategoryRemainingTasksLabel(category.Id));
    taskAmountLabel.classList.add(CATEGORYTASKAMOUNTLABEL);
    if (CountIncompleteTasksForCategory(category.Id) != 0) {
        taskAmountLabel.textContent = CountIncompleteTasksForCategory(category.Id);
    }

    newcategoryButton.appendChild(categoryNameLabel);
    newcategoryButton.appendChild(taskAmountLabel);
    newcategory.appendChild(newcategoryButton);
    return newcategory;

}

//returns how many incomplete tasks a category has left
function CountIncompleteTasksForCategory(categoryId) {
    let TasksForCategory = 0;
    if (Tasks != null && Tasks.length > 0) {
        Tasks.forEach(task => {
            if (task.Category == categoryId && !task.completed) {
                TasksForCategory++;
            }
        })
    }
    return TasksForCategory;
}

//creates and saves a category
function SaveDesiredCategory(categoryName) {
    let categories = GetCategories();
    let newCateg = new Category(Date.now(), categoryName);
    categories.push(newCateg);
    return SaveCategories(categories);
}