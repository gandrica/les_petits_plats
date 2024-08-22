//La recherche principale

import { arrayToLowerCase } from "./stringFunctions.js";

//L'algorithme de recherche pour la recherche principale
export function searchText(arr,text){
    //Vérifie si le nom, les ingredients ou la description d'une recette, contiennent le texte passé en arguments - tout en minuscules
    let arrFiltered = arr.filter((recipe)=>{
            return recipe.name.toLowerCase().includes(text.toLowerCase()) 
            || arrayToLowerCase(recipe.ingredients).includes(text.toLowerCase())
            || recipe.description.toLowerCase().includes(text.toLowerCase())
        });
    return arrFiltered;
}