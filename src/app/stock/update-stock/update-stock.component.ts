import { Component, Input, OnInit, Inject, Optional } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {
  // @Input() stock!: Stock;
  // @Input() update!: boolean;


  public updateForm!: FormGroup;
  public exchanges!: string[];

  constructor(private fb: FormBuilder,
    private stockService: StockService,
    @Optional() public dialogRef: MatDialogRef<UpdateStockComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public stock: Stock
  ) {

    // this.exchanges = this.stockService.exchange;
  }

  ngOnInit(): void {
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.fb.group({
      stockName: [this.stock?.name || '', [Validators.required]],
      stockCode: [this.stock?.code || '', [Validators.required, Validators.minLength(2)]],
      stockPrice: [this.stock?.price || 0, [Validators.required, Validators.min(0)]],
      stockPreviousPrice: [this.stock?.previousPrice || 0, [Validators.required, Validators.min(0)]],
      stockExchange: [this.stock?.exchange || 'OTHER', [Validators.required]],
    });
  }

  onUpdateStock(): void {
    let oldStock = this.stock.name;
    let updatedStock = this.updateForm.value;
    // let newStock = new Stock(
    //   updatedStock.stockName,
    //   updatedStock.stockCode,
    //   updatedStock.stockPrice,
    //   updatedStock.stockPreviousPrice,
    //   updatedStock.stockExchange
    // );
    // console.log(newStock);
    // if (this.stockService.updateStock(newStock)) {
    //   alert('ok');
    //   this.dialogRef.close();
    // }
    // else {
    //   alert('error');
    // }
  }

  DisableUpdate(): boolean {
    return this.updateForm.invalid;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}