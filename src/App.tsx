import { Routes, Route, Navigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import Header from "./components/Navigation/Header/Header";
import List from "./pages/List/List";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";

import { useContext } from "react";
import CartContext, { CartProvider } from "./context/CartContext";
import Auth from "./pages/Auth/Auth";

firebase.initializeApp({
  apiKey: "AIzaSyAC243LSAw1n_mJwLsOAaky1NpIVu1aTL4",
  authDomain: "burgerorderapp-react.firebaseapp.com",
  projectId: "burgerorderapp-react",
  storageBucket: "burgerorderapp-react.appspot.com",
  messagingSenderId: "265521767346",
  appId: "1:265521767346:web:10f62b37af9375c751baab",
});

const auth = getAuth();

// For authenticated components
const AuthProtectedComponents = ({ children }: Record<string, JSX.Element>) => {
  const [user] = useAuthState(auth);

  console.log(user?.toJSON());
  return user ? children : null;
};

// For authenticated routes
const AuthProtectedRoute = ({ children }: Record<string, JSX.Element>) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to={"/"} />;
};

// For route that will be accessible only if the cart is not empty
const CartOnlyRoute = ({ children }: Record<string, JSX.Element>) => {
  const { burgers } = useContext(CartContext);

  return burgers.length ? children : <Navigate to={"/"} />;
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <CartProvider>
      <AuthProtectedComponents>
        <Header user={user} />
      </AuthProtectedComponents>

      <main className="App">
        <Routes>
          <Route path="/" element={!user ? <Auth /> : <Navigate to={"/List"} />} />
          <Route
            path="/List"
            element={
              <AuthProtectedRoute>
                <List />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="Cart"
            element={
              <AuthProtectedRoute>
                <Cart />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="Success"
            element={
              <AuthProtectedRoute>
                <CartOnlyRoute>
                  <Success />
                </CartOnlyRoute>
              </AuthProtectedRoute>
            }
          />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
