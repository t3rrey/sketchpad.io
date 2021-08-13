import React from "react";
import { useState } from "react";


function LogIn() {
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
    <form className="login-form" action="submit" onSubmit={handleLogin}>
      <input type="email" value={email} onChange={handleChangeEmail} />
      <input type="password" value={password} onChange={handleChangePassword} />
      <input type="submit" />
    </form>
  );
}

export default LogIn;
