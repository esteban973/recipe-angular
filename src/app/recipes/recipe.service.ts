import { Recipe } from '../models/recipe.model';
import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shoppping-list.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class RecipeService implements OnInit {

    recipes = new Array<Recipe>();


    constructor(private shoppingListService: ShoppingListService) {
        for (let i = 0; i < 5; i++) {
            const recipe = new Recipe('Test' + i, 'test recipe '+ i, 'https://picsum.photos/800/30' + i + '?random');
            recipe.addIngredients('Beurre', this.getRandomIntInclusive(1, 250));
            recipe.addIngredients('Sucre', this.getRandomIntInclusive(1, 250));
            recipe.addIngredients('Oeuf', this.getRandomIntInclusive(1, 6));
            this.recipes.push(recipe);
        }

    }

    ngOnInit() {
    }


    getFirstRecipeId() {
        return 0;
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }


    addRecipe(recipe: any) {
        let recipeTmp=new Recipe(recipe.recipeName, recipe.recipeDescription, recipe.recipeUrl);
        this.recipes.push(recipeTmp);
        console.log(this.recipes);
        return this.recipes.length - 1;
    }

    updateRecipe(idRecipe: number, recipe : any){

    }


    addToTheShoopingList(recipe: Recipe)  {
        for (const ingredient of recipe.ingredients) {
            this.shoppingListService.addShoppingList(ingredient.ingredient.name, ingredient.qty);
        }
    }


    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
      }


}
