//prevents inputs of empty spaces
function validateName(text) {
    return text != null && text != undefined && text.replace(" ", "") != "" && !containsHarmfulStrings(text);
}

//descriptions can be null
function validateDescription(text) {
    return !containsHarmfulStrings(text);
}

//prevent sql injection and invalid inputs (client side), must be done server side aswell
function containsHarmfulStrings(text) {
    return text.indexOf("<")!=-1 || text.indexOf(">")!=-1;
}
