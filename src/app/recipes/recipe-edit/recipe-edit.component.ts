import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FlashService } from '../../flash.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {


  idRecipe: string;

  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private flashService: FlashService
            ) {
  }

  ngOnInit() {
      this.recipeForm = new FormGroup({
        recipeName : new FormControl(null, [Validators.required]),
        recipeDescription : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        recipeUrl : new FormControl(null, [Validators.required], this.photoExists),
        ingredients :  new FormArray([])
      });


      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.idRecipe = params['id'];
          this.recipeForm.reset();
          if ( this.idRecipe  === undefined) {
            this.recipeForm.patchValue({
              recipeName : 'recipe.Name',
              recipeDescription : 'recipe.description',
              recipeUrl : 'https://picsum.photos/800/300',
              ingredients : []
            });
          } else {
            const recipeSub = this.recipeService.getRecipe(this.idRecipe).valueChanges().subscribe((recipe: Recipe) => {
              this.recipeForm.patchValue({
                recipeName : recipe.name,
                recipeDescription : recipe.description,
                recipeUrl : recipe.imagePath
              });
              for (const ingredient of recipe.ingredients) {
                this.addNewIngredient(ingredient.ingredient.name, ingredient.qty);
            }
            });

          }
        }
      );
  }


  addNewIngredient(name: string, qty: number){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup(
        {ingredientName :  new FormControl(name, [Validators.required]),
        ingredientQty :  new FormControl(qty, [Validators.required])
        }
      ));
  }

  supprimerIngredient(indexId: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(indexId);
  }


  clearForm() {
    this.recipeForm.reset();
  }


  photoExists(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const imageData = new Image();
      imageData.onload = () => {
        resolve(null);
      };
      imageData.onerror = () => {
        return  resolve({imageUrl: true});
      };
      imageData.src = formControl.value;
    });

    return promise;
  }


  saveRecipe() {
    const recipeResult = this.recipeForm.value;
    const newRecipe = new Recipe(recipeResult.recipeName, recipeResult.recipeDescription, recipeResult.recipeUrl);
    for (const ingredientForm of recipeResult.ingredients) {
      newRecipe.addIngredients(ingredientForm.ingredientName, ingredientForm.ingredientQty);
    }
    if (this.idRecipe === undefined) {
      this.recipeService.createRecipe(newRecipe);
    } else {
      //this.recipeService.updateRecipe(this.idRecipe, newRecipe);
    }
    this.router.navigate(['/recipes', this.idRecipe]);
  }


  supprimerRecette() {
    //this.recipeService.deleteRecipe(this.idRecipe);
    this.flashService.flashBag.next('La recette a bien supprimée');
    this.router.navigate(['/recipes']);
  }



}
