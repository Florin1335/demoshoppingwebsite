import React, { useContext, useState } from "react";
import { CartContext } from "../productsPage/CartContext.js";
import ProductDisplay from "./ProductDisplay.js";
import { LoginContext } from "../header/LoginContext.js";
import { ip as serverIP } from "../../ip.js";
import Infos from "../Infos.js";
import Errors from "../Errors.js";
import PlaseazaComanda from "./PlaseazaComanda.js";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const [isAuth] = useContext(LoginContext);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [actualizare, setActualizare] = useState(false);
  const [tempCart, setTempCart] = useState(null);
  const [priceCart, setPriceCart] = useState({});

  const handleButtonClick = () => {
    if (isAuth) {
      setInfo(null);
      setError(null);
      fetch(`http://${serverIP}/cos/golire`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((value) => value.json())
        .then(
          (value) => {
            setInfo(value);
            setCart(null);
          },
          (reason) => setError(reason)
        );
    } else {
      localStorage.removeItem("cart");
      setCart(null);
    }
  };
  const actualizareTempCart = (id, quantity) => {
    if (tempCart) {
      setTempCart((prevState, props) => {
        let aux = {};
        Object.assign(aux, prevState);
        aux[id] = parseInt(quantity);
        return aux;
      });
    } else {
      let aux = {};
      Object.assign(aux, cart);
      aux[id] = parseInt(quantity);
      setTempCart(aux);
    }
  };

  const handleActualizareClick = () => {
    setActualizare(null);
    if (isAuth) {
      fetch(`http://${serverIP}/cos/set`, {
        method: "POST",
        body: JSON.stringify(tempCart),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((value) => {
          if (!value.ok) throw value;
          return value.json();
        })
        .then((value) => {
          setActualizare(value);
          setTempCart(null);
          setCart(tempCart);
        })
        .catch((err) => {
          try {
            err.json().then((body) => {
              setActualizare(body);
            });
          } catch (error) {
            setError(true);
          }
        });
    } else {
      try {
        localStorage.setItem("cart", JSON.stringify(tempCart));
        setActualizare("Coșul a fost actualizat cu succes.");
        setCart(tempCart);
        setTempCart(null);
      } catch (error) {
        setActualizare("Eroare ! " + error.message);
      }
    }
  };

  const priceCartFunction = (id, quantity, price) => {
    setPriceCart((prevState) => ({ ...prevState, [id]: price * quantity }));
  };

  return (
    <div className="container-fluid p-0 container-md border rounded">
      {!cart && (
        <h2 className="text-center p-5">Coșul de cumpărături este gol.</h2>
      )}
      {cart && (
        <div className="d-flex">
          <button className="btn btn-secondary" onClick={handleButtonClick}>
            Goleste coșul
          </button>
          <button
            onClick={handleActualizareClick}
            className={`btn btn-secondary ms-1 ${
              tempCart ? "d-block" : "d-none"
            }`}
          >
            Actualizare coș
          </button>
        </div>
      )}
      {info && <Infos info={info}></Infos>}
      {error && <Errors></Errors>}
      {actualizare && (
        <Infos
          info={actualizare}
          changeShowInfo={() => setActualizare(null)}
        ></Infos>
      )}
      {cart && (
        <div className="row g-0">
          <h5 className="col-10 text-center">Detalii produs</h5>
          <h5 className="col-2 text-center">Preț</h5>
        </div>
      )}
      {cart &&
        Object.keys(cart).map((value, index) => (
          <ProductDisplay
            key={value}
            id={value}
            quantity={cart[value]}
            actualizareTempCart={actualizareTempCart}
            cart={cart}
            priceCartFunction={priceCartFunction}
          ></ProductDisplay>
        ))}
      {isAuth && cart && priceCart && (
        <PlaseazaComanda
          pret={priceCart}
          cart={cart}
          setCart={setCart}
        ></PlaseazaComanda>
      )}
    </div>
  );
}
