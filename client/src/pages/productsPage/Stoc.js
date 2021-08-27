import React from "react";

export default function Stoc({ stoc }) {
  return (
    <p
      className={`d-inline ${
        stoc === "În stoc" ? "text-success" : "text-danger"
      }`}
    >
      {stoc}
    </p>
  );
}
