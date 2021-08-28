import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./pages/header/Header.js";
import MainPage from "./pages/mainPage/MainPage.js";
import ProductsPage from "./pages/productsPage/ProductsPage.js";
import InfoPage from "./pages/infoPage/InfoPage.js";
import AuthenticationPage from "./pages/authenticationPage/AuthenticationPage.js";
import { LoginContext } from "./pages/header/LoginContext.js";
import React, { useContext } from "react";
import IndividualProductPage from "./pages/productsPage/IndividualProductPage.js";
import Footer from "./pages/footer/Footer";
import Categorii from "./pages/mainPage/Categorii";
import ProtectedPage from "./pages/ProtectedPage";
import DashboardPage from "./pages/dashboardPage/DashboardPage.js";
import CartPage from "./pages/cartPage/CartPage";
import LogoutPage from "./pages/authenticationPage/LogoutPage";
import ActivareCont from "./pages/authenticationPage/ActivareCont";
import SearchPage from "./pages/searchPage/SearchPage";

function App() {
  const [isAuth] = useContext(LoginContext);

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route path="/autentificare">
          {isAuth ? <Redirect to="/" /> : <AuthenticationPage />}
        </Route>
        <Route path="/componente/:categorie/:id/">
          <IndividualProductPage></IndividualProductPage>
        </Route>
        <Route path="/componente/:categorie">
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="/info">
          <InfoPage></InfoPage>
        </Route>
        <Route path="/categorii">
          <Categorii></Categorii>
        </Route>
        <ProtectedPage path="/dashboard">
          <DashboardPage></DashboardPage>
        </ProtectedPage>
        <Route path="/cos">
          <CartPage></CartPage>
        </Route>
        <Route path="/activare_cont/:cod">
          <ActivareCont></ActivareCont>
        </Route>
        <ProtectedPage path="/logout">
          <LogoutPage></LogoutPage>
        </ProtectedPage>
        <Route path="/cautare/:query">
          <SearchPage></SearchPage>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
