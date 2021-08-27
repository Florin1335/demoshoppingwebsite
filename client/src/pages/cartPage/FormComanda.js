import React, { useEffect, useState } from "react";

export default function FormComanda(props) {
  const [userData, setUserData] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    judet: "",
    oras: "",
    adresa: "",
  });

  useEffect(() => {
    props.updateUserData(userData);
  }, [userData]);

  return (
    <form>
      <input
        className="text-center form-control"
        placeholder="Nume"
        value={userData.nume}
        onChange={(e) =>
          setUserData((prevState) => ({ ...prevState, nume: e.target.value }))
        }
      ></input>
      <input
        className="text-center form-control mt-1"
        placeholder="Prenume"
        value={userData.prenume}
        onChange={(e) =>
          setUserData((prevState) => ({
            ...prevState,
            prenume: e.target.value,
          }))
        }
      ></input>
      <input
        className="text-center form-control mt-1"
        placeholder="Telefon"
        value={userData.telefon}
        onChange={(e) =>
          setUserData((prevState) => ({
            ...prevState,
            telefon: e.target.value,
          }))
        }
      ></input>
      <input
        className="text-center form-control mt-1"
        placeholder="Județ"
        value={userData.judet}
        onChange={(e) =>
          setUserData((prevState) => ({ ...prevState, judet: e.target.value }))
        }
      ></input>
      <input
        className="text-center form-control mt-1"
        placeholder="Oraș"
        value={userData.oras}
        onChange={(e) =>
          setUserData((prevState) => ({ ...prevState, oras: e.target.value }))
        }
      ></input>
      <textarea
        className="text-center form-control mt-1"
        placeholder="Adresa"
        value={userData.adresa}
        onChange={(e) =>
          setUserData((prevState) => ({ ...prevState, adresa: e.target.value }))
        }
      ></textarea>
    </form>
  );
}
