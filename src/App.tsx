import { Routes, Route} from "react-router-dom";

import Header from "./components/Navigation/Header/Header";
import List from "./pages/List/List";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import Success from "./pages/Success/Success";

function App() {
  return (
    <CartProvider>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Success" element={<Success/>}/>
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
