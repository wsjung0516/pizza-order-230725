import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderListComponent } from './pizza-order-list.component';

describe('PizzaOrderListComponent', () => {
  let component: PizzaOrderListComponent;
  let fixture: ComponentFixture<PizzaOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PizzaOrderListComponent]
    });
    fixture = TestBed.createComponent(PizzaOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
