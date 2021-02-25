"use strict";

function failIfWrong(successCondition) {
    if (!successCondition) {
        throw new Error();
    }
}

//Poor implementation, alternatives were waiting for the last item to load (which changes with tests) or add an event at the end of the Initialize function (could mess up production
//if forgotten). The current option was selected for this scope, a framework would be used for larger projects. 
setTimeout(() => { runTests(); }, 1000);
function runTests() {


    AddNamelessCategory()
    .then(AddValidCategory)
    .then(AddCategoryWithBadCharacters)
    .then(SwapCategory)
    .then(AddTaskToUnselectedCategory)
    .then(AddTaskWithBadCharacters)
    .then(AddNamelessTask)
    .then(AddValidTask)
    .then(FinishTask)
    .then(moreTasks)
    .then(ToggleVisibility);
}