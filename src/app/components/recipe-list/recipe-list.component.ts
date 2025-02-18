import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }
}
