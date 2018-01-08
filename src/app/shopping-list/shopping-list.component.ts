import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shoppping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  @ViewChild('newShoppingForm') newShoppingForm: NgForm;

  shoppingList = new Array<any>();

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingList = this.shoppingListService.shoppingList;
  }

  ngOnInit() {
  }

  addShoppingList(ingredientName: string, qty: number) {
      this.shoppingListService.addShoppingList(ingredientName, qty);
  }


  substractShoppingList(ingredientName: string, qty: number) {
    this.shoppingListService.substractShoppingList(ingredientName, qty);
 }



 
 addNewIngredient(){
    this.shoppingListService.addShoppingList(this.newShoppingForm.value.ingredientName, this.newShoppingForm.value.ingredientQty);
    this.newShoppingForm.reset();
 }

 removeShoppingList(ingredientName: string) {
  this.shoppingListService.removeShoppingList(ingredientName);
 }



}
