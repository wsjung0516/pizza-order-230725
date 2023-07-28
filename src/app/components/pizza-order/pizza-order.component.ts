import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToppingsComponent } from '../toppings/toppings.component';
import { PizzaComponent } from '../pizza/pizza.component';
import { ToppingsService } from '../toppings/toppings.service';
import { Pizza } from 'src/app/models';
import { PizzaOrderListService } from '../pizza-order-list/pizza-order-list.service';
import { PizzaService } from '../pizza/pizza.service';

@Component({
  selector: 'app-pizza-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ToppingsComponent, PizzaComponent],
  template: `
    <div class="flex justify-between">
      <div class="m-3">
        <h3 class="font-bold text-gray-600">Order Pizza</h3>
      </div>
      <div class="">
        <input
          type="text"
          placeholder="Pizza Name"
          class="border rounded border-gray-500 p-3 m-2"
          [(ngModel)]="inputName"
        />
      </div>
    </div>
    <ng-content></ng-content>
    <app-toppings></app-toppings>
    <app-pizza></app-pizza>

    <div class="flex justify-between">
      <div class="">
        <ng-container *ngIf="status() === 'create'">
          <button
            class="px-2 py-1 bg-green-600 rounded-sm text-white m-2"
            (click)="onOrder()"
          >
            Order
          </button>
        </ng-container>
        <ng-container *ngIf="status() === 'modify'">
          <button
            class="px-2 py-1 bg-green-600 rounded-sm text-white m-2"
            (click)="onModify()"
          >
            Modify
          </button>
        </ng-container>
      </div>
      <div class="">
        <ng-container *ngIf="status() === 'modify'">
          <button
            class="px-2 py-1 bg-red-600 rounded-sm text-white m-2"
            (click)="onCancel()"
          >
            Cancel
          </button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
})
export class PizzaOrderComponent implements OnInit{
  constructor(
    private toppingsService: ToppingsService,
    private pizzaOrderListService: PizzaOrderListService,
    private pizzaService: PizzaService
  ) {
    effect(() => {
      this.inputName = this.pizzaService.pizzaName();
    });
  }

  destroyRef = inject(DestroyRef);
  selectedToppings = this.toppingsService.selectedToppings;
  pizzaOrderList = this.pizzaOrderListService.pizzaOrderList;
  totalPrice = this.toppingsService.totalPrice;
  status = computed(() => this.pizzaOrderListService.pizzaOrderStatus());
  inputName = '';
  // 
  ngOnInit() {

  }
  onOrder = () => {
    if(this.inputName === '') {
      alert('Please input pizza name');
      return;
    }
    const pizza: Pizza = {
      name: this.inputName,
      price: this.totalPrice().toString(),
      toppings: this.pizzaService.setSelectedToppingImage(
        this.selectedToppings()
      ),
    };
    // Because there is no API, just save the pizza order list to the local storage.
    const index = this.pizzaOrderList().findIndex(
      (item: Pizza) => item.name === pizza.name
    );
    //
    if (index === -1) {
      this.pizzaOrderList.mutate((items: Pizza[]) => {
        // console.log('pizzaOrderList[index]', pizza);
        items.push(pizza);
        // Reset
        this.resetPizzaOrderState();

      });
    }
  };
  onModify = () => {
    const pizza: Pizza = {
      name: this.inputName,
      price: this.totalPrice().toString(),
      toppings: this.pizzaService.setSelectedToppingImage(
        this.selectedToppings()
      ),
    };
    // Because there is no API, just save the pizza order list to the local storage.
    const index = this.pizzaOrderList().findIndex(
      (item: Pizza) => item.name === pizza.name
    );
    //
    if (index !== -1) {
      this.pizzaOrderList.mutate((items: Pizza[]) => {
        // console.log('pizzaOrderList[index]', pizza);
        items[index] = pizza;
        // Reset
        this.resetPizzaOrderState();
        // Set pizza order status to create
        this.pizzaOrderListService.pizzaOrderStatus.set('create');
      });
    }

  };
  onCancel = () => {
    // Set pizza order status to create
    this.pizzaOrderListService.pizzaOrderStatus.set('create');
    // Reset toppings's count
    this.resetPizzaOrderState();
  };

  private resetPizzaOrderState() {
    const temp = this.toppingsService.toppings();
    // Make oldToppings's count to 0
    const oldToppings = temp.map((oldTopping) => ({ ...oldTopping, count: 0 }));
    //
    // To show toppings's count in the order-pizza.component
    this.toppingsService.toppings.set(oldToppings);
    // Reset pizza name
    this.pizzaService.pizzaName.set('');

    // To clear toppings on the pizza in the order-pizza.component
    // Because selectedToppings is called automatically when toppings is changed
    this.toppingsService.selectedToppings.set([]);
  }
}

