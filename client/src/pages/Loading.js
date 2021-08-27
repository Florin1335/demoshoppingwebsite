import React from "react";

export default function Loading() {
  return (
    <div className="container-fluid border rounded bg-light p-3">
      <div className="spinner mx-auto">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}
