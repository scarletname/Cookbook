import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnChanges {
  @Input() recipe: Recipe | null = null;

  units = ['г', 'мл', 'шт', 'ч.л.', 'ст.л.'];

  constructor(private recipeService: RecipeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipe'] && !this.recipe) {
      this.recipe = this.getEmptyRecipe();
    }
  }

  onFileSelected(event: Event) {
    if (!this.recipe) return;

    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.recipe) {
          this.recipe.imageUrl = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  getEmptyRecipe(): Recipe {
    return {
      id: '',
      title: '',
      ingredients: [{ name: '', amount: 0, unit: '' }],
      description: '',
      createdAt: new Date(),
      imageUrl: ''
    };
  }

  addIngredient() {
    if (this.recipe) {
      this.recipe.ingredients.push({ name: '', amount: 0, unit: '' });
    }
  }

  removeIngredient(index: number) {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этот ингредиент?');
    if (confirmed && this.recipe) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  saveRecipe() {
    if (!this.recipe) return;

    if (this.recipe.id) {
      this.recipeService.updateRecipe(this.recipe);
    } else {
      this.recipe.id = Date.now().toString();
      this.recipe.createdAt = new Date();
      this.recipeService.addRecipe(this.recipe);
    }

    this.recipe = this.getEmptyRecipe();
  }
}
