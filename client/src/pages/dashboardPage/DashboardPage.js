import React from "react";
import UserInfo from "./UserInfo.js";
import NavMenu from "./NavMenu.js";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Info from "./Info.js";
import Comenzi from "./Comenzi.js";

export default function DashboardPage() {
  const { path } = useRouteMatch();

  return (
    <div className="container border rounded bg-light my-auto">
      <div className="row d-none d-sm-flex">
        <div className="col-4">
          <div className="row">
            <UserInfo></UserInfo>
          </div>
          <div className="row">
            <NavMenu></NavMenu>
          </div>
        </div>
        <div className="col-8">
          <Switch>
            <Route exact path={path + "/info"}>
              <Info></Info>
            </Route>
            <Route path={path + "/comenzi"}>
              <Comenzi></Comenzi>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="d-sm-none d-block">
        <div className="d-flex bg-white">
          <UserInfo></UserInfo>
          <NavMenu></NavMenu>
        </div>
        <div className="container-fluid border-top pt-4">
          <Switch>
            <Route exact path={path + "/info"}>
              <Info></Info>
            </Route>
            <Route path={path + "/comenzi"}>
              <Comenzi></Comenzi>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
