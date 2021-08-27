import React from "react";
import Categorii from "./Categorii";

export default function MainPage() {
  return (
    <div className="container-fluid p-0">
      <div
        className="container-fluid d-flex flex-column justify-content-evenly ps-5"
        id="parallaxImage1"
      >
        <div>
          <h1 className="display-1 text-light text-shadow">Welcome</h1>
        </div>
        <div>
          <p className="text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            bibendum lorem vitae erat sodales egestas. Vestibulum porta
            facilisis efficitur. Donec tincidunt at mi vel fringilla.
          </p>
        </div>
      </div>
      <Categorii></Categorii>
      <div className="container-fluid" id="parallaxImage2"></div>
    </div>
  );
}
