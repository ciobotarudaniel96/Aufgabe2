<?php
function getCategories(){
return json_encode(getDataFromFile("categories.json"));
}

function getNewCategory($newCategory)
{
    $newCategory->Id = uniqid();
    $newCategory->Name = str_replace(array("<", ">"), "", $newCategory->Name);
    $CategoryFile = fopen("categories.json", "a");
    fwrite($CategoryFile, json_encode($newCategory) . "\n");
    fclose($CategoryFile);
    return json_encode("success");
}
?>