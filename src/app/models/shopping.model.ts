import { Ingredient } from './ingredient.model';


export class Shopping {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Array<Ingredient>;


    constructor(name: string, description: string , imagePath: string ) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }

}
