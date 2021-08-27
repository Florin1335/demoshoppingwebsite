import React, { useEffect, useReducer } from "react";
import Loading from "../Loading.js";
import Errors from "../Errors.js";
import { ip as serverIP } from "../../ip.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true, error: null, user: null };
    }
    case "success": {
      return { ...state, isLoading: false, user: action.user };
    }
    case "failure": {
      return { ...state, isLoading: false, error: action.errors };
    }
    default: {
      return { ...state };
    }
  }
};

export default function UserInfo(props) {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isLoading, error } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`http://${serverIP}/autentificare/info`, {
      method: "get",
      credentials: "include",
    })
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        dispatch({ type: "success", user: value });
      })
      .catch((err) => {
        try {
          err
            .json()
            .then((value) => dispatch({ type: "failure", error: value }));
        } catch (e) {
          dispatch({ type: "failure", error: e.message });
        }
      });
  }, []);

  return (
    <div className="container-fluid p-0">
      {isLoading && <Loading></Loading>}
      {error && <Errors message={error}></Errors>}
      {user && (
        <div className="card">
          <img
            className="card-img-top w-50 mx-auto"
            alt="user"
            src="/imagini/alte_imagini/userIcon.png"
          ></img>
          <div className="card-body">
            <h5 className="card-title text-center">Informații utilizator</h5>
            <p className="card-text text-center">
              {user.nume} {user.prenume}
            </p>
            <p className="card-text text-center">{user.email}</p>
            {user.adresa ? (
              <>
                <p className="card-text text-center">
                  Județ: {user.adresa.judet}
                </p>
                <p className="card-text text-center">
                  Oraș: {user.adresa.oras}
                </p>
              </>
            ) : (
              <p className="card-text text-center">Adresa nu este setată.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
