import { arrayToLowerCase } from "./stringFunctions.js";

//Functions used by the main search algorithm
export function searchText(arr,text){
    /* const arrFiltered = [];

    for(let i = 0; i<arr.length;i++){
        if(arr[i].name.toLowerCase().includes(text.toLowerCase()) 
            || arrayToLowerCase(arr[i].ingredients).includes(text.toLowerCase())
            || arr[i].description.toLowerCase().includes(text.toLowerCase())){
                arrFiltered.push(arr[i]);
            }
    } */

    let arrFiltered = arr.filter((recipe)=>{
            return recipe.name.toLowerCase().includes(text.toLowerCase()) 
            || arrayToLowerCase(recipe.ingredients).includes(text.toLowerCase())
            || recipe.description.toLowerCase().includes(text.toLowerCase())
        });
    return arrFiltered;
}