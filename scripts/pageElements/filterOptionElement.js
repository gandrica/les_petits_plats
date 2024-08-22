//Classe utilisée pour la création de filtres placés sous les listes d'options
export class FilterOption{
    constructor(name,item){
        this._name = name;
        this._item = item;

    }

    //Crée l'élement DOM du filtre
    createFilterItem(){
        const filters = document.querySelector(`#${this._name}>.filters`);
        const li = document.createElement('li');
        li.setAttribute('class','option-filter d-flex px-3 align-items-center justify-content-between');
    
        const p = document.createElement('p');
        p.setAttribute('class','option-filter-text pt-3');
        p.textContent = this._item;
    
        const button = document.createElement('button');
        button.setAttribute('class',"filter-delete-button");
        button.innerHTML = `<i class="bi bi-x-lg"></i>`;
    
        li.appendChild(p);
        li.appendChild(button);
    
        filters.appendChild(li);
    }
}