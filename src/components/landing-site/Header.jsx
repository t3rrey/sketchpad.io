import React from "react";
import logo from "../../img/slogo1.png";
import "../../styles/header.css";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <div className="main-header-wrapper">
      <Link to="/login">
        <button className="main-signin-button">Sign In</button>
      </Link>
      <h1 className="main-logo">sketchd.io</h1>
      <div className="svg-wrap">
        <svg
          className="svg-test"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#273036"
            fill-opacity="1"
            d="M0,224L15,208C30,192,60,160,90,170.7C120,181,150,235,180,261.3C210,288,240,288,270,282.7C300,277,330,267,360,229.3C390,192,420,128,450,138.7C480,149,510,235,540,266.7C570,299,600,277,630,240C660,203,690,149,720,149.3C750,149,780,203,810,218.7C840,235,870,213,900,192C930,171,960,149,990,144C1020,139,1050,149,1080,176C1110,203,1140,245,1170,229.3C1200,213,1230,139,1260,106.7C1290,75,1320,85,1350,112C1380,139,1410,181,1425,202.7L1440,224L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default header;
