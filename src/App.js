import React from "react";
import "./styles/App.css";
import LogIn from "./components/landing-site/LogIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Draw from "./components/Draw";
import Header from "./components/landing-site/Header";
import InfoBox from "./components/landing-site/InfoBox";
import SquareParticles from "./components/SquareParticles";

export default function App() {
  return (
    <Router>
      <Switch>
        <div className="app-main">
          <Route exact path="/">
            <Header />
            <InfoBox />
          </Route>
          <Route path="/login" component={LogIn}></Route>
          <Route path="/app" component={Draw}></Route>
          <Route path="/tp">
            <SquareParticles />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}
