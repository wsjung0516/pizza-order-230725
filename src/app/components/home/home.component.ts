import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOrderComponent } from '../pizza-order/pizza-order.component';
import { PizzaOrderListComponent } from '../pizza-order-list/pizza-order-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PizzaOrderComponent,
    PizzaOrderListComponent,
  ],
  template: `
    <section class="grid sm:grid-cols-2 m-2 gap-2">
      <section>
        <div class="h-120 border-2 rounded border-green-500 p-3">
          <app-pizza-order
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)"
          >
          </app-pizza-order>
        </div>
      </section>
      <section>
      <div class="flex justify-center font-bold text-gray-600 mb-3">
        <h3>Ordered Pizzas</h3>
      </div>
        <div class="">
          <app-pizza-order-list></app-pizza-order-list>
        </div>
      </section>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  onCreate = (ev: any) => {};
  onUpdate = (ev: any) => {};
  onRemove = (ev: any) => {};
}
