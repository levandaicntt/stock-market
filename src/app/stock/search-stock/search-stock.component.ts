import { Component, OnInit, Input } from '@angular/core';
import { StockListComponent } from '../stock-list/stock-list.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-search-stock',
  imports: [StockListComponent, ReactiveFormsModule],
  templateUrl: './search-stock.component.html',
  styleUrl: './search-stock.component.css'
})
export class SearchStockComponent {
  searchCode!: string;
  public searchForm!: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createSearchForm();
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  searchStock(): string {
    this.searchCode = this.searchForm.value.search;
    return this.searchCode; 
  }

  resetForm(): void {
    this.searchForm.reset();
  }
}
