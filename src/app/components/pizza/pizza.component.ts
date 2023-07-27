import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ToppingsService } from '../toppings/toppings.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PizzaService } from './pizza.service';
import { Pizza } from 'src/app/models';
export const DROP_ANIMATION = trigger("drop", [
  transition(":enter", [
    style({transform: "translateY(-200px)", opacity: 0}),
    animate(
      "300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      style({transform: "translateY(0)", opacity: 1})
    )
  ]),
  transition(":leave", [
    style({transform: "translateY(0)", opacity: 1}),
    animate(
      "200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      style({transform: "translateY(-200px)", opacity: 0})
    )
  ])
]);
@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center">
      <div class="pizza-display">
        <div class="pizza-display__base">
          <img src="assets/img/pizza.svg" />
          <img
            *ngFor="let topping of nToppings(); index as i"
            src="assets/img/toppings/multi/{{ topping.image }}.svg"
            [style.zIndex]="i"
            class="pizza-display__topping"
            @drop
          />
        </div>
        <div class="flex justify-center">
          {{ totalPrice() | currency : 'KRW' }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .pizza-display {
        /* background: #f5f5f5; */
        /* border-radius: 4px; */
        padding: 5px 0;
      }
      .pizza-display__base {
        position: relative;
        text-align: center;
      }
      .pizza-display__topping {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
      }
    `,
  ],
  animations:[DROP_ANIMATION],
})
export class PizzaComponent implements AfterViewInit, OnChanges {
  @Input() pizza: Pizza;
  @Output() selected = new EventEmitter<any>();

  constructor(
    public toppingService: ToppingsService,
    private pizzaService: PizzaService,
    private cd: ChangeDetectorRef
  ) {}
  effect1 = effect(() => {
    // console.log('effect1', this.totalPrice());
  });
  totalPrice = this.toppingService.totalPrice;
  selectedToppings = this.toppingService.selectedToppings;
  // nToppings: any[];
  nToppings = computed(() => {
    return this.pizzaService.setSelectedToppingImage(this.selectedToppings());
  });
  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      this.pizza &&
      changes['pizza'].currentValue !== changes['pizza'].previousValue
    ) {
      this.nToppings = computed(() => this.pizza.toppings);
      this.totalPrice = computed(() => parseInt(this.pizza.price));
    }
  }
}
