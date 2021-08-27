import React, { useState } from "react";

export default function Errors(props) {
  const [display, setDisplay] = useState(true);
  return (
    <div
      className={`alert alert-danger p-2 ${
        display ? "d-flex" : "d-none"
      } flex-column justify-content-center`}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={() => setDisplay(false)}>
          X
        </button>
      </div>
      <h1 className="text-danger text-center">
        {props.message && props.message !== true
          ? props.message
          : "Eroare la conexiune..."}
      </h1>
    </div>
  );
}
