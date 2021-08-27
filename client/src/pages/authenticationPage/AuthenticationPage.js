import React, { useReducer, useContext } from "react";
import Errors from "../Errors.js";
import { LoginContext } from "../header/LoginContext.js";
import Infos from "../Infos.js";
import Loading from "../Loading.js";
import Register from "./Register.js";

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoadingLogin: true,
        loginResponse: null,
        error: null,
      };
    case "success":
      return {
        ...state,
        isLoadingLogin: false,
        loginResponse: action.value,
      };
    case "failure":
      return {
        ...state,
        isLoadingLogin: false,
        error: action.reason,
      };
    case "field":
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

export default function AuthenticationPage() {
  const initialState = {
    email: "",
    parola: "",
    error: null,
    loginResponse: null,
    isLoadingLogin: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, parola, error, loginResponse, isLoadingLogin } = state;
  const [isAuth, setisAuth] = useContext(LoginContext);

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    fetch(`/autentificare/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, parola }),
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        dispatch({ type: "success", value });
        setisAuth(true);
      })
      .catch((err) => {
        try {
          err.json().then((body) => {
            dispatch({ type: "failure", reason: body });
          });
        } catch (e) {
          dispatch({ type: "failure", reason: err.message });
        }
      });
  };

  return (
    <div className="container border rounded p-1 p-sm-2 p-md-4 my-auto">
      {error && <Errors message={error}></Errors>}
      {loginResponse && <Infos info={loginResponse}></Infos>}
      {isLoadingLogin && <Loading></Loading>}
      <div className="container-fluid">
        <form
          onSubmit={onSubmitLogin}
          className="d-flex flex-column w-25 w-custom-50 mx-auto"
        >
          <h3 className="text-center">Autentificare</h3>
          <input
            className="text-center p-2"
            placeholder="Adresa de email"
            type="text"
            name="nume"
            value={email}
            onChange={(e) => {
              dispatch({
                type: "field",
                value: e.currentTarget.value,
                name: "email",
              });
            }}
          ></input>
          <input
            className="text-center p-2"
            placeholder="Parola"
            type="password"
            name="parola"
            value={parola}
            onChange={(e) => {
              dispatch({
                type: "field",
                value: e.currentTarget.value,
                name: "parola",
              });
            }}
          ></input>
          <button className="btn btn-dark rounded mt-2" type="submit">
            Log in
          </button>
        </form>
      </div>
      <Register></Register>
    </div>
  );
}
