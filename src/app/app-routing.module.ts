import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';



const appRoutes: Routes = [
     {path : 'recipes', component: RecipesComponent,  children : [
        {path : '', component: RecipeHomeComponent, pathMatch : 'full'},
        {path : 'add', component: RecipeEditComponent},
        {path : ':id', component: RecipesDetailComponent},
        {path : ':id/edit', component: RecipeEditComponent}
      ]},
      {path : 'shopping', component: ShoppingListComponent},
      {path : '', redirectTo : 'recipes', pathMatch : 'full'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
