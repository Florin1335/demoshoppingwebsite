import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../Loading.js";
import Infos from "../Infos.js";
import Errors from "../Errors.js";
import ButtonAdaugaInCos from "../productsPage/ButtonAdaugaInCos.js";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    setError(null);
    setResult(null);
    setIsLoading(true);
    fetch(`/api/cautare/${params.query}`)
      .then((value) => {
        if (!value.ok) throw value;
        return value.json();
      })
      .then((value) => {
        setIsLoading(false);
        setResult(value);
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
  }, [params.query]);
  return (
    <div className="container">
      {isLoading && <Loading></Loading>}
      {error && <Errors message={error}></Errors>}
      {result &&
        (result.length === 0 ? (
          <Infos info={"Nu a fost găsit nici un rezultat."}></Infos>
        ) : (
          <div className="row gy-4">
            {result.map((item, index) => (
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
                  <Link to={`/componente/${item.categorie}/${item._id}`}>
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
                      <h5 className="card-text text-warning">
                        {item.pret} RON
                      </h5>
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
        ))}
    </div>
  );
}
