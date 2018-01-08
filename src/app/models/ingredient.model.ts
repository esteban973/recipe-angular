
export class Ingredient {
    public name: string;

    constructor(name: string ) {
        this.name = name.toLowerCase();
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

}
