<?php
include "dataRetriever.php";
include "taskRequests.php";
include "categoryRequests.php";
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
if (isset($_GET['requestType'])) {
    $requestType = $_GET['requestType'];
}

//validation would be made here if accounts/users existed
try {
    switch ($requestType) {
        case 1:
            echo getCategories();
            break;
        case 2:
            echo getTasks();
            break;
        case 3: //new category
            $newCategory = json_decode(file_get_contents("php://input"));
            echo getNewCategory($newCategory);
            break;
        case 4: //new task
            $newTask = json_decode(file_get_contents("php://input"));
            echo getNewTask($newTask);
            break;
        case 5: //modify task
            $changedTask = json_decode(file_get_contents("php://input"));
            echo modifyTask($changedTask);
            break;
    }
} catch (Exception $ex) {
    echo json_encode($ex->getMessage());
}
