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

  editItemIndex(id) {
    this.editMode = true;
    this.editItemIndex = id;
    
  }


  addShoppingList(ingredientName: string, qty: number) {
      this.shoppingListService.addShoppingList(ingredientName, qty);
  }


  changeQtyShoppingList(id: number, qty: number) {
      this.shoppingListService.changeQtyShoppingList(id, qty);
  }


 addNewIngredient() {
    this.shoppingListService.addShoppingList(this.newShoppingForm.value.ingredientName, this.newShoppingForm.value.ingredientQty);
    this.newShoppingForm.reset();
 }


 removeShoppingList(indexIngredient: number) {
    this.shoppingListService.removeShoppingListById(indexIngredient);
 }


}
