export class IngredientList{
    constructor(list,id){
        this._list = list;
        this._id = id;
        this.$wrapper = document.createElement('ul');
        this.$wrapper.setAttribute("class", "form-options d-flex flex-column align-items-start");
        this.$wrapper.setAttribute("id",`${this._id}-list`);
    }

    createIngredientList(){
        this._list.forEach(el => {
            const li = document.createElement('li');
            li.textContent = el;
            li.setAttribute("class", "options-item px-3 py-2");
            this.$wrapper.appendChild(li)
        });
        return this.$wrapper;
    }
}