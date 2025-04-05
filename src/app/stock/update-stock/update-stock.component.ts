import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {
  public updateForm!: FormGroup;
  public exchanges: string[] = ['NYSE', 'NASDAQ', 'OKX', 'OTHER'];
  public loading = false;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    public dialogRef: MatDialogRef<UpdateStockComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.fb.group({
      name: [this.stock.name, [Validators.required]],
      code: [this.stock.code, [Validators.required, Validators.minLength(2)]],
      price: [this.stock.price, [Validators.required, Validators.min(0)]],
      previousPrice: [this.stock.previousPrice, [Validators.required, Validators.min(0)]],
      exchange: [this.stock.exchange, [Validators.required]],
      favorite: [this.stock.favorite]
    });
  }

  onUpdateStock(): void {
    if (this.updateForm.invalid || !this.stock.id) return;

    this.loading = true;
    this.errorMessage = null;

    const updatedStock: Stock = {
      ...this.stock,
      ...this.updateForm.value
    };

    this.stockService.updateStock(updatedStock).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update stock';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  DisableUpdate(): boolean {
    return this.updateForm.invalid || this.loading;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}