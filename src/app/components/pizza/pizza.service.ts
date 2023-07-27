import { Injectable, signal } from '@angular/core';
import { distinct, from, map, pluck, takeLast, tap } from 'rxjs';
import { Pizza, Topping } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  selectedPizza = signal<Pizza | undefined>(undefined);
  pizzaName = signal<string>('');
  counter: any = 0;
  constructor() {}
  // Before action of setting  image name, named sequence no for each topping object
  // to layering each selected toppings by z-index.
  // Extract id of toppings, which was added by inserting action.
  // Remove duplicated id
  // Set image name to each toppings.
  // Get the last array, which is duplicated by pluck function.
  // Sort each topping array by the sequence no

  setSelectedToppingImage(toppings: Topping[]) {
    let arr: any[] = [];
    let no = 1;
    let data: any[] = [];
    if (!toppings) {
      // @ts-ignore
      return;
    }
    toppings.forEach((val) => data.push({ ...val, no: no++ }));
    from(data)
      .pipe(
        pluck('id'),
        distinct(),
        tap((v1) => {
          // check if the id is same as the id of the topping object.
          let count = 1;
          data.map((v2) => {
            if (v2.id === v1) {
              // 전체 항목에서 id가 같은 항목을 찾아서 image name을 설정한다.
              arr.push({ ...v2, image: v2.name + '_' + (count++).toString() });
            }
          });
        }),
        map(() => arr),
        takeLast(1)
      )
      .subscribe();
    arr.sort((a, b) => {
      return a.no < b.no ? -1 : a.no > b.no ? 1 : 0;
    });
    data = [];
    arr.map((val) =>
      data.push(val)
    );
    return data;
  }
}