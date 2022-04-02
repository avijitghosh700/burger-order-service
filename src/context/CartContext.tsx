import { createContext, useState } from "react";

import { decimalLimitter } from "../helpers/functions/transformers";

import { Burger } from "../helpers/interfaces/burger.model";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  const totalCost: number = burgers.reduce((cost, burger) => cost += (burger.current?.cost as number), 0);

  const addToCart = (burger: Burger) => {
    const addedToCart: Burger | undefined = burgers.find(item => item.id === burger.id);
    
    if (addedToCart && addedToCart.current) {
      const currentOfAdded = addedToCart.current;

      if (currentOfAdded.count < (+burger.stock)) {
        currentOfAdded.count += 1;
        currentOfAdded.cost = decimalLimitter(currentOfAdded.cost + (+burger.cost), 2);
      } else {
        currentOfAdded.count = (+burger.stock);
      }

      setBurgers([...burgers]);
    } else {
      setBurgers((state) => [
        ...state,
        {
          ...burger,
          current: {
            count: 1,
            cost: (+burger.cost),
          }
        }
      ]);
    }
  }

  const removeFromCart = (burger: Burger) => {
    const addedToCart: Burger | undefined = burgers.find(item => item.id === burger.id);
      
    if (addedToCart && addedToCart.current) {
      const currentOfAdded = addedToCart.current;

      if (currentOfAdded.count > 0) {
        currentOfAdded.count -= 1;
        currentOfAdded.cost = decimalLimitter(currentOfAdded.cost - (+burger.cost), 2);
      } else {
        currentOfAdded.count = 0;
        currentOfAdded.cost = 0;
      }

      setBurgers((state) => state.filter((item) => item.current?.count));
    } else {
      setBurgers((state) => [
        ...state,
        {
          ...burger,
          current: {
            count: 0,
            cost: 0,
          }
        }
      ]);
    }
  }

  const removeItemFromCart = (burger: Burger) => {
    setBurgers((state) => state.filter((item) => item.id !== burger.id))
  }

  return (
    <CartContext.Provider 
      value={{
        burgers,
        totalCost,
        addToCart,
        removeFromCart,
        removeItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
