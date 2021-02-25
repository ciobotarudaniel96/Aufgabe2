<?php 
#creates an array from the file
function getDataFromFile($fileName){
    $dataFile = fopen($fileName, "c+");
    $data = [];
    while (!feof($dataFile)) {
        $line = fgets($dataFile);
        if (trim($line) != '') {
            $dataLine = json_decode($line);
            array_push($data, $dataLine);
        }
    }
    fclose($dataFile);
    return $data;
}

#finds the element with the given Id in the given file
function getElementFromFileById($fileName, $elementId){
    $dataFile = fopen($fileName, "r");
    $element = null;
    while (!feof($dataFile)) {
        $line = fgets($dataFile);
        if (trim($line) != '') {
            $element = json_decode($line);
            if ($element->Id == $elementId) {
                fclose($dataFile);
                return $element;
            }
        }
    }
    fclose($dataFile);
    return null;
}
