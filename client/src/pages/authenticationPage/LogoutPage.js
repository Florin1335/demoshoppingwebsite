import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading.js";
import Infos from "../Infos.js";
import Errors from "../Errors.js";
import { LoginContext } from "../header/LoginContext.js";

export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isAuth, setisAuth] = useContext(LoginContext);

  useEffect(() => {
    let timer;
    const sendRequest = () => {
      setInfo(null);
      setError(null);
      setIsLoading(true);
      fetch(`/autentificare/logout`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((value) => {
          if (!value.ok) throw value;
          return value.json();
        })
        .then((value) => {
          setInfo(value + " Vei fi redirecționat automat în scurt timp.");
          setIsLoading(false);
          timer = setTimeout(() => {
            setisAuth(false);
          }, 5000);
        })
        .catch((err) => {
          try {
            // err este value adica un Promise
            err.json().then((body) => {
              setError(body);
              setIsLoading(false);
            });
          } catch (error) {
            // error este un Error Object
            setError(error.message);
            setIsLoading(false);
          }
        });
    };
    sendRequest();
    return () => {
      clearTimeout(timer);
      setisAuth(false);
    };
  }, []);

  return (
    <div className="container mt-3">
      {info && <Infos info={info}></Infos>}
      {error && <Errors message={error}></Errors>}
      {isLoading && (
        <>
          <h2 className="text-center">Logging out...</h2>
          <Loading></Loading>
        </>
      )}
    </div>
  );
}
