import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule  } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

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
    ingredients: [{name: '', amount: null, unit: ''}],
    description: ''
  };

  units = ['г', 'мл', 'шт.', 'ч.л.', 'ст.л'];

  addIngredient(){
    this.recipe.ingredients.push({name: '', amount: null, unit: ''});
  }

  removeIngredient(index:number) {
    this.recipe.ingredients.splice(index, 1);
  }

  saveRecipe() {
    console.log('Рецепт сохранен: ', this.recipe);
  }
}
