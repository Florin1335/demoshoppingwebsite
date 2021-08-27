import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ip as serverIP } from "../../ip.js";
import Detalii from "./Detalii.js";
import Galerie from "./Galerie.js";
import ButonAdaugaInCos from "../productsPage/ButtonAdaugaInCos.js";
import Stoc from "../productsPage/Stoc.js";

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "success": {
      return { ...state, isLoading: false, product: action.data };
    }
    case "failure": {
      return { ...state, isLoading: false, error: action.error };
    }
    case "navbar": {
      return { ...state, navbar: action.number };
    }
    default:
      return { ...state };
  }
}

export default function IndividualProductPage() {
  const params = useParams();
  const initialState = {
    isLoading: false,
    error: null,
    product: undefined,
    navbar: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error, product, navbar } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`http://${serverIP}/db/${params.id}`)
      .then((value) => value.json())
      .then(
        (value) => {
          dispatch({ type: "success", data: value });
        },
        (reason) => {
          dispatch({ type: "failure", error: reason });
        }
      );
  }, []);
  function navbar_change(e) {
    e.preventDefault();
    dispatch({ type: "navbar", number: navbar === 0 ? 1 : 0 });
  }

  return (
    <div className="container mb-3">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
        <div className="container-fluid">
          <div className="card">
            <div className="row d-none d-sm-flex">
              <div className="col">
                <img
                  className="img-fluid"
                  src={
                    product.imagine &&
                    window.location.origin + product.imagine.slice(1)
                  }
                  alt="produs"
                ></img>
              </div>
              <div className="col p-xl-5 p-sm-2 p-0">
                <div className="card-body h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.denumire}</h5>
                    <div>
                      Disponibilitate: <Stoc stoc={product.stoc}></Stoc>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <ButonAdaugaInCos
                      id={product._id}
                      stoc={product.stoc}
                    ></ButonAdaugaInCos>
                    <p className="card-text text-end">{product.pret} RON</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid d-sm-none d-block">
              <h5 className="card-title text-center">{product.denumire}</h5>
              <img
                className="img-fluid"
                src={
                  product.imagine &&
                  window.location.origin + product.imagine.slice(1)
                }
                alt="produs"
              ></img>
              <p className="card-text text-end">{product.pret} RON</p>
            </div>
          </div>
        </div>
      )}
      <div className="container-fluid mt-5">
        <nav className="navbar navbar-expand bg-light navbar-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={navbar_change}>
                  Detalii
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={navbar_change}>
                  Galerie
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {navbar === 0 ? (
        <Detalii product={product}></Detalii>
      ) : (
        <div className="container-fluid">
          <Galerie galerie={product.galerie}></Galerie>
        </div>
      )}
    </div>
  );
}
