import React from "react";
import "./App.css";
import Header from "./components/landing-site/Header";
import InfoBox from "./components/landing-site/InfoBox";

export default function app() {
  return (
    <div className="app-main">
      <Header />
      <InfoBox />
    </div>
  );
}
