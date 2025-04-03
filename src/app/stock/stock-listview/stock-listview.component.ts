import { Component, Input } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import { StockInformationComponent } from '../stock-information/stock-information.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-listview',
  imports: [CommonModule],
  templateUrl: './stock-listview.component.html',
  styleUrls: ['./stock-listview.component.css'],
})
export class StockListviewComponent {
  @Input() stock!: Stock;

  constructor(
    private stockService: StockService,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  toggleFavorite() {
    this.stockService.toggleFavorite(this.stock).subscribe({
      next: (res) => {
        this.stock.favorite = !this.stock.favorite;
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      }
    });
  }

  deleteStock() {
    if (this.stock.id) {
      this.stockService.deleteStock(this.stock.id).subscribe({
        next: () => alert('Xóa thành công'),
        error: (err) => alert('Lỗi khi xóa')
      });
    }
  }

  updateStock() {
    this.dialog.open(UpdateStockComponent, {
      data: this.stock,
      width: 'auto',
      height: 'auto',
      panelClass: 'white-dialog',
      autoFocus: false,
      disableClose: true,
    });
  }

  showInformation() {
    this.dialog.open(StockInformationComponent, {
      data: this.stock,
      width: '500px',
      height: '500px',
      panelClass: 'white-dialog',
      autoFocus: false,
      disableClose: true,
    });
  }
}
