import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";

import burgersJson from "../../db.json";
import { Burger } from "../../helpers/interfaces/burger.model";

const List = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  const burgerCards = burgers.map((burger) => <ProductCard {...burger} key={burger.id}/>);

  useEffect(() => {
    const burgersData: Burger[] = burgersJson?.burgers.map((burger) => ({
      ...burger,
      current: { count: 0, cost: 0 }
    }));

    setBurgers(burgersData);
  }, []);

  return (
    <section className="List py-[50px]">
      <div className="container mx-auto px-3">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {burgerCards}
        </div>
      </div>
    </section>
  );
};

export default List;
