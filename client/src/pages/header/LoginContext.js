import React, { createContext, useEffect, useState } from "react";
export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    fetch(`/autentificare`, {
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
