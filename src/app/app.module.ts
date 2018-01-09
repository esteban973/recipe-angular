import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DropdownDirective } from './dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { FlashService } from './flash.service';
import { ShoppingListService } from './shopping-list/shoppping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesItemComponent,
    RecipesDetailComponent,
    ShoppingListComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [RecipeService, ShoppingListService, FlashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
