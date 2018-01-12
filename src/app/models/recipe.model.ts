import { Ingredient } from './ingredient.model';



export class Recipe {

    public $key: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Array<any>;


    constructor(name: string, description: string , imagePath: string) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = new Array<any>();
    }

    addIngredients(name: string, qty: number) {
        this.ingredients.push({'ingredient': new Ingredient(name), 'qty': qty});
    }

}
