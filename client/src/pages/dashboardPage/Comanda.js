import React, { useEffect, useState } from "react";

export default function Comanda(props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    Object.keys(props.comanda).map((value) => {
      if (value !== "finalizata" && value !== "istoric")
        sum += props.comanda[value][0] * props.comanda[value][1];
    });
    setTotal(sum);
  }, []);
  return (
    <div className="container-fluid border mt-1 mt-md-2 mb-1 mb-md-2 rounded bg-white">
      <p className="fw-bold text-center">Status comandă</p>
      <p>
        {props.comanda.finalizata
          ? "Comanda a fost finalizată."
          : "Comanda nu este încă finalizată."}
      </p>
      <p className="fw-bold text-center">Istoric comandă</p>
      <p>{props.comanda.istoric}</p>
      <p className="fw-bold text-center">Produse comandate</p>
      <table className="table">
        <thead>
          <tr>
            <th>Denumire</th>
            <th>Cantitate</th>
            <th>Pret/buc</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.comanda).map((val, index) => {
            if (val !== "finalizata" && val !== "istoric")
              return (
                <tr key={index}>
                  <td>{val}</td>
                  <td>{props.comanda[val][0]}</td>
                  <td>{props.comanda[val][1]} RON</td>
                </tr>
              );
            else return null;
          })}
          <tr>
            <th scope="row">Total</th>
            <td></td>
            <td>{total} RON</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
