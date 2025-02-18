import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Блины',
      ingredients: [],
      description: '---',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Панкейки',
      ingredients: [],
      description: '---',
      createdAt: new Date()
    }
  ];
  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);
  recipes$=this.recipesSubject.asObservable();

  getRecipes() {
    return this.recipes$;
  }

  addRecipe(recipe: Recipe) {
    recipe.id = (this.recipes.length + 1).toString();
    recipe.createdAt = new Date();
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes);
  }
}
