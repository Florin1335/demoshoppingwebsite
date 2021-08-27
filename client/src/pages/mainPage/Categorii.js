import React from "react";
import { Link } from "react-router-dom";

export default function Categorii() {
  return (
    <div className="container-fluid p-0" id="categorii">
      <div className="row g-0">
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/placivideo">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/placiVideo.png"
            ></img>

            <p className="text-center fw-bold h2">Placi video</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/procesoare">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/procesoare.png"
            ></img>
            <p className="text-center fw-bold h2">Procesoare</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/placidebaza">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/placiDeBaza.png"
            ></img>
            <p className="text-center fw-bold h2">Placi de bază</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/carcase">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/carcase.png"
            ></img>
            <p className="text-center fw-bold h2">Carcase</p>
          </Link>
        </div>
      </div>
      <div className="row g-0">
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/coolere">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/coolere.png"
            ></img>
            <p className="text-center fw-bold h2">Coolere</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/hdd">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/hdd.png"
            ></img>
            <p className="text-center fw-bold h2">HDD</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/ssd">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/ssd.png"
            ></img>
            <p className="text-center fw-bold h2">SSD</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-end">
          <Link to="/componente/memoriiRam">
            <img
              className="img-fluid w-75 d-block mx-auto"
              alt="gpu"
              src="/imagini/main/memoriiRam.png"
            ></img>
            <p className="text-center fw-bold h2">Memorii RAM</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
