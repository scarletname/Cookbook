import { Component } from '@angular/core';

interface Recipe {
  id: string;
  title: string;
  ingredients: { name: string; amount: number; unit: string }[];
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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
