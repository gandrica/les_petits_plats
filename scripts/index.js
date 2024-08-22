//Import des données
import {recipes} from './data/recipes.js';

//Import des élements de page
import { SearchForm } from './pageElements/searchFormElement.js';
import { Options } from './pageElements/filterSelectElement.js';
import { IngredientList } from './pageElements/ingredientListElement.js';
import { Galery } from './pageElements/galeryElement.js';

//Import des functions utilisées par les élements de page
import { searchText } from './utils/searchFunctions.js';
import { 
    filterAppareils, 
    filterIngredients, 
    filterUstensils,
    filterRecipesByAppareils,
    filterRecipesByIngredients,
    filterRecipesByUstensils,
    updateOptionsInput,
    createFilter,
    deleteFilter } 
    from './utils/filterFunctions.js';
import { cardAnimation,recetteCardPosition } from './utils/cardFunctions.js';
import { deleteTextButtonAppearance } from './utils/buttonsFunctions.js';

//Variables utilisées par les functions et les events listeners
const searchContainer = document.querySelector('#title');
const searchFormTitle = new SearchForm('title');
searchContainer.appendChild(searchFormTitle.createSearchForm());

const deleteTextButton = document.querySelector('.delete-text-button');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

const recettesForm = document.querySelector('.recettes-form');
const recettesCardsDiv = document.querySelector('.recettes-cards');

//Variables utilisés par les functions et events listeners travaillant avec les filtres
export const state = {
    list: [...recipes],
    filters:{ingredients: [],ustensils:[], appareils:[] }
};
const {filters} = state;
const {ingredients,appareils,ustensils} = filters;

//Prend comme argument une liste de recettes et une option, et met à jour l'élement du DOM avec l'ID correspondant s'il existe,
// sinon va créer un nouveau élement avec la nouvelle liste de recettes
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


//Crée ou met à jour les listes des ingrédients, ustensiles ou appareils avec la liste de recettes en arguments
function displayOptions(arr){
    createOption(new Set(filterIngredients(arr)), 'ingredients');
    createOption(new Set(filterUstensils(arr)), 'ustensils');
    createOption(new Set(filterAppareils(arr)), 'appareils');
}

//Met à jour la galerie avec la liste de recettes en arguments
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
        cardAnimation();
     }
}

//Met a jour les listes et la galerie
function display(arr){
    displayOptions(arr);
    displayGalery(arr);
}

//Utilisée pour filtrer les ingredients,appareils et ustensils à l'aide de la variable state et les functions importées de "./utils/filterFunctions.js"
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

//Supprime le texte de l'input passé en arguments, rend l'icon "x" invisible et met à jour la galerie et les listes d'options
function deleteTextInput(input){
    input.value= "";
    input.setAttribute('placeholder','Rechercher une recette, un ingrédient, ...');
    deleteTextButtonAppearance(deleteTextButton,input)
    display(filterRecipes(recipes));
}

//Traite le texte de l'input passé en argument et met à jour la galerie et les options
function inputTextTraitement(searchInput){
    if(searchInput.value.length <= 2){
        state.list = [...recipes]
        display(filterRecipes(state.list));
    }
    
    else if(searchInput.value.length > 2 && searchInput.className.includes("search-input")){
        const arrSearchInputFiltered = searchText(recipes,searchInput.value);
        state.list = [...arrSearchInputFiltered];
        display(filterRecipes(arrSearchInputFiltered));
    }
    return state.list;
}

//Traite le texte de l'input situé dans les options
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

//Ajuste la position des filtres et met à jour la galerie et les options
function refreshFilters(){
    recetteCardPosition(recettesCardsDiv);
    display(filterRecipes(state.list));
}

//Event listeners
document.addEventListener('DOMContentLoaded', function() {
    //Page initialisation
    display(recipes);

    //Event listeners pour les élements de la recherche principale
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

    //Event listeners differents de "click" pour les élements utilisés par la recherche secondaire
    const optionHeaderContainer = document.querySelectorAll('.option-header-container');
    optionHeaderContainer.forEach(option=>{
        option.addEventListener("mouseleave", e=>{
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
    
    //Event delegation avec "click" pour les élements utilisés par la recherche secondaire
    recettesForm.addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.classList.contains("bi-x-lg") || e.target.classList.contains("filter-delete-button")) {
            deleteFilter(e.target.closest('li'));
            refreshFilters();  
        }
        if(e.target.classList.contains("options-item")){
            createFilter(e.target);
            refreshFilters();
        }
        if(e.target.classList.contains('options-delete-text-icon')){
            texteOptionsInputTraitement(e.target);
        }
        if(e.target.classList.contains("svg-search")) {
            texteOptionsInputTraitement(e.target);
        }
    })
});