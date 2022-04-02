import { useContext } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

import CartContext from "../../context/CartContext";
import { Burger } from "../../helpers/interfaces/burger.model";

import "./QtySelector.scss";

const QtySelector = (burger: Burger) => {
  const { burgers, addToCart, removeFromCart } = useContext(CartContext);
  const burgerFiltered: Burger = burgers.find((item: Burger) => item.id === burger.id);

  const mainElementClassNames =
    "max-w-[100px] h-[30px] border-[1px] border-gray-900 rounded-md overflow-hidden";
  const inputClassNames =
    "h-full w-1/3 p-0 text-center focus:ring-0 focus:border-teal-600 border-gray-900 border-x-[1px] border-y-0";

  return (
    <div className={`QtySelector ${mainElementClassNames}`}>
      <button
        type="button"
        className="h-full w-1/3 grid place-content-center bg-white"
        onClick={() => addToCart(burger)}
      >
        <IoAdd size={"20px"} />
      </button>

      <input
        type="number"
        className={inputClassNames}
        defaultValue={burgerFiltered?.current?.count}
        key={burgerFiltered?.current?.count}
        readOnly
      />

      <button
        type="button"
        className="h-full w-1/3 grid place-content-center bg-white"
        onClick={() => removeFromCart(burger)}
      >
        <IoRemove size={"20px"} />
      </button>

      {!burgerFiltered?.current?.count && (
        <button
          type="button"
          className="h-full w-full flex items-center justify-center bg-white rounded-md absolute"
          onClick={() => addToCart(burger)}
        >
          <IoAdd size={"20px"} className="mr-2" /> Add
        </button>
      )}
    </div>
  );
};

export default QtySelector;
