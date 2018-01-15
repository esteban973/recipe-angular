import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from './../recipe.service';
import { ShoppingListService } from '../../shopping-list/shoppping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlashService} from '../../flash.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;

  id: number;

  recipeTmp: Recipe;

  constructor(private recipeService: RecipeService, private routeActivated: ActivatedRoute, private flashService: FlashService, private router: Router) {

  }

  ngOnInit() {

    this.routeActivated.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }

 


  addToShoppingList() {
    this.recipeService.addToTheShoopingList(this.recipe);
    this.flashService.flashBag.next('Les ingérdients ont été rajoutés');
    this.router.navigate(['/shopping']);
  }



}
