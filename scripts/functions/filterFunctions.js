import { stringToUpperCase } from './stringFunctions.js';
import { state } from '../index.js';
import { FilterOption } from '../pageElements/filterOptionElement.js';

export function filterIngredients(arr){
    const ingredientsArr = arr.map(
        recipe => recipe.ingredients.map(
            ingredient => stringToUpperCase(ingredient.ingredient)
        )
    ).flat(Infinity);

    return ingredientsArr;
}

export function filterUstensils(arr){
    const ustensilsArr = arr
        .map(recipe=> recipe.ustensils)
        .flat(Infinity)
        .map(ustensil => stringToUpperCase(ustensil));

   return ustensilsArr;
}

export function filterAppareils(arr){
    const appareilsArr =  arr
        .map(recipe=> recipe.appliance)
        .map(appareil => stringToUpperCase(appareil));

    return appareilsArr;
}

export function filterRecipesByIngredients(arr){
    const ingredientsListFiltered = arr.filter(recipe => {
        const ingredientsVerification = !recipe.ingredients.some(ingredient => 
            state.filters.ingredients.includes(stringToUpperCase(ingredient.ingredient)));
        if(ingredientsVerification){return false;}
        return true;
    });
    return ingredientsListFiltered
}

export function filterRecipesByAppareils(arr){
    const appareilsListFiltered = arr.filter(recipe => {
        const appareilsVerification = !state.filters.appareils.includes(stringToUpperCase(recipe.appliance));
        if(appareilsVerification){return false;}
        return true;
    });
    return appareilsListFiltered;
}

export function filterRecipesByUstensils(arr){
    const ustensilsListFiltered = arr.filter(recipe => {
        const ustensilsVerification = !recipe.ustensils.some(ustensil => state.filters.ustensils.includes(stringToUpperCase(ustensil)));
        if(ustensilsVerification){return false;}
        return true;
    });
    return ustensilsListFiltered;
}

function filterOptionArray(arr,inputText){
    return arr.filter(option => option.toLowerCase().includes(inputText.toLowerCase()));
}

function filterInputOptionsList(arr,inputText,id){
    const listOptionsFiltered = id === 'ingredients'
    ? filterOptionArray([...new Set(filterIngredients(arr))],inputText) : id === 'ustensils'
    ? filterOptionArray([...new Set(filterUstensils(arr))],inputText) : id === 'appareils'
    ? filterOptionArray([...new Set(filterAppareils(arr))],inputText): null;
    return listOptionsFiltered;
}

export function updateOptionsInput(inputText,id){
    const listOptions = filterInputOptionsList(state.list,inputText,id);
    const deleteInputTextIcon = document.querySelector(`#${id} .options-delete-text-icon`);
    const input = document.querySelector(`#${id} .search-bar-options-input`);
    deleteTextButtonAppearance(deleteInputTextIcon,input);

    if(id === 'ingredients'){
        createOption(listOptions, 'ingredients');
    }else if(id === 'ustensils'){
        createOption(listOptions, 'ustensils');
    }else if(id === 'appareils'){
        createOption(listOptions, 'appareils');
    }else return;
}

export function createFilter(element){
    const item = element.textContent;
    const searchingOptionsId = element.closest('.searching-options').id;
    if(state.filters[searchingOptionsId].includes(item)) {return;}
    else {
        state.filters[searchingOptionsId].push(item);
        const filter = new FilterOption(searchingOptionsId,item);
        filter.createFilterItem();
    }
}

export function deleteFilter(element){
    const elementId= element.closest('.searching-options').id
    const elementIndex = state.filters[elementId].indexOf(element.textContent);
    state.filters[elementId].splice(elementIndex,1);
    element.remove();
}