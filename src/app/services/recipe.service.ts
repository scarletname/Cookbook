import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.loadRecipes());
  recipes$ = this.recipesSubject.asObservable();

  constructor() {}

  private loadRecipes(): Recipe[] {
    const data = localStorage.getItem('recipes');
    return data ? JSON.parse(data) : [];
  }

  private saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  getRecipes() {
    return this.recipes$;
  }

  addRecipe(recipe: Recipe) {
    recipe.id = Date.now().toString();
    recipe.createdAt = new Date();
    this.recipes.push(recipe);
    this.saveRecipes(); // Сохраняем в localStorage
    this.recipesSubject.next(this.recipes);
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveRecipes(); // Сохраняем после удаления
    this.recipesSubject.next(this.recipes);
  }
}
