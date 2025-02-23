import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  @Output() edit = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService, private dialog: MatDialog) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => {
      console.log('Обновленные рецепты:', data);
      this.recipes = data;
    });
  }

  deleteRecipe(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Вы уверены, что хотите удалить этот рецепт?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.recipeService.deleteRecipe(id);
      }
    });
  }

  editRecipe(recipe: Recipe) {
    this.edit.emit(recipe);
  }
}
