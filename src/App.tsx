import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Navigation/Header/Header";
import List from "./pages/List/List";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";

import { useContext } from "react";
import CartContext, { CartProvider } from "./context/CartContext";

const ProtectedRoute = ({ children }: Record<string, JSX.Element>) => {
  const { burgers } = useContext(CartContext);

  return burgers.length ? children : <Navigate to={"/"} />;
};

function App() {
  return (
    <CartProvider>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="Cart" element={<Cart />} />
          <Route
            path="Success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
