import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
  imports: [CommonModule]
})
export class StockDetailsComponent implements OnInit {
  public stock?: Stock;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam; // chuyển sang kiểu số
      // Nếu có API riêng cho chi tiết, bạn có thể tạo phương thức getStockById
      this.stockService.getStocks().subscribe((stocks) => {
        this.stock = stocks.find(s => s.id === id);
      });
    }
  }
}
