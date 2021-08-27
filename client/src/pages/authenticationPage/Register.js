import React, { useState } from "react";
import Infos from "../Infos.js";
import Errors from "../Errors.js";
import Loading from "../Loading.js";

export default function Register() {
  const [userData, setUserData] = useState({
    email: "",
    parola: "",
    nume: "",
    prenume: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [clicked, setClicked] = useState(false);

  const onSubmitRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInfo(null);
    setClicked(true);
    fetch(`/autentificare/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        setInfo(value);
        setIsLoading(false);
        setClicked(false);
        setUserData({
          email: "",
          parola: "",
          nume: "",
          prenume: "",
        });
      })
      .catch((err) => {
        try {
          err.json().then((value) => {
            setError(value);
            setIsLoading(false);
            setClicked(false);
          });
        } catch (error) {
          setError(true);
          setIsLoading(false);
          setClicked(false);
        }
      });
  };

  return (
    <div className="container-fluid mt-5">
      {isLoading && <Loading></Loading>}
      {info && <Infos info={info}></Infos>}
      {error && <Errors message={error}></Errors>}
      <form className="d-flex flex-column w-25 w-custom-50 mx-auto">
        <h3 className="text-center">Inregistrare</h3>
        <input
          type="email"
          className="text-center p-2"
          placeholder="Adresa de email"
          value={userData.email}
          onChange={(e) => {
            setUserData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        ></input>
        <input
          type="text"
          className="text-center p-2"
          placeholder="Nume"
          value={userData.nume}
          onChange={(e) => {
            setUserData((prevState) => ({
              ...prevState,
              nume: e.target.value,
            }));
          }}
        ></input>
        <input
          type="text"
          className="text-center p-2"
          placeholder="Prenume"
          value={userData.prenume}
          onChange={(e) => {
            setUserData((prevState) => ({
              ...prevState,
              prenume: e.target.value,
            }));
          }}
        ></input>
        <input
          type="password"
          className="text-center p-2"
          placeholder="Parola"
          value={userData.parola}
          onChange={(e) => {
            setUserData((prevState) => ({
              ...prevState,
              parola: e.target.value,
            }));
          }}
        ></input>
        <button
          className="btn btn-dark rounded mt-2"
          type="submit"
          onClick={onSubmitRegister}
          disabled={clicked}
        >
          Register
        </button>
      </form>
    </div>
  );
}
