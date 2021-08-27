import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Errors from "../Errors.js";
import Loading from "../Loading.js";
import ButtonAdaugaInCos from "./ButtonAdaugaInCos.js";

export default function ProductsPage() {
  const categorie = useParams();
  const [produse, setProduse] = useState(null);
  const [isLoadingProduse, setIsloadingProduse] = useState(true);
  const [errorProduse, setErrorProduse] = useState(false);

  useEffect(() => {
    const requestProducts = () => {
      fetch(`/db/${categorie.categorie}`)
        .then((value) => value.json())
        .then(
          (value) => {
            setProduse(value);
            setIsloadingProduse(false);
            setErrorProduse(false);
          },
          (reason) => {
            setErrorProduse(reason.message);
            setIsloadingProduse(false);
          }
        );
    };
    requestProducts();
    return () => {};
  }, []);

  return (
    <div className="container mb-1 mt-1 mb-md-3 mt-md-3">
      {errorProduse && <Errors></Errors>}
      {isLoadingProduse && <Loading></Loading>}
      <div className="row gy-4">
        {produse &&
          produse.map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
            >
              <div className="card">
                <p
                  className={`card-text text-center ${
                    item.stoc === "În stoc" ? "text-success" : "text-danger"
                  }`}
                >
                  {item.stoc}
                </p>
                <Link to={`/componente/${categorie.categorie}/${item._id}`}>
                  <img
                    className="card-img-top"
                    alt="gpu"
                    src={
                      item.imagine &&
                      window.location.origin + item.imagine.slice(1)
                    }
                  ></img>
                </Link>
                <div className="card-body">
                  <h4 className="card-title">{item.denumire}</h4>
                  <div className="d-flex justify-content-between align-items-end">
                    <h5 className="card-text text-warning">{item.pret} RON</h5>
                    <ButtonAdaugaInCos
                      id={item._id}
                      stoc={item.stoc}
                    ></ButtonAdaugaInCos>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
