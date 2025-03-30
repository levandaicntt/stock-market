import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListviewComponent } from './stock-listview.component';

describe('StockListviewComponent', () => {
  let component: StockListviewComponent;
  let fixture: ComponentFixture<StockListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockListviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
