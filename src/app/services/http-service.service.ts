import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  // Lấy danh sách stocks từ API


  public getStockList(): Observable<any> {
    let url = `${this.REST_API_SERVER}/stocks`;
    return this.httpClient.get<any>(url, this.httpOption);
  }


  public getStocks(code?: string): Observable<any> {
    let url = `${this.REST_API_SERVER}/stocks`;

    return this.httpClient.get<any>(url, this.httpOption);
  }

  // Gửi một stock mới lên API qua POST
  public postStocks(body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    console.log('postStock URL:', url);
    console.log('postStock body:', body);
    return this.httpClient.post<any>(url, body, this.httpOption);
  }

  // Cập nhật một stock qua API (PUT)
  public updateStock(id: number | string, body: any): Observable<any> {
    // Nếu json server định danh theo id hoặc code (ở đây mình cho phép id kiểu number hoặc string)
    const url = `${this.REST_API_SERVER}/stocks/${id}`;
    console.log('updateStock URL:', url);
    console.log('updateStock body:', body);
    return this.httpClient.put<any>(url, body, this.httpOption);
  }

  // Xóa một stock qua API (DELETE)
  public deleteStock(id: number | string): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${id}`;
    console.log('deleteStock URL:', url);
    return this.httpClient.delete<any>(url, this.httpOption);
  }
}
