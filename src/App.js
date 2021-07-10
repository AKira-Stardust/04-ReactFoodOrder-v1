import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler(){
    setCartIsShown(true);
  } 

  function hideCartHandler(){
    setCartIsShown(false);
  }

  return (
    <CartContextProvider>
      { cartIsShown && <Cart onHideCart={ hideCartHandler } /> }
      <Header onShowCart={ showCartHandler }/>
      <main>
          <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
