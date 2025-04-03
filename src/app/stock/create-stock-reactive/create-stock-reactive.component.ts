import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-stock-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.component.html',
  styleUrls: ['./create-stock-reactive.component.css']
})
export class CreateStockReactiveComponent {
  public stockForm: FormGroup;
  public exchanges: string[] = ['NASDAQ', 'NYSE', 'OKX', 'NSE'];

  constructor(private fb: FormBuilder, private httpService: HttpServiceService) {
    this.stockForm = this.fb.group({
      stockName: ['', Validators.required],
      stockCode: ['', Validators.required],
      stockPrice: [0, [Validators.required, Validators.min(0)]],
      stockPreviousPrice: [0, [Validators.required, Validators.min(0)]],
      stockExchange: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.httpService.postStocks(this.stockForm.value).subscribe({
        next: (res) => {
          alert('Cổ phiếu được tạo thành công');
          // Sau khi tạo thành công, bạn có thể phát ra sự kiện để component cha load lại danh sách stocks
          this.stockForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Có lỗi khi tạo cổ phiếu');
        }
      });
    }
  }

  DisableSubmit(): boolean {
    return this.stockForm.invalid;
  }
}
