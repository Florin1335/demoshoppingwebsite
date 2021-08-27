import React, { useEffect, useReducer } from "react";
import { ip as serverIP } from "../../ip.js";
import Loading from "../Loading.js";
import Errors from "../Errors.js";
import Stoc from "../productsPage/Stoc.js";
import { Link } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "success": {
      return { ...state, isLoading: false, product: action.value };
    }
    case "failure": {
      return { ...state, isLoading: false, error: action.error };
    }
    case "quantityChange": {
      return { ...state, quantity: action.value };
    }
    default:
      return { ...state };
  }
}

export default function ProductDisplay(props) {
  const initialState = {
    isLoading: false,
    error: null,
    product: undefined,
    quantity: props.quantity,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quantity, product, isLoading, error } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`http://${serverIP}/db/${props.id}`)
      .then((value) => value.json())
      .then(
        (value) => {
          dispatch({ type: "success", value: value });
        },
        (reason) => {
          dispatch({ type: "failure", error: reason });
        }
      );
  }, []);

  const handleSelectChange = (e) => {
    dispatch({ type: "quantityChange", value: e.target.value });
    props.actualizareTempCart(props.id, e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "quantityChange", value: props.quantity });
  }, [props.quantity]);

  useEffect(() => {
    if (product)
      props.priceCartFunction(props.id, props.quantity, product.pret);
  }, [props.cart, product]);

  return (
    <div className="container-fluid p-0 border-top mt-1 mt-md-2 mb-1 mb-md-2">
      {isLoading && <Loading></Loading>}
      {error && <Errors></Errors>}
      {product && (
        <div className="row g-0">
          <div className="col-2">
            <Link to={"componente/id/" + props.id}>
              <img
                className="img-fluid"
                src={product.imagine}
                alt="imagine"
              ></img>
            </Link>
          </div>
          <div className="col-8 p-1 p-md-3">
            <Link to={"componente/id/" + props.id}>
              <p className="fw-bold">{product.denumire}</p>
            </Link>
            <div>
              Disponibilitate: <Stoc stoc={product.stoc}></Stoc>
            </div>
          </div>
          <div className="col-2 d-flex flex-column justify-content-around">
            <p className="fw-bold text-center">{product.pret * quantity} RON</p>
            <select
              className="form-select"
              value={quantity}
              onChange={handleSelectChange}
            >
              {Array(50)
                .fill()
                .map((value, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
