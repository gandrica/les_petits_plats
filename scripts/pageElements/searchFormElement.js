//Classe utilisée pour la création d'un formulaire de recherche

export class SearchForm{
    constructor(formId){
        this._formId = formId;
        
        this.$wrapper = document.createElement("form");
    }

    //Crée l'élement du DOM avec le formulaire de recherche
    createSearchForm(){
        if(this._formId === "title") {
            this.$wrapper.setAttribute("class", "search-bar-title search-bar container-fluid d-flex justify-content-center w-100");
            this.$wrapper.innerHTML = `
                <input class="search-input form-control rounded-3" type="text" placeholder="Rechercher une recette, un ingrédient, ..." aria-label="Rechercher une recette, un ingrédient,...">
                <button class="delete-text-button"><i class="bi bi-x-lg"></i></button>
                <button type="submit" class="search-button btn btn-dark rounded-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="0.5" viewBox="0 0 16 16">
                        <circle cx="5.5" cy="5.5" r="5" />
                        <line x1="10" y1="10" x2="15" y2="15" />
                    </svg>                                                                  
                </button>
            `;
        }else if(this._formId === "options-form"){
            this.$wrapper.setAttribute("class", "options-search-bar");
            this.$wrapper.innerHTML = `
            <input class="search-bar-options-input rounded-3" type="text" placeholder="">
                <button class="delete-option-input-text-button"><i class="options-delete-text-icon bi bi-x"></i></button>
                <button type="submit" class="search-options-button btn btn-light rounded-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="0.5" viewBox="0 0 16 16" class="svg-search">
                        <circle cx="4.2" cy="4.2" r="3.7" />
                        <line x1="7" y1="7" x2="11" y2="11" />
                    </svg>                                                                  
                </button>
            `;
        }
        
        return this.$wrapper;
    }
}