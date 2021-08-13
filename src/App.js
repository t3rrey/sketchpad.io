import React from "react";
import Particles from "./components/landing-site/Particles";
import "./App.css";
import LogIn from "./components/landing-site/LogIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Draw from "./components/Draw";
import Header from "./components/landing-site/Header";
import InfoBox from "./components/landing-site/InfoBox";

export default function app() {
  return (
    <Router>
      <Switch>
        <div className="app-main">
          <Route exact path="/">
            <Header />
            <InfoBox />
          </Route>
          <Route path="/login">
            <LogIn />
            <Particles />
          </Route>
          <Route path="/app">
            <Draw />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}
