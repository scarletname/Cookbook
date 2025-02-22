import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  constructor() {
    this.recipes = this.loadRecipes();
    this.recipesSubject.next(this.recipes);
  }

  private loadRecipes(): Recipe[] {
    const data = localStorage.getItem('recipes');
    return data ? JSON.parse(data) : [];
  }

  private saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
    this.recipesSubject.next(this.recipes);
  }

  getRecipes() {
    return this.recipes$;
  }

  addRecipe(recipe: Recipe) {
    recipe.id = Date.now().toString();
    recipe.createdAt = new Date();
    this.recipes.push(recipe);
    this.saveRecipes();
  }

  updateRecipe(updatedRecipe: Recipe) {
    const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
      this.saveRecipes();
    }
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveRecipes();
  }
}
