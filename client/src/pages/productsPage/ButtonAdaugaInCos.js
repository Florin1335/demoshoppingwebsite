import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../header/LoginContext.js";
import { CartContext } from "./CartContext.js";

export default function ButtonAdaugaInCos(props) {
  const [isAuth] = useContext(LoginContext);
  const [cart, setCart] = useContext(CartContext);
  const [info, setInfo] = useState(null);
  const [clicked, setClicked] = useState(false);

  const fetchRequest = (cart) => {
    setInfo(null);
    setClicked(true);
    fetch(`/cos/set`, {
      method: "post",
      body: JSON.stringify(cart),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((value) => value.json())
      .then(
        (value) => {
          setInfo(value);
          setCart(cart);
          setClicked(false);
        },
        (reason) => setInfo(reason)
      );
  };

  const handleOnClick = () => {
    if (isAuth) {
      if (cart) {
        var copy = {};
        Object.assign(copy, cart);
        if (copy[props.id]) copy[props.id]++;
        else copy[props.id] = 1;
        fetchRequest(copy);
      } else {
        fetchRequest({ [props.id]: 1 });
      }
    } else {
      if (cart) {
        let copy = {};
        Object.assign(copy, cart);
        if (copy[props.id]) copy[props.id]++;
        else copy[props.id] = 1;
        setCart(copy);
        localStorage.setItem("cart", JSON.stringify(copy));
      } else {
        setCart({ [props.id]: 1 });
        localStorage.setItem("cart", JSON.stringify({ [props.id]: 1 }));
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [clicked]);

  return (
    <div className="d-flex flex-column">
      <button
        className={`btn d-inline-block ${
          props.stoc === "În stoc" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={handleOnClick}
        disabled={clicked || props.stoc !== "În stoc" ? true : false}
      >
        {info ? info : "Adaugă în coș"}
      </button>
    </div>
  );
}
