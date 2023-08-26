import React, { useContext } from "react";
import { FaHamburger } from "react-icons/fa";

import QtySelector from "../QtySelector/QtySelector";

import CartContext from "../../context/CartContext";

import { formattedCost } from "../../helpers/functions/transformers";

import { Burger } from "../../helpers/interfaces/burger.model";

import "./ProductCard.scss";

interface ProductCardProps extends Burger {
  key?: any;
}

const ProductCard = (props: ProductCardProps) => {
  const { id, name, cost } = props;

  const { burgers } = useContext(CartContext);
  const burgerFiltered: Burger = burgers.find((item: Burger) => item.id === id);
  const orderCost = burgerFiltered && burgerFiltered.current && burgerFiltered.current?.cost;

  return (
    <figure className="ProductCard bg-white border-2 border-gray-400 shadow-xl rounded-md p-3">
      <div className="ProductCard__thumb bg-gray-200 grid place-content-center min-h-[120px] rounded-md mb-2">
        <FaHamburger size={"25px"} className="text-gray-600" />
      </div>
      <figcaption className="ProductCard__caption grid grid-cols-2">
        <div className="ProductCard__info mb-3">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">{formattedCost(orderCost || +cost, "en-IN", "INR")}</p>
        </div>
        <div className="ProductCard__tools grid justify-end">
          <QtySelector {...props} />
        </div>
      </figcaption>
    </figure>
  );
};

export default ProductCard;
