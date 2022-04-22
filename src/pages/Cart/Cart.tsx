import { useContext } from "react";

import { NotFoundMessege } from "../../components/NotFoundMessage/NotFoundMessege";
import { PaymentMethods } from "../../components/PaymentMethods/PaymentMethods";
import { Summary } from "../../components/Summary/Summary";

import CartContext from "../../context/CartContext";

import './Cart.scss';

const Cart = () => {
  const { burgers } = useContext(CartContext);

  return (
    <section className="Cart py-[50px]">
      <div className={`container ${!burgers.length ? 'grid place-content-center h-full' : ''} mx-auto px-3`}>
        {burgers.length ? (
          <div className="grid lg:grid-cols-[500px_minmax(0,_1fr)] md:grid-cols-2 grid-cols-1 items-start gap-5">
            <PaymentMethods classNames={'md:order-first order-last'}/>
            <Summary isAction={true}/>
          </div>
        ) : (
          <NotFoundMessege msg={"Cart is empty."} classNames={'m-auto'}/>
        )}
      </div>
    </section>
  );
};

export default Cart;
