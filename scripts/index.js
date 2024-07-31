//Imports for needed files
import {recipes} from '../data/recipes.js';
import { SearchForm } from './views/searchForm.js';
import { Options } from './views/filterSelectElement.js';
import { FilterOption } from './views/filterOptionElement.js';
import { IngredientList } from './views/ingredientList.js';
import { Galery } from './views/galeryElement.js';

//Variables
const searchContainer = document.querySelector('#title');
const searchFormTitle = new SearchForm('title');
searchContainer.appendChild(searchFormTitle.createSearchForm());

const deleteTextButton = document.querySelector('.delete-text-button');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

const recettesForm = document.querySelector('.recettes-form');
const recettesCardsDiv = document.querySelector('.recettes-cards');

const state = {
    list: [...recipes],
    filters:{ingredients: [],ustensils:[], appareils:[] }
};
const {filters} = state;
const {ingredients,appareils,ustensils} = filters;

//Functions used to create the options
function stringToUpperCase(string){
    const ingredientLowerCase = string.toLowerCase()
    const ingredientFirstLetterToUppercase = ingredientLowerCase[0].toUpperCase() + ingredientLowerCase.slice(1);
    return ingredientFirstLetterToUppercase;
}

function filterIngredients(arr){
    const ingredientsArr = arr.map(
        recipe => recipe.ingredients.map(
            ingredient => stringToUpperCase(ingredient.ingredient)
        )
    ).flat(Infinity);

    return ingredientsArr;
}

function filterUstensils(arr){
    const ustensilsArr = arr
        .map(recipe=> recipe.ustensils)
        .flat(Infinity)
        .map(ustensil => stringToUpperCase(ustensil));

   return ustensilsArr;
}

function filterAppareils(arr){
    const appareilsArr =  arr
        .map(recipe=> recipe.appliance)
        .map(appareil => stringToUpperCase(appareil));

    return appareilsArr;
}

function createOption(arr,option){
    const listToUpdate = document.querySelector(`#${option}-list`);
    if(listToUpdate){
        const newList = new IngredientList(arr,option);
        listToUpdate.parentNode.replaceChild(newList.createIngredientList(),listToUpdate);
    }else{
        const selectOption = new Options(arr, option);
        recettesForm.appendChild(selectOption.createOptions());
    }
}

function displayOptions(arr){
    createOption(new Set(filterIngredients(arr)), 'ingredients');
    createOption(new Set(filterUstensils(arr)), 'ustensils');
    createOption(new Set(filterAppareils(arr)), 'appareils');
}

//Functions to display components of the page
function displayGalery(arr){
    if(!arr.length){
        //The textContent property sanitize against HTML injections
         recettesCardsDiv.textContent = `Aucune recette ne contient ${searchInput.value} vous pouvez chercher «
         tarte aux pommes », « poisson », etc.`;
 
         const recettesNumber = document.querySelector('.recettes-number');
         recettesNumber.textContent = arr.length;
 
     }else {
         recettesCardsDiv.innerHTML = '';
 
         const recettesNumber = document.querySelector('.recettes-number');
         recettesNumber.textContent = arr.length;
 
         const galery = new Galery(arr);
         recettesCardsDiv.appendChild(galery.createGalery());
     }
}

function display(arr){
    displayOptions(arr);
    displayGalery(arr);
}

/* Functions used by the main input for the text deletion 
and delete-text-button appearance */
function deleteTextButtonAppearance(element,searchInput){
    if(searchInput.value.length > 2) {
        element.style.visibility = "visible";
        element.style.zIndex = "3";
    }else {
        element.style.visibility = "hidden";
        element.style.zIndex = "1";
    }
}

function deleteTextInput(input){
    input.value= "";
    input.setAttribute('placeholder','Rechercher une recette, un ingrédient, ...');
    deleteTextButtonAppearance(deleteTextButton,input)
    display(filterRecipes(recipes));
}

//Functions used by the main search algorithm
function filterText(arr,text){
    let arrFiltered = arr.filter((recipe)=>{
            return recipe.name.toLowerCase().includes(text.toLowerCase()) 
            || arrayToLowerCase(recipe.ingredients).includes(text.toLowerCase())
            || recipe.description.toLowerCase().includes(text.toLowerCase())
        });
    return arrFiltered;
}

function inputTextTraitement(searchInput){
    if(searchInput.value.length <= 2){
        state.list = [...recipes]
        display(filterRecipes(state.list));
    }
    
    else if(searchInput.value.length > 2 && searchInput.className.includes("search-input")){
        const arrSearchInputFiltered = filterText(recipes,searchInput.value);
        state.list = [...arrSearchInputFiltered];
        display(filterRecipes(arrSearchInputFiltered));
    }
    return state.list;
}

function arrayToLowerCase(arr){
    const arrModified = arr.map(obj=> {
        return obj.ingredient ? obj.ingredient.toLowerCase():
        obj.toLowerCase()})
    return arrModified;
}

//Functions used by the filters algorithm
function filterRecipesByIngredients(arr){
    const ingredientsListFiltered = arr.filter(recipe => {
        const ingredientsVerification = !recipe.ingredients.some(ingredient => 
            state.filters.ingredients.includes(stringToUpperCase(ingredient.ingredient)));
        if(ingredientsVerification){return false;}
        return true;
    });
    return ingredientsListFiltered
}

function filterRecipesByAppareils(arr){
    const appareilsListFiltered = arr.filter(recipe => {
        const appareilsVerification = !state.filters.appareils.includes(stringToUpperCase(recipe.appliance));
        if(appareilsVerification){return false;}
        return true;
    });
    return appareilsListFiltered;
}

function filterRecipesByUstensils(arr){
    const ustensilsListFiltered = arr.filter(recipe => {
        const ustensilsVerification = !recipe.ustensils.some(ustensil => state.filters.ustensils.includes(stringToUpperCase(ustensil)));
        if(ustensilsVerification){return false;}
        return true;
    });
    return ustensilsListFiltered;
}

function filterRecipes(arr){
    if(searchInput.value.length <= 2){
        state.list = [...recipes];
    }
   if (!ingredients.length && !appareils.length && !ustensils.length) {
       return arr;
   }else {
        let arrFiltered = [...arr];
        if(filterRecipesByIngredients(arr).length){
            arrFiltered = filterRecipesByIngredients(arrFiltered);
        }
        if(filterRecipesByUstensils(arr).length){
            arrFiltered = filterRecipesByUstensils(arrFiltered);
        }
        if(filterRecipesByAppareils(arr).length){
            arrFiltered = filterRecipesByAppareils(arrFiltered);
        }
        return arrFiltered;
   }
}

//Functions used for the creation,update and deletion of filters
function recetteCardPosition(){
    recettesCardsDiv.style.top = 
    ` calc(116vh + ${Math.max(ingredients.length,appareils.length,ustensils.length)*73}px)
    `;
}

function createFilter(element){
    const item = element.textContent;
    const searchingOptionsId = element.closest('.searching-options').id;
    if(state.filters[searchingOptionsId].includes(item)) {return;}
    else {
        state.filters[searchingOptionsId].push(item);
        const filter = new FilterOption(searchingOptionsId,item);
        filter.createFilterItem();
        recetteCardPosition();
        display(filterRecipes(state.list));
    }
}

function deleteFilter(element){
    const elementId= element.closest('.searching-options').id
    const elementIndex = state.filters[elementId].indexOf(element.textContent);
    state.filters[elementId].splice(elementIndex,1);
    element.remove();
    recetteCardPosition();
    display(filterRecipes(state.list));
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

function updateOptionsInput(inputText,id){
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

//Filters input text treatment function
function texteOptionsInputTraitement(element){
    if(element.classList.contains('options-delete-text-icon')){
        const input = element.closest('.options-search-bar').children[0];
        input.value = "";
        const id = element.closest('.searching-options').id;
        updateOptionsInput(input.value,id);
    }
    else if(element.classList.contains("search-bar-options-input")){
        const inputText = element.value;
        const optionsInputId = element.closest(".searching-options").id;
        updateOptionsInput(inputText,optionsInputId)
    }else if(element.classList.contains('svg-search')){
        const input = element.closest('.options-search-bar').children[0];
        const id = element.closest('.searching-options').id;
        updateOptionsInput(input.value,id);
        input.value = "";
    }
}

//Event listeners
document.addEventListener('DOMContentLoaded', function() {
    //Page initialisation
    display(recipes);

    //Needed for the animation of the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.setProperty('--item-index', index);
    });

    const optionHeaderContainer = document.querySelectorAll('.option-header-container');
    
    //Event listeners for the main input elements
    searchInput.addEventListener('input',(e) => {
        e.preventDefault();
        inputTextTraitement(e.target);
    })
    searchInput.addEventListener('input',(e) => {
        e.preventDefault();
        deleteTextButtonAppearance(deleteTextButton,e.target);
    })
    searchButton.addEventListener('click',(e) => {
        e.preventDefault();
        inputTextTraitement(searchInput);
    });
    
    deleteTextButton.addEventListener('click',(e) => {
        e.preventDefault();
        deleteTextInput(searchInput);
    });

    //Event listeners for the filters elements
    optionHeaderContainer.forEach(option=>{
        option.addEventListener("mouseout", e=>{
            e.preventDefault();
            e.target.closest(".option-header-container").style.cssText = "overflow:hidden; height:56px";
        })
         option.addEventListener("mouseover", e=>{
            e.preventDefault();
            e.target.closest(".option-header-container").style.cssText = "overflow:visible; height:auto";
        })
        option.addEventListener('input', (e)=>{
            if(e.target.className.includes("search-bar-options-input")){
                texteOptionsInputTraitement(e.target);
            }
        })
    })
    
    recettesForm.addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.classList.contains("bi-x-lg") || e.target.classList.contains("filter-delete-button")) {
            deleteFilter(e.target.closest('li'));   
        }
        if(e.target.classList.contains("options-item")){
            createFilter(e.target);
        }
        if(e.target.classList.contains('options-delete-text-icon')){
            texteOptionsInputTraitement(e.target);
        }
        if(e.target.classList.contains("svg-search")) {
            texteOptionsInputTraitement(e.target);
        }
    })
});


