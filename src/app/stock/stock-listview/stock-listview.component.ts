import { Component, Input} from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import { StockInformationComponent } from '../stock-information/stock-information.component';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-stock-listview',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './stock-listview.component.html',
  styleUrl: './stock-listview.component.css',
})
export class StockListviewComponent {
@Input() stock: Stock = { 
    name: '', 
    code: '', 
    exchange: '', 
    price: 0, 
    previousPrice: 0,
    favorite: false, 
    isPositiveChange: () => false // Ensure this is a function
  };
  // public update: boolean = false;
  // public info: boolean = false;
  constructor(private stockService: StockService,
              private dialog: MatDialog
  ) {
    
  }

  ngOnInit() {}

  toggleFavorite() {
    this.stock.favorite = !this.stock.favorite;
    alert('You have set ' + this.stock.name + ' as a favorite');
  }

  toggleUnFavorite() {
    this.stock.favorite = !this.stock.favorite;
    alert('You have unset ' + this.stock.name + ' as a favorite');
  }

  deleteStock() {
    this.stockService.deleteStock(this.stock.code);
    alert('You have deleted ' + this.stock.name);
  }

  updateStock(){
    console.log(this.stock);
    // this.update = !this.update;
    this.dialog.open(UpdateStockComponent, {
      data: this.stock, // truyền dữ liệu stock vào dialog
      width: 'auto',
      height: 'auto',
      panelClass: 'white-dialog',
      autoFocus: false,
      disableClose: true,
    });
  }

  // onStockUpdate() {
  //   this.updateStock();
  //   // console.log(stockUpdate);
  //   // console.log(this.stock);
  // }

  showInformation(){
    this.dialog.open(StockInformationComponent, {
      data: this.stock, // truyền dữ liệu stock vào dialog
      width: '500px',
      height: '500px',
      panelClass: 'white-dialog',
      autoFocus: false,
      disableClose: true,
    });
    // this.info = !this.info;
  }
}
