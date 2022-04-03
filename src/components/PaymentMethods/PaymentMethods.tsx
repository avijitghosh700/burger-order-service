import { useContext, useState } from "react";

import CartContext from "../../context/CartContext";
import { formattedCost } from "../../helpers/functions/transformers";

import "./PaymentMethods.scss";

export const PaymentMethods = ({ classNames }: { [k: string]: any }) => {
  const { totalCost } = useContext(CartContext);
  const [isCOD, setIsCOD] = useState(false);

  return (
    <div className={`PaymentMethods ${classNames}`}>
      <div className="PaymentMethods__head border-b-2 border-gray-900 mb-3">
        <h2 className="text-3xl mb-2">Choose payment type</h2>
      </div>
      <div className="PaymentMethods__body">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="PaymentMethods__method rounded-md shadow-md">
            <input
              type="radio"
              name="cod"
              value={"cod"}
              className="PaymentMethods__radio hidden"
              id="cod"
              onChange={() => setIsCOD(true)}
            />
            <label className={`PaymentMethods__methodName`} htmlFor="cod">
              <span className="PaymentMethods__mark"></span>
              Cash on delivery
            </label>
          </div>

          <div className="PaymentMethods__method rounded-md shadow-md">
            <input
              type="radio"
              name="cod"
              value={"card"}
              className="PaymentMethods__radio hidden"
              id="card"
              onChange={() => setIsCOD(false)}
            />
            <label className={`PaymentMethods__methodName`} htmlFor="card">
              <span className="PaymentMethods__mark"></span>
              Debit/Credit Card
            </label>
          </div>
        </div>

        {isCOD && (
          <div className="PaymentMethods__btnGrp mt-5">
            <button className="w-full px-4 py-3 rounded-md bg-slate-900 text-white shadow-md">
              Pay {formattedCost(totalCost, "en-IN", "INR")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
