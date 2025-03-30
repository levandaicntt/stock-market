import { Component, Input, Inject, Optional   } from '@angular/core';
import { Stock } from '../../model/stock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-stock-information',
  imports: [],
  templateUrl: './stock-information.component.html',
  styleUrl: './stock-information.component.css'
})
export class StockInformationComponent {
  // @Input() stock!: Stock;
  constructor(
    @Optional() public dialogRef: MatDialogRef<StockInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock
  ){}

  close(): void {
    this.dialogRef.close();
  }
}
