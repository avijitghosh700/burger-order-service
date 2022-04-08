import { useContext, useState } from "react";

import CartContext from "../../context/CartContext";

import { formattedCost } from "../../helpers/functions/transformers";

import "./PaymentMethods.scss";

export const PaymentMethods = ({ classNames }: { [k: string]: any }) => {
  const { totalCost } = useContext(CartContext);
  const [isCOD, setIsCOD] = useState(false);

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const script: HTMLScriptElement = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);

      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
    });
  };

  const openRazorPay = async (totalCost: number) => {
    const isScriptLoaded: boolean = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isScriptLoaded) return;

    const win = window as any;
    const options = {
      key: "rzp_test_vgLJKqT9Sz3TnV", // Enter the Key ID generated from the Dashboard
      amount: totalCost * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "BurgerOrderApp",
      description: `Your order for ${formattedCost(totalCost, "en-IN", "INR")}`,
      image: "",
      order_id: "order_JFcJMhxukdUKdz", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: Record<any, any>) {
        console.log(response);
      },
      // prefill: {
      //   name: "Gaurav Kumar",
      //   email: "gaurav.kumar@example.com",
      //   contact: "9999999999",
      // },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      theme: {
        color: "#10b981",
      },
    };
    const rzp = new win.Razorpay(options);
    rzp.on("payment.failed", function (response: Record<any, any>) {
      console.log(response);
    });

    rzp.open();
    setIsCOD(false);
  };

  return (
    <div className={`PaymentMethods ${classNames}`}>
      <div className="PaymentMethods__head border-b-2 border-gray-900 mb-3">
        <h2 className="text-3xl mb-2">Choose payment type</h2>
      </div>
      <div className="PaymentMethods__body">
        <div className="grid rid-cols-1 gap-4">
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
              onChange={() => openRazorPay(totalCost)}
            />
            <label className={`PaymentMethods__methodName`} htmlFor="card">
              <span className="PaymentMethods__mark"></span>
              Pay {formattedCost(totalCost, "en-IN", "INR")}
            </label>
          </div>
        </div>

        {isCOD && (
          <div className="PaymentMethods__btnGrp mt-5">
            <button className="w-full px-4 py-3 rounded-md bg-slate-900 text-white shadow-md">
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
