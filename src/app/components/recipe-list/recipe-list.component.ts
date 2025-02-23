import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  @Output() edit = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => {
      console.log('Обновленные рецепты:', data);
      this.recipes = data;
    });
  }

  deleteRecipe(id: string) {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этот рецепт?');
    if (confirmed) {
      this.recipeService.deleteRecipe(id);
    }
  }

  editRecipe(recipe: Recipe) {
    this.edit.emit(recipe);
  }
}
