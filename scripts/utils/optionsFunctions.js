//Function qui aident à la manipulation des options

import { Options } from '../pageElements/filterSelectElement.js';
import { IngredientList } from '../pageElements/ingredientListElement.js';

//Prend comme argument une liste de recettes et une option, et met à jour l'élement du DOM avec l'ID correspondant s'il existe,
// sinon va créer un nouveau élement avec la nouvelle liste de recettes
export function createOption(arr,option,div){
        const listToUpdate = document.querySelector(`#${option}-list`);
        if(listToUpdate){
            const newList = new IngredientList(arr,option);
            listToUpdate.parentNode.replaceChild(newList.createIngredientList(),listToUpdate);
        }else{
            const selectOption = new Options(arr, option);
            div.appendChild(selectOption.createOptions());
        }
    }