import { Component } from '@angular/core';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // Standalone-компонент
  imports: [RecipeListComponent], // Подключаем `RecipeListComponent`
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cookbook';
}
