export interface MenuItemInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: SizeOption[];
}

export interface SizeOption {
  name: string;
  price: number;
  maxFruits: number;
  maxCreams: number;
  maxToppings: number;
}
