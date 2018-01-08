import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shoppping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {



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


 removeShoppingList(ingredientName: string) {
  this.shoppingListService.removeShoppingList(ingredientName);
 }



}
