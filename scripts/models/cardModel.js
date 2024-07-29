export class CardModel {
    constructor(card){
        this._id = card.id;
        this._image = `./assets/${card.image}`;
        this._name = card.name;
        this._servings = card.servings;
        this._ingredients = card.ingredients;
        this._time = card.time;
        this._description = card.description;
        this._appliance = card.appliance;
        this._ustensils = card.ustensils;
    }

    get id(){
        return this._id;
    }

    get image(){
        return this._image;
    }
    get name(){
        return this._name;
    }
    get servings(){
        return this._servings;
    }
    get ingredients(){
        return this._ingredients;
    }
    get time(){
        return this._time;
    }
    get description(){
        return this._description;
    }
    get appliance(){
        return this._appliance;
    }
    get ustensils(){
        return this._ustensils;
    }
}