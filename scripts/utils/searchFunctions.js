//La recherche principale

import { arrayToLowerCase } from "./stringFunctions.js";

//L'algorithme de recherche pour la recherche principale
export function searchText(arr,text){
    const arrFiltered = [];
    
    //Vérifie si le nom, les ingredients ou la description d'une recette, contiennent le texte passé en arguments - tout en minuscules
    for(let i = 0; i<arr.length;i++){
        if(arr[i].name.toLowerCase().includes(text.toLowerCase()) 
            || arrayToLowerCase(arr[i].ingredients).includes(text.toLowerCase())
            || arr[i].description.toLowerCase().includes(text.toLowerCase())){
                arrFiltered.push(arr[i]);
            }
    }

    return arrFiltered;

}