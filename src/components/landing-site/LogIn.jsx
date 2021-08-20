import React from "react";
import { useState } from "react";
import "../../styles/App.css";
import Particles from "./ParticlesBackground";
import { useHistory } from "react-router-dom";

function LogIn() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="login-container-main">
      <div className="lc">
        <form className="login-form" action="submit" onSubmit={handleLogin}>
          <h1 onClick={() => history.push("/")} className="lf-main-heading">
            sketchd
          </h1>
          <h2 className="lf-main-subHeading">SIGN IN</h2>
          <input
            className="login-input-main"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="login-input-main"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChangePassword}
          />
          <input type="submit" />
        </form>
      </div>

      <Particles />
    </div>
  );
}

export default LogIn;
