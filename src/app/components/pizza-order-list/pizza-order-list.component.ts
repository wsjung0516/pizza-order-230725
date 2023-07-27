import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOrderListService } from './pizza-order-list.service';
import { Pizza, Topping } from 'src/app/models';
import { PizzaComponent } from '../pizza/pizza.component';
import { ToppingsService } from '../toppings/toppings.service';
import { PizzaService } from '../pizza/pizza.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pizza-order-list',
  standalone: true,
  imports: [
    CommonModule,
    PizzaComponent,
    MatIconModule
  ],
  template: `
    <div class="flex flex-wrap" data-cy="pizza-item-list">
      <div
        class=" p-2" data-cy="pizza-item"
        *ngFor="let pizza of pizzaOrderList()"
        
      >
      <div class="absolute" (click)="onDelete(pizza)">
        <mat-icon class="text-red-400" data-cy="pizza-item-remove">delete</mat-icon>
      </div>
      <div class="border border-gray-300 rounded-md px-3" (click)="onSelectPizza(pizza)">
        <div class="flex justify-center mt-2">
          <h4 class="text-gray-600 font-bold">{{ pizza.name }}</h4>
        </div>
        <app-pizza
          [pizza]="pizza"
          (selected)="onOrderPizza($event)"
        ></app-pizza>
      </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PizzaOrderListComponent {
  constructor(
    public pizzaOrderListService: PizzaOrderListService,
    private toppingsService: ToppingsService,
    private pizzaService: PizzaService
    
    ) {}
  pizzaOrderList = this.pizzaOrderListService.pizzaOrderList;
  onSelectPizza = (pizza: Pizza) => {
    pizza.toppings = pizza.toppings.map((val) => ({...val, count: 1}))
    // Set pizza order status to modify
    this.pizzaOrderListService.pizzaOrderStatus.set('modify');
    const temp = this.toppingsService.toppings();
    // Make oldToppings's count to 0
    const oldToppings = temp.map((oldTopping) => ({...oldTopping, count: 0}));
    // 
    // Made new toppings that has count value, which is added from oldToppings and pizza.toppings
    let newToppings = this.summarizeToppingsCount(oldToppings, pizza);
    // To show toppings's count in the order-pizza.component
    this.toppingsService.toppings.set(newToppings);

    // To show toppings on the pizza in the order-pizza.component
    // Because selectedToppings is called automatically when toppings is changed
    this.toppingsService.selectedToppings.set(pizza.toppings);

    // To show pizza's name in the order-pizza.component
    this.pizzaService.pizzaName.set(pizza.name);
    
    // console.log('onSelectPizza', pizza, newToppings);
  };
  private summarizeToppingsCount(oldToppings: Topping[], pizza: Pizza) {
    let combined = [...oldToppings, ...pizza.toppings];

    let newToppings = combined.reduce((acc, val) => {
      // Find the index if item already exists in the array
      let index = acc.findIndex(item => item.name === val.name);

      // If the item exists, add the count
      if (index > -1) {
        acc[index].count += val.count;
      } else {
        // Else add the object to the array
        acc.push(val);
      }
      return acc;
    }, []);
    return newToppings;
  }

  onOrderPizza(pizza: Pizza) {
    console.log('onOrderPizza', pizza);
  }
  onDelete(pizza: Pizza) {
    const ret = window.confirm('Do you want to cancel?');
    if( !ret ) return;

    const selectedOrder = this.pizzaOrderListService.selectedOrder;
    // 
    const index = this.pizzaOrderList().findIndex((item: Pizza) => item.name === pizza.name);
    // 
    if (index !== -1) {
      this.pizzaOrderList.update((items: Pizza[]) =>
        items.filter((item: Pizza) => item.name !== pizza.name)
      );
    }
  }
}
