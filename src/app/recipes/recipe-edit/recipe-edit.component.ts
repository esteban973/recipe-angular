import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {


  idRecipe: number;

  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
      this.recipeForm = new FormGroup({
        recipeName : new FormControl(null, [Validators.required]),
        recipeDescription : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        recipeUrl : new FormControl(null, [Validators.required]),
        ingredients :  new FormArray([new FormGroup({ingredientName :  new FormControl(null, [Validators.required]), ingredientQty :  new FormControl(null, [Validators.required]) })])
      });


      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.idRecipe = params['id'];
          this.recipeForm.reset();
          if ( this.idRecipe  === undefined) {
            this.recipeForm.patchValue({
              recipeName : "recipe.Name",
              recipeDescription : "recipe.description",
              recipeUrl : 'https://picsum.photos/800/300',
              ingredients : []
            });
          } else {
            const recipe = this.recipeService.getRecipe(this.idRecipe);
            this.recipeForm.patchValue({
              recipeName : recipe.name,
              recipeDescription : recipe.description,
              recipeUrl : recipe.imagePath,
              ingredients : [{ingredientName : 'test', ingredientQty: 5}]
            });
          }
          console.log(this.recipeForm);
        }
      );
  }


  saveRecipe() {
    if(this.idRecipe === undefined){
      this.idRecipe=this.recipeService.addRecipe(this.recipeForm.value);
    } else {
      this.recipeService.updateRecipe(this.idRecipe, this.recipeForm.value);
    }
    this.router.navigate(['/recipes', this.idRecipe]);
  }



}
