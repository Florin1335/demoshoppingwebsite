import React, { useState } from "react";

export default function Infos(props) {
  const [display, setDisplay] = useState(true);

  const handleOnClick = () => {
    setDisplay(false);
    if (props.changeShowInfo) props.changeShowInfo();
  };

  return (
    <div
      className={`container-fluid border rounded bg-info ${
        display ? "d-flex" : "d-none"
      } justify-content-between p-1`}
    >
      <h4 className="text-center text-dark">{props.info}</h4>
      <button className="float-end btn btn-danger" onClick={handleOnClick}>
        X
      </button>
    </div>
  );
}
