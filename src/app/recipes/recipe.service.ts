
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from '../shopping-list/shoppping-list.service';
import { Ingredient } from '../models/ingredient.model';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeService  {

    //recipes = new Array<Recipe>();

    private basePath = '/recipes';

    recipes: AngularFireList<Recipe> = null; //  list of objects
    recipe: AngularFireObject<Recipe> = null; //   single object



    constructor(private shoppingListService: ShoppingListService, private httpClient: HttpClient, private db: AngularFireDatabase ) {
        /*for (let i = 0; i < 5; i++) {
            const recipe = new Recipe('Test' + i, 'test recipe ' + i, 'https://picsum.photos/800/30' + i + '?random');
            recipe.addIngredients('Beurre', this.getRandomIntInclusive(1, 250));
            recipe.addIngredients('Sucre', this.getRandomIntInclusive(1, 250));
            recipe.addIngredients('Oeuf', this.getRandomIntInclusive(1, 6));
            this.recipes.push(recipe);
        }*/
    }


    getRecipeList(): AngularFireList<Recipe> {
        this.recipes = this.db.list(this.basePath);
        return this.recipes;
    }


      // Return a single observable item
    getRecipe(key: string): AngularFireObject<Recipe> {
        const itemPath =  `${this.basePath}/${key}`;
        this.recipe = this.db.object(itemPath);
        return this.recipe;
    }

    // create item
    createRecipe(recipe: Recipe): void  {
        this.recipes.push(recipe);
    }

      // Update an existing item
    updateRecipe(key: string, value: any): void {
        this.recipes.update(key, value)
          .catch(error => this.handleError(error));
    }

      // Deletes a single item
      deleteRecipe(key: string): void {
          this.recipes.remove(key)
            .catch(error => this.handleError(error));
      }
      // Deletes the entire list of items
      deleteAll(): void {
          this.recipes.remove()
            .catch(error => this.handleError(error));
      }

      addToTheShoopingList(recipe: Recipe)  {
        for (const ingredient of recipe.ingredients) {
            this.shoppingListService.addShoppingList(ingredient.ingredient.name, ingredient.qty);
        }
    }

      // Default error handling for all actions
      private handleError(error) {
        console.log(error);
      }



   /* getFirstRecipeId() {
        return 0;
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }


    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        return this.recipes.length - 1;
    }

    updateRecipe(idRecipe: number, recipe: Recipe) {
        this.recipes[idRecipe] = recipe;
    }


    deleteRecipe(idRecipe: number) {
        this.recipes.splice(idRecipe, 1);
    }
    */

}
