export interface Topping {
  no?: number;
  id?: number;
  name?: string;
  // [key: string]: any;
  image?: string;
  price?: number;
  count?: number;
  active?: boolean;
}
export interface SequenceTopping extends Topping {
  image?: string;
}
