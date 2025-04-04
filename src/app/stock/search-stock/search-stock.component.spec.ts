import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStockComponent } from './search-stock.component';

describe('SearchStockComponent', () => {
  let component: SearchStockComponent;
  let fixture: ComponentFixture<SearchStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
