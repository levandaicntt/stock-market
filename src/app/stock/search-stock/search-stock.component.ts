import { Component } from '@angular/core';
import { StockListComponent } from '../stock-list/stock-list.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-stock',
  standalone: true,
  imports: [StockListComponent, ReactiveFormsModule],
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent {
  public searchCode: string = '';
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  searchStock(): void {
    this.searchCode = this.searchForm.value.search.trim();
  }

  resetForm(): void {
    this.searchForm.reset();
    this.searchCode = '';
  }
}
