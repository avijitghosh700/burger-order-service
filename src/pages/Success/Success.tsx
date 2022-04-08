import { useContext, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Summary } from "../../components/Summary/Summary";
import CartContext from "../../context/CartContext";

import './Success.scss';

const Success = () => {
  const { resetCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setTimeout(() => {
        navigate('/');
        resetCart();
      }, 3000);
    }
  });
  
  return (
    <section className="Success py-[50px]">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-1 gap-4">
          <div className="Success__heading text-center py-10">
            <h1 className="text-5xl text-teal-600 inline-flex items-center">
              <FaCheckCircle className="mr-2"/>
              Success
            </h1>
          </div>

          <Summary/>
        </div>
      </div>
    </section>
  );
}

export default Success;