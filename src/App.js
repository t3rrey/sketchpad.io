import React from "react";
import Draw from "./components/Draw";
import "./App.css";
import logo from './img/skplogo.png';

export default function () {
  return (
    <div className='app-main'>
      <img className='logo' src={logo} alt="logo" width='500' />
      <Draw />
    </div>
  );
}
