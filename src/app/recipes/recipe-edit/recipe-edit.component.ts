import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeTmp: Recipe;
  idRecipe: number;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.idRecipe = params['id'];
          if ( this.idRecipe  === undefined) {
            this.recipeTmp = new Recipe('', '', 'http://');

          } else {
            this.recipe = this.recipeService.getRecipe(this.idRecipe);
            this.recipeTmp = new Recipe('', '', 'http://');
            this.recipeTmp = Object.assign(this.recipeTmp, this.recipe);
          }
        }
      );

  }


  saveRecipe() {
    this.router.navigate(['/recipes', this.idRecipe]);
  }



}
