import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from './../recipe.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes:  Observable<any>;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipeList().valueChanges();
  }


}
