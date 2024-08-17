//Takes an array as argument and transforms the values into lower cases 
export function arrayToLowerCase(arr){
    const arrModified = arr.map(obj=> {
        return obj.ingredient ? obj.ingredient.toLowerCase():
        obj.toLowerCase()})
    return arrModified;
}

export function stringToUpperCase(string){
    const ingredientLowerCase = string.toLowerCase()
    const ingredientFirstLetterToUppercase = ingredientLowerCase[0].toUpperCase() + ingredientLowerCase.slice(1);
    return ingredientFirstLetterToUppercase;
}