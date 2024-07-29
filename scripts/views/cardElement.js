export class CardElement{
    constructor(card){
        this._card = card;

        this.$wrapper = document.createElement("div");
        this.$wrapper.setAttribute("class", "card");
    }

    fixUnits(ing){
        let unitModified = ing.unit ?? "";
        if(ing.ingredient && !ing.quantity) {unitModified = "-"; return unitModified}
        if(unitModified.includes("cuillères") || unitModified.includes("cuillère")) unitModified = " "+unitModified;
        if(unitModified !== "" && ing.quantity < 2){
            if(unitModified.includes("cuillères")) unitModified = unitModified.replace('cuillères', 'cuillère');
            else unitModified = unitModified.slice(0,unitModified.length-1);
        }
        return unitModified;
    }

    createIngredients(ul){
        this._card.ingredients.forEach(ing=>{
            const li = document.createElement('li');
            li.setAttribute('class', 'col-6')
            li.innerHTML = `
                <p class="manrope-p list-item-ingredient mb-0">${ing.ingredient}</p>
                <p class="manrope-p list-item-quantity">${ing.quantity?? ""}${this.fixUnits(ing)}</p>
            `;
            ul.appendChild(li);
        });
    }

    createCard(){
        const time = document.createElement('span');
        time.setAttribute('class','card-time text-center pt-1');
        time.textContent = this._card.time+'min';

        this.$wrapper.appendChild(time);

        const cardImgContainer = document.createElement('div');
        cardImgContainer.setAttribute('class', 'card-img-container');
        const img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute("src", `${this._card.image}`);
        img.setAttribute('alt', `${this._card.name}`);
        cardImgContainer.appendChild(img);
        this.$wrapper.appendChild(cardImgContainer);

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body pt-4 pb-2');

        const h4 =  document.createElement('h4');
        h4.setAttribute('class', 'card-name anton-h4');
        h4.textContent = this._card.name;

        const recetteTitle =  document.createElement('h5');
        recetteTitle.setAttribute('class', 'card-section-title manrope-h5 pt-4 pb-2');
        recetteTitle.textContent = "RECETTE";

        const p =  document.createElement('p');
        p.setAttribute('class', 'card-text manrope-p');
        p.textContent = this._card.description;

        const ingredientsTitle =  document.createElement('h5');
        ingredientsTitle.setAttribute('class', 'card-section-title manrope-h5 pt-3 pb-2');
        ingredientsTitle.textContent = "INGR\u00C9DIENTS";

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'card-list-items container d-flex flex-row flex-wrap list-group list-group-flush');
        this.createIngredients(ul);

        cardBody.appendChild(h4);
        cardBody.appendChild(recetteTitle);
        cardBody.appendChild(p);
        cardBody.appendChild(ingredientsTitle);
        cardBody.appendChild(ul);

        this.$wrapper.appendChild(cardBody);

        return this.$wrapper;
    }
}