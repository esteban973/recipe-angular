import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

    shoppingList = new Array<{'ingredient': Ingredient, 'qty': number}>();

    shoppingListUpdated = new Subject<Array<{'ingredient': Ingredient, 'qty': number}>>();

  

    constructor() {
        const ingredients = [new Ingredient('Beurre'), new Ingredient('Farine')];
        for (const ingredient of ingredients) {
          this.shoppingList.push({'ingredient': ingredient, 'qty' : 0});
        }
      }

      addShoppingList(ingredientName: string, qty: number) {
         for (const shoppingItem of this.shoppingList) {
            if (shoppingItem.ingredient.name.toUpperCase() === ingredientName.toUpperCase()) {
              shoppingItem.qty = Number(qty) + Number(shoppingItem.qty);
              this.shoppingListUpdated.next(this.shoppingList.slice());
              return;
            }
         }
         const ingredient = new Ingredient(ingredientName);
         this.shoppingList.push({'ingredient': ingredient, 'qty' : qty});
         this.shoppingListUpdated.next(this.shoppingList.slice());
      }


     



      /**
       * Remove form
       * @param id
       */
     removeShoppingListById(id: number) {
       this.shoppingList.splice(Number(id), 1);
       this.shoppingListUpdated.next(this.shoppingList.slice());
    }


    changeQtyShoppingList(ingredientId: number, qty: number) {
       this.shoppingList[ingredientId].qty += qty;
           if ( this.shoppingList[ingredientId].qty < 0 ) {
              this.shoppingList.splice(ingredientId, 1);
           }
        this.shoppingListUpdated.next(this.shoppingList.slice());
   }




}
