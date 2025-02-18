import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  recipe = {
    title: '',
    ingredients: [{ name: '', amount: 0, unit: '' }],
    description: ''
  };

  units = ['г', 'мл', 'шт', 'ч.л.', 'ст.л.'];

  constructor(private recipeService: RecipeService) {}

  addIngredient() {
    this.recipe.ingredients.push({ name: '', amount: 0, unit: '' });
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  saveRecipe() {
    const newRecipe = {
      ...this.recipe,
      id: Date.now().toString(),
      createdAt: new Date(),
      ingredients: this.recipe.ingredients.map(ing => ({
        ...ing,
        amount: ing.amount ?? 0
      }))
    };

    this.recipeService.addRecipe(newRecipe);

    this.recipe = { title: '', ingredients: [{ name: '', amount: 0, unit: '' }], description: '' };
  }
}
