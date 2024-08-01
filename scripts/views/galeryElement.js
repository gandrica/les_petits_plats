import { CardModel } from "../models/cardModel.js";
import { CardElement } from "./cardElement.js";

export class Galery{
    constructor(list){
        this._list = list;

        this.$wrapper = document.createElement('div');
        this.$wrapper.setAttribute('class','recette-card-container d-flex flex-wrap justify-content-evenly px-5')
        this.$wrapper.setAttribute('id','recettes-cards-container');
    }

    createGalery(){

        this.$wrapper.innerHTML = '';

        this._list.forEach(recipe=>{
            const card = new CardModel(recipe);
            const cardElement = new CardElement(card)
            this.$wrapper.appendChild(cardElement.createCard())
        })
        return this.$wrapper;
    }
}