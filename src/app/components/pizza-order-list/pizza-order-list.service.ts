import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Pizza } from "src/app/models";

@Injectable({
  providedIn: 'root',
})
export class PizzaOrderListService {
  constructor(private http: HttpClient) {}
  pizzaOrderList = signal<Pizza[]>([]);
  pizzaOrderStatus = signal<string>('create');
  selectedOrder = signal<Pizza>(null);

  private pizzaOrderList$ = this.http
      .get<Pizza[]>(`assets/json/db.json`)
      .pipe(
        map( (val: any) =>val['pizzas']),
        tap((val: any) => this.pizzaOrderList.set(val)),
        catchError((error: any) => of([]))
      ).subscribe();
  
  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`http://localhost:3000/pizzas`, payload)
      .pipe(catchError((error: any) => of(null)));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`http://localhost:3000/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => of(null)));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`http://localhost:3000/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => of(null)));
  }
}