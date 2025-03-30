import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-stock',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
})
export class CreateStockComponent {
  public stock: Stock = new Stock('', '', 0, 0, 'OKX');
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OKX', 'OTHER'];
  public stocks: Stock[] = [];

  createStock(stockForm: NgForm): void {
    console.log('Stock Form', stockForm);
    if (stockForm.valid) {
      this.stocks.push(this.stock);
      this.stock = new Stock('', '', 0, 0, 'OKX');
      this.confirmed = false;
      stockForm.resetForm();
    }
  }
}
