<?php
function getTasks(){
    return json_encode(getDataFromFile("tasks.json"));
}

function getNewTask($newTask){
    $newTask->Id = uniqid();
    $test=getElementFromFileById("categories.json", $newTask->Category);
    if ($test == null) {
        throw new Exception("Ungültige Kathegorie");
    }

    $newTask->Name = str_replace(array("<", ">"), "", $newTask->Name);

    $newTask->Description = str_replace(array("<", ">"), "", $newTask->Description);

    $newTask->Deadline = str_replace(array("<", ">"), "", $newTask->Deadline);

    $TaskFile = fopen("tasks.json", "a");
    fwrite($TaskFile, json_encode($newTask) . "\n");
    fclose($TaskFile);
    return json_encode("success"); 
}

function modifyTask($changedTask){
    if (getElementFromFileById("tasks.json", $changedTask->Id) == null) {
        throw new Exception("Aufgabe Existiert nicht");
    }

    if (getElementFromFileById("categories.json", $changedTask->Category) == null) {
        throw new Exception("Ungültige Kathegorie");
    }
    $newName = str_replace(array("<", ">"), "", $changedTask->Name);
    $changedTask->Name = $newName;

    $newDescription = str_replace(array("<", ">"), "", $changedTask->Description);
    $changedTask->Description = $newDescription;

    $newDeadline = str_replace(array("<", ">"), "", $changedTask->Deadline);
    $changedTask->Deadline = $newDeadline;

    if (!is_bool($changedTask->completed)) {
        throw new Exception("Falsche Datentyp");
    }

    $tasks = getDataFromFile("tasks.json");
    $TaskFile = fopen("tasks.json", "w");
    foreach ($tasks as $task) {
        if ($task->Id == $changedTask->Id) {
            fwrite($TaskFile, json_encode($changedTask) . "\n");
        } else {
            fwrite($TaskFile, json_encode($task) . "\n");
        }
    }
    fclose($TaskFile);
    return json_encode("success");
}

?>