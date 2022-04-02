import { useContext } from "react";
import { IoTrash } from "react-icons/io5";
import { NotFoundMessege } from "../../components/NotFoundMessage/NotFoundMessege";

import CartContext from "../../context/CartContext";

import { formattedCost } from "../../helpers/functions/transformers";

import { Burger } from "../../helpers/interfaces/burger.model";

import './Cart.scss';

const Cart = () => {
  const { burgers, totalCost, removeItemFromCart } = useContext(CartContext);

  const tableClassNames =
    `border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm`;
  const thClassNames =
    `bg-gray-100 border border-slate-300 dark:border-slate-700 p-3 text-lg text-slate-500 dark:text-slate-400`;
  const tdClassNames =
    `border border-slate-300 dark:border-slate-700 p-3 text-center text-slate-500 dark:text-slate-400`;
  const tdTfootClassNames =
    `bg-gray-100 border border-slate-300 dark:border-slate-700 p-3 text-center text-lg font-bold text-teal-600 dark:text-slate-400`;

  const rows = burgers.map((burger: Burger) => (
    <tr key={burger.id}>
      <td className={tdClassNames}>{burger.name}</td>
      <td className={tdClassNames}>
        {formattedCost(+burger.cost, "en-IN", "INR")} x {burger.current?.count}
      </td>
      <td className={tdClassNames}>
        {formattedCost(burger.current?.cost as number, "en-IN", "INR")}
      </td>
      <td className={tdClassNames}>
        <button
          type="button"
          className="grid place-content-center bg-red-500 text-white w-10 h-10 rounded-full mx-auto"
          onClick={() => removeItemFromCart(burger)}
        >
          <IoTrash size={"20px"} />
        </button>
      </td>
    </tr>
  ));

  return (
    <section className="Cart py-[50px]">
      <div className={`container ${!burgers.length ? 'grid place-content-center h-full' : ''} mx-auto px-3`}>
        {burgers.length ? (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            Payment methods
            <table className={tableClassNames}>
              <thead>
                <tr>
                  <th className={thClassNames}>Items</th>
                  <th className={thClassNames}>Quantity</th>
                  <th className={thClassNames}>Price</th>
                  <th className={thClassNames}>Action</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
              <tfoot>
                <tr>
                  <th className={thClassNames} colSpan={1}>Subtotal</th>
                  <td className={tdTfootClassNames} colSpan={3}>
                    {formattedCost(totalCost, "en-IN", "INR")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <NotFoundMessege msg={"Cart is empty."} classNames={'m-auto'}/>
        )}
      </div>
    </section>
  );
};

export default Cart;
