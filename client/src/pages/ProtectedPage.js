import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "./header/LoginContext.js";

export default function ProtectedPage({ children, ...rest }) {
  const [isAuth] = useContext(LoginContext);
  return (
    <Route {...rest}>
      {isAuth ? children : <Redirect to="/autentificare"></Redirect>}
    </Route>
  );
}
