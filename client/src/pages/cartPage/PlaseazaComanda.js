import React, { useEffect, useState } from "react";
import FormComanda from "./FormComanda.js";
import Errors from "../Errors.js";
import Infos from "../Infos.js";
import Loading from "../Loading.js";
export default function PlaseazaComanda(props) {
  const [pret, setPret] = useState(0);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [info, setInfo] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let total = 0;
    for (let i of Object.keys(props.cart))
      if (props.pret[i]) total += props.pret[i];
    setPret(total);
  }, [props.pret, props.cart]);

  const handleButtonClick = () => {
    setClicked(true);
    setIsLoading(true);
    setError(null);
    setInfo(null);
    fetch(`/cos/comanda`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        setIsLoading(false);
        setInfo(value + " Veți fi redirecționat în scurt timp...");
        setTimeout(() => {
          props.setCart(null);
        }, 5000);
      })
      .catch((err) => {
        try {
          err.json().then((value) => {
            setIsLoading(false);
            setError(value);
          });
        } catch (e) {
          setIsLoading(false);
          setError(true);
        }
      });
  };

  useEffect(() => {
    return () => {
      if (info) props.setCart(null);
    };
  });

  const updateUserData = (data) => {
    setUserData(data);
  };

  return (
    <div className="container-fluid p-2 p-md-5 mt-3 mt-md-3 mt-lg-5 bg-dark d-flex flex-column align-items-center">
      <p className="h4 fw-bold text-warning">Plasează comanda</p>
      <FormComanda updateUserData={updateUserData}></FormComanda>
      <p className="text-light fw-bold mt-3 mt-lg-5">
        Metoda de livrare: Prin curier &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-truck"
          viewBox="0 0 16 16"
        >
          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      </p>
      <p className="text-light fw-bold mt-3 mt-lg-5">
        Metoda de plată: Ramburs &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cash-coin"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
          />
          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
        </svg>
      </p>
      <p className="text-light fw-bold mt-3 mt-lg-5">Preț total: {pret} RON</p>
      {error && <Errors message={error}></Errors>}
      {info && <Infos info={info}></Infos>}
      {isLoading && <Loading></Loading>}
      <button
        disabled={clicked}
        className="btn btn-warning mt-2 mt-lg-4"
        onClick={handleButtonClick}
      >
        Plasează comanda
      </button>
    </div>
  );
}
