export interface Burger {
  id: string;
  name: string;
  cost: string | number;
  stock: string | number;
  current?: {
    count: number;
    cost: number;
  };
}