import React, { createContext, useEffect, useState, useContext } from "react";
import { LoginContext } from "../header/LoginContext";

export const CartContext = createContext();

export function CartProvider(props) {
  const [cart, setCart] = useState(null);
  const [isAuth] = useContext(LoginContext);

  useEffect(() => {
    if (isAuth) {
      fetch(`/cos/get`, {
        credentials: "include",
        method: "get",
      })
        .then((value) => {
          if (value.status === 404)
            throw new Error(value.status + ". Eroare fetch coș de cumpărături");
          else return value;
        })
        .then((value) => value.json())
        .then(
          (value) => setCart(value),
          (reason) => alert(reason)
        )
        .catch((err) => alert(err));
    } else {
      if (localStorage.getItem("cart"))
        setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [isAuth]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
}
