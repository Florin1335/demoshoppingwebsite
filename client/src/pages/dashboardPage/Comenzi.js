import React, { useEffect, useState } from "react";
import { ip as serverIP } from "../../ip.js";
import Errors from "../Errors.js";
import Loading from "../Loading.js";
import Comanda from "./Comanda.js";

export default function Comenzi() {
  const [comenzi, setComenzi] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://${serverIP}/autentificare/comenzi`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        setIsLoading(false);
        setComenzi(value);
      })
      .catch((err) => {
        try {
          err.json().then((value) => {
            setIsLoading(false);
          });
        } catch (e) {
          setIsLoading(false);
          setError(true);
        }
      });
  }, []);

  return (
    <div className="container-fluid">
      {isLoading && <Loading></Loading>}
      {error && <Errors message={error}></Errors>}
      {comenzi === null && isLoading === false ? (
        <p className="text-center fw-bold">Nici o comandă.</p>
      ) : null}
      {comenzi &&
        comenzi.map((value, index) => (
          <Comanda key={index} comanda={value}></Comanda>
        ))}
    </div>
  );
}
