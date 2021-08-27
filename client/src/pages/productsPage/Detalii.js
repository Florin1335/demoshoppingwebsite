import React, { Component } from "react";

const textTransform = (string) => {
  return (
    string.replace("_", " ")[0].toUpperCase() +
    string.replace("_", " ").slice(1)
  );
};

export default class Detalii extends Component {
  render() {
    return (
      <div className="container-fluid border rounded">
        {this.props.product &&
          Object.keys(this.props.product).map((key, index) =>
            key !== "_id" &&
            key !== "galerie" &&
            key !== "imagine" &&
            key !== "__v" ? (
              <p key={index}>
                {textTransform(key)}: {this.props.product[key]}
              </p>
            ) : (
              ""
            )
          )}
      </div>
    );
  }
}
