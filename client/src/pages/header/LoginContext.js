import React, { createContext, useEffect, useState } from "react";
import { ip as serverIP } from "../../ip.js";
export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    fetch(`http://${serverIP}/autentificare`, {
      method: "GET",
      credentials: "include",
    })
      .then((value) => value.json())
      .then((value) => setisAuth(value));
  }, []);
  return (
    <LoginContext.Provider value={[isAuth, setisAuth]}>
      {props.children}
    </LoginContext.Provider>
  );
};
