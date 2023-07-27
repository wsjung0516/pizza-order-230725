import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Topping } from 'src/app/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ToppingsService {
  constructor(private http: HttpClient) {}
  toppings = signal<Topping[]>([]);
  // Because of the z-index of the topping image, need to set toppings in order.
  selectedToppings = signal<Topping[]>([]);
  //
  totalPrice = computed(() => {
    return this.selectedToppings().reduce((acc, cur) => {
      return acc + (cur.price * 1000 || 0);
    }, 0);
  });
  private toppings$ = this.http
    .get<Topping[]>(`assets/json/db.json`)
    .pipe(
      map((val: any) => val['toppings']),
      tap((val: any) => this.toppings.set(val)),
      takeUntilDestroyed(),
      catchError((error: any) => of([]))
    )
    .subscribe();

  addTopping(topping: Topping) {
    // 
    this.toppings.mutate((items: Topping[]) => {
      return items.map((item: Topping) => {
        // Limit the count of topping to 5
        if (item.id === topping.id && item.count < 5) {
          // add topping to selected toppings
          this.selectedToppings.mutate((items: Topping[]) => {
            items.push(topping);
          });
          // increase the count of topping
          return item.count = item.count + 1;
        } else {
          return item;
        }
        // return (item.id === topping.id && item.count < 5)? (item.count = item.count + 1) : item;
      });
    });
  }
  removeTopping(topping: Topping) {
    // remove topping from selected toppings
    this.selectedToppings.update((items: Topping[]) => {
      const index = items.findIndex((item: Topping) => item.id === topping.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
      return items;
    });
    // decrease the count of topping
    this.toppings.mutate((items: Topping[]) => {
      return items.map((item: Topping) => {
        return item.id === topping.id ? (item.count = item.count - 1) : item;
      });
    });
  }
}
