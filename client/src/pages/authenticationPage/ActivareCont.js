import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Loading from "../Loading.js";
import Errors from "../Errors.js";
import Infos from "../Infos.js";
import { ip as serverIP } from "../../ip.js";

export default function ActivareCont() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let timer;
    setInfo(null);
    setError(null);
    setIsLoading(true);
    fetch(`http://${serverIP}/autentificare/activare_cont`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ cod_activare: params.cod }),
      headers: { "Content-Type": "application/json" },
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        setInfo(value);
        setIsLoading(false);
        timer = setTimeout(() => {
          setRedirect(true);
        }, 5000);
      })
      .catch((err) => {
        try {
          err.json().then((val) => {
            setError(val);
            setIsLoading(false);
          });
        } catch (error) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => {
      setRedirect(true);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="container">
      {isLoading && <Loading></Loading>}
      {info && <Infos info={info}></Infos>}
      {error && <Errors message={error}></Errors>}
      {redirect && <Redirect to="/autentificare"></Redirect>}
    </div>
  );
}
