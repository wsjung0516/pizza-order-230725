import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingsComponent } from './toppings.component';

describe('ToppingsComponent', () => {
  let component: ToppingsComponent;
  let fixture: ComponentFixture<ToppingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToppingsComponent]
    });
    fixture = TestBed.createComponent(ToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
