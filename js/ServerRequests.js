"use strict";
//creates and saves a category
function SaveDesiredCategory(categoryName) {
    let newCateg = new Category(Date.now(), categoryName);
    return PromiseHandler(POST,ServerRequestType.SAVENEWCATEGORY,JSON.stringify(newCateg));
}

//creates and saves a Task
function SaveDesiredTask(taskName, taskCategory) {
    let newTask = new Task(Date.now(), taskName, taskCategory, "", null, false);
    return PromiseHandler(POST, ServerRequestType.SAVENEWTASK, JSON.stringify(newTask))

}

function GetCategories() {
    return PromiseHandler(GET,ServerRequestType.GETCATEGORIES);
}

function GetTasks() {
    return PromiseHandler(GET,ServerRequestType.GETTASKS);
}


function SaveModifiedTask(task)
{
    let modifiedTaskJson=JSON.stringify(task);
    return PromiseHandler(POST,ServerRequestType.MODIFYTASK,modifiedTaskJson);
}



function PromiseHandler(type,requestType,sentData=null)
{
    return new Promise(function (resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        }
        xmlHttp.open(type, "http://localhost/index.php?requestType="+requestType);
        if(type==GET)
        {
        xmlHttp.send();
        }
        if(type==POST)
        {
        xmlHttp.send(sentData);
        }

    })
}