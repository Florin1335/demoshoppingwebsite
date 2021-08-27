import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavMenu() {
  const { url } = useRouteMatch();
  return (
    <div className="container-fluid d-flex flex-column justify-content-center p-0">
      <Link to={url + "/info"}>
        <button className="btn btn-dark w-100 mt-2">
          Informații utilizator
        </button>
      </Link>
      <Link to={url + "/comenzi"}>
        <button className="btn btn-dark w-100 mt-2">Comenzi</button>
      </Link>
      <button className="btn btn-dark w-100 mt-2">Setari</button>
    </div>
  );
}
