import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StockListComponent } from "./stock/stock-list/stock-list.component";
import { UpdateStockComponent } from './stock/update-stock/update-stock.component';
import { SearchStockComponent } from './stock/search-stock/search-stock.component';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateStockReactiveComponent,
    SearchStockComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Stock Market App';
  constructor() {
  }

}
