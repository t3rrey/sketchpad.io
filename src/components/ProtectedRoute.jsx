import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, props }) => {
  const isAuth = localStorage.getItem("sessionToken");
  console.log(isAuth);

  return (
    <Route
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
