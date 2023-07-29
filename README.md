[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](link to site)
# PizzaOrder230725

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Summary
1. The image and animation program used in this project were referenced from other sites.
2. This program was originally developed using RxJS and NgXS (a state management program) but was redeveloped using Angular Signal.
3. Unable to connect to the database, we applied the storage of Pizza Data to local storage.
### Applied technology
1. Angular: 16.1.4 
2. Signal 
3. RxJS: 7.8.0
4. Tailwind: 3.3.0
### Basic structure
![](src/assets/img/pizza-order2.png)

### Description of Program Source
1. toppings.component.ts: The images were composed in SVG format, and since one type of topping can be applied multiple times, each image was arranged into five sets to distribute the toppings evenly on the dough. When a topping is selected, it is saved in a separate array. The order of storage is determined so that toppings added later are placed on top of those already placed. 
2. pizza.component.ts: This component places the selected toppings onto the dough.
3. pizza-order.component.ts: This component is responsible for registering or modifying the pizza.
4. pizza-order-list.component.ts: This component displays the newly created pizzas in a list, and when one is selected, it enters modification mode.
5. home.component.ts: This component includes pizza-order.component.ts and pizza-order-list.component.ts.


#### Deploy information

1. ng build --base-href "https://wsjung0516.github.io/pizza-order-230725/"
2. ng add angular-cli-ghpages
3. npx ngh --dir=dist/pizza-order-230725
   if above command is not working, please refer following site --> https://github.com/angular-schule/angular-cli-ghpages
