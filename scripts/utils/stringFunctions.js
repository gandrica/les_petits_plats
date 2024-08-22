//Functions qui utilisent les chaînes de caractères

//Prend une array comme argument et transforme ses valeurs en minuscules
export function arrayToLowerCase(arr){
    const arrModified = arr.map(obj=> {
        return obj.ingredient ? obj.ingredient.toLowerCase():
        obj.toLowerCase()})
    return arrModified;
}

//Prend une string comme argument et transforme sa première lettre en majuscules
export function stringToUpperCase(string){
    const ingredientLowerCase = string.toLowerCase()
    const ingredientFirstLetterToUppercase = ingredientLowerCase[0].toUpperCase() + ingredientLowerCase.slice(1);
    return ingredientFirstLetterToUppercase;
}