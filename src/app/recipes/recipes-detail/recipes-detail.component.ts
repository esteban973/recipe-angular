import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from './../recipe.service';
import { ShoppingListService } from '../../shopping-list/shoppping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;

  id: number;

  recipeTmp: Recipe;

  constructor(private recipeService: RecipeService, private routeActivated: ActivatedRoute) {

  }

  ngOnInit() {

    this.routeActivated.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }

  /*toggleEditMode() {
    if (this.editMode) {
      this.recipe.name = this.recipeTmp.name;
      this.recipe.description = this.recipeTmp.description;
    } else {
      this.recipeTmp = new Recipe(this.recipe.name, this.recipe.description, this.recipe.imagePath);
    }
    this.editMode = !this.editMode;
  }*/


  addToShoppingList() {
    this.recipeService.addToTheShoopingList(this.recipe);
  }



}
