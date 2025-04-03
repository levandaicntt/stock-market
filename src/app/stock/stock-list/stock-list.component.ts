import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { Observable } from 'rxjs';
import { StockListviewComponent } from '../stock-listview/stock-listview.component';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports: [StockListviewComponent, AsyncPipe, CommonModule]
})
export class StockListComponent implements OnInit, OnChanges {
  public stocks$!: Observable<Stock[]>;
  @Input() stockCode: string = '';
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStocks();
    this.stockService.refreshStocks$.subscribe(() => this.loadStocks());
  }

  loadStocks(): void {
    this.stocks$ = this.stockService.getStocks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockCode']) {
      this.loadStocks();
    }
  }
}