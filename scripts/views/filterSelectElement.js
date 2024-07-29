import { SearchForm } from "./searchForm.js";
import { IngredientList } from "./ingredientList.js";

export class Options{
    constructor(options,name){
        this._options = options;
        this._name = name;

        this.$wrapper = document.createElement("div");
        this.$wrapper.setAttribute("class", "searching-options .manrope-option rounded-3");
        this.$wrapper.setAttribute("aria-label", this._name);
        this.$wrapper.setAttribute("aria-expanded", "true");
        this.$wrapper.setAttribute("name", this._name);
        this.$wrapper.setAttribute("id", this._name);
        this.$wrapper.style.zIndex = "6";
    }

    createOptions(options=this._options){
        const optionHeaderContainer = document.createElement('div');
        optionHeaderContainer.setAttribute('class', 'option-header-container');

        const optionHeader = document.createElement('div');
        optionHeader.setAttribute('class', 'option-header w-100 p-3');

        const optionsName = document.createElement('p');
        optionsName.setAttribute('class', 'option option-name d-flex justify-content-between text-center');
        optionsName.setAttribute('selected', 'selected');
        optionsName.textContent = 
        this._name === "ingredients"
        ? "Ingrédients": this._name === "appareils" 
        ? "Appareils": "Ustensiles";

        
        const searchForm = new SearchForm('options-form');

        optionHeader.appendChild(optionsName);
        optionHeader.appendChild(searchForm.createSearchForm());

        const ingredientList = new IngredientList(this._options,this._name);

        const filters = document.createElement('ul');
        filters.setAttribute("class", "filters d-flex flex-column align-items-start");

        optionHeaderContainer.appendChild(optionHeader);
        optionHeaderContainer.appendChild(ingredientList.createIngredientList());

        this.$wrapper.appendChild(optionHeaderContainer);
        this.$wrapper.appendChild(filters);
        return this.$wrapper;
    }
}