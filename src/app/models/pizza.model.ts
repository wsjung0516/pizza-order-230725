import { Topping } from './topping.model';
import { InjectionToken} from '@angular/core';

export interface Pizza {
  id?: number;
  price?: string;
  name?: string;
  toppings?: Topping[];
}
