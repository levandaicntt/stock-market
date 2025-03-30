import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../model/stock';
import { StockItemComponent } from "../stock-item/stock-item.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { StockListviewComponent } from '../stock-listview/stock-listview.component';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports: [CommonModule, StockItemComponent,StockListviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockListComponent implements OnInit, OnChanges {
  @Input() stockCode!: string;
  public stocks: Observable < Stock[] > | undefined;
  public viewmode: string = "Item";
  
  constructor(private stocksService: StockService) {}

  ngOnInit(): void {
    // this.stocks = [
    //   new Stock('Test Stock Company', 'TSC', 85, 80, 'OKX'),
    //   new Stock('Second Stock Company', 'SSC', 10, 20, 'NASDAQ'),
    //   new Stock('Third Stock Company', 'TSC', 85, 80, 'NSE'),
    // ];
    this.stocks = this.stocksService.getStocks();
  }

  ngOnChanges(): void {
    console.log(this.stockCode);
    this.findStocks(this.stockCode);
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock', stock, 'was triggered');
    // stock.favorite = !stock.favorite;
    this.stocksService.toggleFavorite(stock);
  }
  
  findStocks(code: string): void {
    if (code) {
      const stock = this.stocksService.findStock(code);
      this.stocks = stock ? of([stock]) : of([]);
    } else if (code === '' || code === null) {
      this.stocks = this.stocksService.getStocks();
    } else {
      alert('Không có mã cổ phiếu tên ' + code);
    }
  }

  onChangeView(event: Event){
    const mode = event.target as HTMLSelectElement;
    this.viewmode = mode.value;
  }
}