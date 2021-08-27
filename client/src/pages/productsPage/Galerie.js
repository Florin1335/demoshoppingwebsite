import React from "react";

export default function Galerie(props) {
  if (props.galerie.length !== 0) {
    if (props.galerie.length === 1)
      return (
        <img
          alt="galerie"
          src={window.location.origin + props.galerie[0].slice(1)}
          className="img-fluid d-block w-50 mx-auto"
        ></img>
      );
    else
      return (
        <div
          id="carouselExampleControls"
          className="carousel carousel-dark border rounded"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner d-flex justify-content-center">
            <div className="carousel-item active w-50 mx-auto">
              <img
                src={window.location.origin + props.galerie[0].slice(1)}
                className="d-block w-100"
                alt="..."
              />
            </div>
            {props.galerie.slice(1).map((value, index) => (
              <div key={index} className="carousel-item w-50 mx-auto">
                <img
                  src={window.location.origin + value.slice(1)}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev btn-light"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next btn-light"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      );
  } else
    return (
      <h3 className="text-info text-center p-5 border rounded">
        Acest produs nu are mai multe imagini.
      </h3>
    );
}
