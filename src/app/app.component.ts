import { Component } from '@angular/core';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { Recipe } from './models/recipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cookbook';
  selectedRecipe: Recipe | null = null;

  editRecipe(recipe: Recipe) {
    this.selectedRecipe = { ...recipe };
  }
}
