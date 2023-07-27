import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topping } from 'src/app/models';
import { MatBadgeModule } from '@angular/material/badge';
import { ToppingsService } from './toppings.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toppings',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatIconModule],
  template: `
    <div class="pizza-toppings flex flex-wrap">
      <ng-container *ngFor="let topping of toppings()">
        <div class="flex flex-row items-center justify-center cursor-pointer">
          <div
            class="border rounded border-gray-300 m-2"
            matBadge="{{ topping.count > 0 ? topping.count : '' }}"
          >
            <div
              class="items-center flex flex-col justify-center"
              (click)="addTopping(topping)"
            >
              <div class="px-2 py-1 w-16 h-auto flex items-center">
                <img
                  class=""
                  src="assets/img/toppings/singles/{{ topping.name }}.svg"
                />
              </div>
              <div class="topping_price">
                <span class="text-xs text-green-700">{{ topping.name }}</span>
              </div>
              <div>
                <span class="text-gray-800 text-sm"
                  >{{ topping.price && topping.price * 1000 }}원</span
                >
              </div>
            </div>
            <ng-container *ngIf="topping.count > 0">
              <mat-icon
                class="absolute -top-3 -left-1 w-4 h-4 text-red-300"
                (click)="removeTopping(topping)"
                >remove_circle_outline</mat-icon
              >
            </ng-container>
          </div>
        </div>
      </ng-container>
    </div>
  `,

  styles: [``],
})
export class ToppingsComponent {
  constructor(private toppingsService: ToppingsService) {}
  toppings = this.toppingsService.toppings;
  effect1 = effect(() => {
    // console.log('effect1', this.toppings());
  });
  addTopping(topping: Topping) {
    this.toppingsService.addTopping(topping);
  }
  removeTopping(topping: Topping) {
    this.toppingsService.removeTopping(topping);
  }
}
