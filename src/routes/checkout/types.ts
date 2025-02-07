export interface Product {
  name: string;
  price: number;
}

export type Products = { [SKU: string]: Product };

export enum SKU {
  GoogleHome = "120P90",
  MacPro = "43N23P",
  AlexaSpeaker = "A304SD",
  RaspberryPi = "344222",
}
