import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { FormsModule, NgForm, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import e from 'express';

let counter = 1;

@Component({
selector: 'app-create-stock-reactive',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.component.html',
  styleUrl: './create-stock-reactive.component.css',
  standalone: true
})

export class CreateStockReactiveComponent {
  //reactive form builder
  public stockForm!: FormGroup;
  public exchanges!: string[];
  private stock!: Stock;
  constructor(private fb: FormBuilder,
              private stockService: StockService
  ) {
    this.exchanges = this.stockService.exchange;
    this.createStockForm();
  }

  createStockForm() {
    this.stockForm = this.fb.group({
      stockName: [null, [Validators.required]],
      stockCode: [null, [Validators.required, Validators.minLength(2)]],
      stockPrice: [null, [Validators.required, Validators.min(0)]],
      stockExchange: ['OTHER', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      let newStock = new Stock(
        this.stockForm.value.stockName,
        this.stockForm.value.stockCode,
        this.stockForm.value.stockPrice,
        0,
        this.stockForm.value.stockExchange
      )
      this.stockService.createStock(newStock)
      .subscribe((result:any) => {
          console.log(result.msg);
          this.stock = new Stock('', '', 0, 0, 'OTHER');
        }, (err) =>{
          console.log(err);
        });
    } else {
      console.error('Please correct the validation errors.');
    }
    // alert('Create complete');
    // let formValue = new Stock(this.stockForm.value.stockName, this.stockForm.value.stockCode, this.stockForm.value.stockPrice, this.stockForm.value.previousPrice, this.stockForm.value.stockExchange);
    // formValue.previousPrice = 0;
    // this.stockService.createStock(formValue);
    // this.resetForm();
  }

  DisableSubmit() {
    return this.stockForm.invalid;
  }

  resetForm(){
    this.stockForm.reset();
  }
}
