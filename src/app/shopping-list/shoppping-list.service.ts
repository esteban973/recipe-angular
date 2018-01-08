import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {

    shoppingList = new Array<{'ingredient' : Ingredient, 'qty' : number}>();

    constructor() {
        const ingredients = [new Ingredient('Beurre'), new Ingredient('Farine')];
        for (const ingredient of ingredients) {
          this.shoppingList.push({'ingredient': ingredient, 'qty' : 0});
        }
      }

      addShoppingList(ingredientName: string, qty: number) {
        console.log(ingredientName);
         for (const shoppingItem of this.shoppingList) {
            if (shoppingItem.ingredient.name.toUpperCase() === ingredientName.toUpperCase()) {
              shoppingItem.qty = Number(qty) + Number(shoppingItem.qty);
              return;
            }
         }
         const ingredient = new Ingredient(ingredientName);
         this.shoppingList.push({'ingredient': ingredient, 'qty' : qty});
      }


      substractShoppingList(ingredientName: string, qty: number) {
        for (const i in this.shoppingList) {
           if (this.shoppingList[i].ingredient.name === ingredientName) {
              this.shoppingList[i].qty -= qty;
             if ( this.shoppingList[i].qty < 0 ) {
                this.shoppingList.splice(Number(i), 1);
             }
             return;
           }
        }
     }


      removeShoppingList(ingredientName: string) {
        for (const i in this.shoppingList) {
           if (this.shoppingList[i].ingredient.name === ingredientName) {
            this.shoppingList.splice(Number(i), 1);
            return;
           }
        }
     }

}
