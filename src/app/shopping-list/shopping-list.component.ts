import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shoppping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  @ViewChild('newShoppingForm') newShoppingForm: NgForm;

  shoppingList = new Array<{'ingredient': Ingredient, 'qty': number}>();

  subscription: Subscription;

  editMode = false;

  editItemId: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.shoppingList = this.shoppingListService.shoppingList;
    this.subscription = this.shoppingListService.shoppingListUpdated.subscribe(
      (ingredientList: Array<{'ingredient': Ingredient, 'qty': number}>) => {
        this.shoppingList = ingredientList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editShoppingListItem(id: number) {
    this.editMode = true;
    this.newShoppingForm.reset();
    this.editItemId = id;
    let shoppingItem = this.shoppingListService.getShoppingItemById(id);
    this.newShoppingForm.setValue({
      ingredientName : shoppingItem.ingredient.name,
      ingredientQty : shoppingItem.qty
    });
  }


  addShoppingList(ingredientName: string, qty: number) {
      this.shoppingListService.addShoppingList(ingredientName, qty);
  }


  changeQtyShoppingList(id: number, qty: number) {
      this.shoppingListService.changeQtyShoppingList(id, qty);
  }


 addNewIngredient() {
   if(this.editMode){
    this.shoppingListService.updateShoppingList(this.editItemId, {ingredient : new Ingredient(this.newShoppingForm.value.ingredientName), qty : this.newShoppingForm.value.ingredientQty }  );
   } else {
    this.shoppingListService.addShoppingList(this.newShoppingForm.value.ingredientName, this.newShoppingForm.value.ingredientQty);
   }
    
    this.editMode=false;
    this.newShoppingForm.reset();
 }


 removeShoppingList(indexIngredient: number) {
    this.shoppingListService.removeShoppingListById(indexIngredient);
    this.editMode=false;
    this.newShoppingForm.reset();
 }


}
