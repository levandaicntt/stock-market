import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Stock } from '../model/stock';
import { HttpServiceService } from './http-service.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private refreshStocks = new Subject<void>();

  constructor(private httpService: HttpServiceService) { }

  // stock.service.ts

  getStocks(code?: string): Observable<Stock[]> {
    console.log(this.httpService.getStocks(code))
    return this.httpService.getStocks(code)
  }

  createStock(stock: Stock): Observable<any> {
    return this.httpService.postStocks(stock).pipe(
      tap(() => this.refreshStocks.next())
    );
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    const updatedStock = { ...stock, favorite: !stock.favorite };
    return this.httpService.updateStock(updatedStock.id!, updatedStock).pipe(
      tap(() => this.refreshStocks.next())
    );
  }

  deleteStock(id: number): Observable<any> {
    return this.httpService.deleteStock(id).pipe(
      tap(() => this.refreshStocks.next())
    );
  }

  updateStock(stock: Stock): Observable<any> {
    return this.httpService.updateStock(stock.id!, stock).pipe(
      tap(() => this.refreshStocks.next())
    );
  }

  // searchStocks(code: string): Observable<Stock[]> {
  //   return this.httpService.get<Stock[]>(`${this.apiUrl}/stocks?code_like=${code}`);
  // }

  get refreshStocks$() {
    return this.refreshStocks.asObservable();
  }
}