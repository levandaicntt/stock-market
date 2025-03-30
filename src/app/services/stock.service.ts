import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService implements OnInit {
  public stocks: Stock[] = [];
  public exchange: string[] = ['NYSE', 'NASDAQ', 'OKX', 'OTHER'];
  ngOnInit(): void {
    
    
  }
  
  constructor(){
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'OKX'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NASDAQ'),
      new Stock('Third Stock Company', 'TSC', 85, 80, 'NYSE'),
    ];
  }

  getStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }

  createStock(stock: Stock): Observable<any> {
    let foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock) {
      return throwError(() => new Error('Stock with code ' + stock.code + ' already exists'));
    }
    this.stocks.push(stock);
    return of({ msg: 'Stock with code' + stock.code + ' created successfully' });
  }

  toggleFavorite(stock: Stock){
    let foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock) {
      foundStock.favorite = !foundStock.favorite;
    }
  }

  findIndexStock(code: string): number | undefined {
    return this.stocks.findIndex(stock => stock.code === code);
  }

  findStock(code: string): Stock | undefined {
    let index = this.findIndexStock(code);
    if (index !== undefined && index >= 0) {
      return this.stocks[index];
    }
    return undefined;
  }

  deleteStock(code: string): boolean {
    let index = this.findIndexStock(code);
    if (index !== undefined && index >= 0) {
      this.stocks.splice(index, 1);
      return true;
    }
    return false;
  }

  updateStock(stock: Stock): boolean {
    let index = this.findIndexStock(stock.code);
    if (index !== undefined && index >= 0) {
      this.stocks[index] = stock;
      return true;
    }
    return false;
  }
}
