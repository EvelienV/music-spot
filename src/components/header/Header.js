import React from "react";
import "./Header.css";
import {NavLink} from "react-router-dom";

function Header() {
  return (
    <header>
      <ul>
        <NavLink to="/" exact>
          <li className="link">Home</li>
        </NavLink>
        <NavLink to="/player">
          <li className="link">Player</li>
        </NavLink>
        <NavLink to="/register">
          <li className="link">Register</li>
        </NavLink>
        <NavLink to="/login">
          <li className="link">Login</li>
        </NavLink>
      </ul>

    </header>
  );
}

export default Header;