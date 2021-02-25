"use strict";

async function AddNamelessCategory() {
    let desc = "add empty category, should fail";
    PageInputs.NewCategoryInput = "";
    return SaveNewCategoryClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

async function AddValidCategory() {
    let desc = "add valid Category";
    PageInputs.NewCategoryInput = "VC1";
    return SaveNewCategoryClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}

async function AddCategoryWithBadCharacters() {
    let desc = "add Category containing < or > Category, should fail";
    PageInputs.NewCategoryInput = "IC>><";
    return SaveNewCategoryClicked().then(function (result) {
        failIfWrong(result == SUCCESS);
        console.log(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}


//must be tested with at least 2 Category present (after postback)
async function SwapCategory() {
    let desc = "Swap Category";
    let inactiveCategory = Categories[Categories.findIndex(category => category.Id != PageDisplayData.ActiveCategory)];
    return new Promise(function (resolve, reject) {
        SelectCategory(inactiveCategory.Id);
        failIfWrong(PageDisplayData.ActiveCategory == inactiveCategory.Id);
        console.log(desc + ": OK");
        resolve(desc + ": OK");
    }).catch(function (error) {
        console.log(desc + ": " + error);
    })
}
