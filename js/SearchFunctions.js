"use strict";

//highlights the tasks which have the desired string and their categories, resets the highlights if the search field is empty
function searchAndHighlight(textToSearch) {

    //remove all highlights
    Categories.forEach(category => {
        document.getElementById(ControlNames.CategoryButton(category.Id)).classList.remove(HIGHLIGHTED);
    });
    Tasks.forEach(task => {
        document.getElementById(ControlNames.TaskButton(task.Id)).classList.remove(HIGHLIGHTED);
    })

    //highlight nothing if there's no text
    if (textToSearch == "") {
        return;
    }
    let categoriesContainingText = [];
    let searchText = textToSearch.toLowerCase();
    Tasks.forEach(task => {
        let lowerTaskName = task.Name.toLowerCase();
        let lowerTaskDesc = "";
        //ignore empty descriptions
        if (task.Description != undefined) {
            lowerTaskDesc = task.Description.toLowerCase();
        }
        //match for name or description
        if ((task.Description != "" && lowerTaskDesc.indexOf(searchText) != -1) || lowerTaskName.indexOf(searchText) != -1) {
            categoriesContainingText.push(task.Category);
            document.getElementById(ControlNames.TaskButton(task.Id)).classList.add(HIGHLIGHTED);
            categoriesContainingText.push(task.Category);
        }
    })
    //filter duplicate contents
    categoriesContainingText = new Set(categoriesContainingText);
    categoriesContainingText.forEach(categoryId => {
        document.getElementById(ControlNames.CategoryButton(categoryId)).classList.add(HIGHLIGHTED);
    })
}