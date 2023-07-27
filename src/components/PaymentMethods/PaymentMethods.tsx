import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRazorpay, { RazorpayOptions } from "react-razorpay";

import CartContext from "../../context/CartContext";

import { formattedCost } from "../../helpers/functions/transformers";

import "./PaymentMethods.scss";

export const PaymentMethods = ({ classNames }: { [k: string]: any }) => {
  const { totalCost } = useContext(CartContext);
  const [isCOD, setIsCOD] = useState(false);
  const navigate = useNavigate();

  const [Razorpay] = useRazorpay();

  const getOrderId = async (totalCost: number) => {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic cnpwX3Rlc3RfSXFwaDcyd2M1WjdpTnU6V1VZYkpqQ1RYeExRZU5Hb2tGSFB4YXdl",
      },
      body: JSON.stringify({
        amount: totalCost,
        currency: "INR",
      }),
    });

    const data = await response.json();
    return data.id;
  };

  const openRazorPay = async () => {
    try {
      const options: RazorpayOptions = {
        key: "rzp_test_dfjXPqCyTKp0Bt", // Enter the Key ID generated from the Dashboard
        amount: String(totalCost * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "BurgerOrderApp",
        description: `Your order for ${formattedCost(totalCost, "en-IN", "INR")}`,
        image: "",
        order_id: await getOrderId(totalCost * 100), //This is a sample Order ID. Pass the `id` obtained in the response.
        handler: function (response: Record<any, any>) {
          console.log(response, "Success");
          navigate("/Success");
        },
        prefill: {
          name: "BurgerOrderApp",
          email: "help@burgerorder.com",
          contact: "8334831533",
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new Razorpay(options);

      rzp.on("payment.failed", function (response: Record<any, any>) {
        console.log(response, "Failed");
      });

      rzp.open();
      setIsCOD(false);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const moveToSuccess = () => {
    navigate("/Success");
  };

  return (
    <div className={`PaymentMethods ${classNames}`}>
      <div className="PaymentMethods__head border-b-2 border-gray-900 mb-3">
        <h2 className="text-3xl mb-2">Choose payment type</h2>
      </div>
      <div className="PaymentMethods__body">
        <div className="grid grid-cols-1 gap-4">
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
              onChange={openRazorPay}
            />
            <label className={`PaymentMethods__methodName`} htmlFor="card">
              <span className="PaymentMethods__mark"></span>
              Pay {formattedCost(totalCost, "en-IN", "INR")}
            </label>
          </div>
        </div>

        {isCOD && (
          <div className="PaymentMethods__btnGrp mt-5">
            <button
              type="button"
              className="w-full px-4 py-3 rounded-md bg-slate-900 text-white shadow-md"
              onClick={moveToSuccess}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
