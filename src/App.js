import React from "react";
import "./styles/App.css";
import LogIn from "./components/landing-site/LogIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Draw from "./components/Draw";
import Header from "./components/landing-site/Header";
import InfoBox from "./components/landing-site/InfoBox";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {
  return <Draw />;
}
