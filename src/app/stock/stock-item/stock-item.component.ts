import { Component, Input, Output, EventEmitter, output, Optional } from '@angular/core';
import { Stock } from '../../model/stock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import { StockInformationComponent } from '../stock-information/stock-information.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class StockItemComponent {
  @Input() stock: Stock = {
    name: '',
    code: '',
    exchange: '',
    price: 0,
    previousPrice: 0,
    favorite: false,
    // isPositiveChange: () => false // Ensure this is a function
  };
  public update: boolean = false;
  public info: boolean = false;
  constructor(private stockService: StockService,
    private dialog: MatDialog, // Optional dialog injection
  ) {

  }

  ngOnInit() { }

  toggleFavorite() {
    this.stock.favorite = !this.stock.favorite;
    alert('You have set ' + this.stock.name + ' as a favorite');
  }

  toggleUnFavorite() {
    this.stock.favorite = !this.stock.favorite;
    alert('You have unset ' + this.stock.name + ' as a favorite');
  }

  deleteStock() {
    // this.stockService.deleteStock(this.stock);
    alert('You have deleted ' + this.stock.name);
  }

  updateStock() {
    this.dialog.open(UpdateStockComponent, {
      data: this.stock, // truyền dữ liệu stock vào dialog
      width: 'auto',
      height: 'auto',
      panelClass: 'white-dialog',
      autoFocus: false,
      disableClose: true,
    });
    // this.update = !this.update;
  }

  // onStockUpdate() {
  //   this.updateStock();
  //   // console.log(stockUpdate);
  //   // console.log(this.stock);
  // }

  showInformation() {
    this.dialog.open(StockInformationComponent, {
      data: this.stock, // truyền dữ liệu stock vào dialog
      width: 'auto',
      height: 'auto',
    },
    )
    // this.info = !this.info;
  }
}