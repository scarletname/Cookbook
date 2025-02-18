import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes = [
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
}
