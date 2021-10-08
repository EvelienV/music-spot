import React from "react";
import "./Navigation.css";
import {NavLink, useHistory} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Navigation({ isAuth, toggleAuth }) {
  const history = useHistory();

  function signOut() {
    toggleAuth(false)
    history.push('/')
  }

  return (
    <header>
      <ul>
        <NavLink to="/" exact>
          <li className="link">Home</li>
        </NavLink>
        {isAuth === true ?
          <>
            <NavLink to="/player">
              <li className="link">Player</li>
            </NavLink>

            <NavLink to="/profile">
              <li className="link">Profile</li>
            </NavLink>
            <li>
              <button type="button" onClick={signOut}>
                Logout
              </button>
            </li>
          </> :
          <>
            <NavLink to="/register">
              <li className="link">Register</li>
            </NavLink>
            <NavLink to="/login">
              <li className="link">Login</li>
            </NavLink>
          </>
        }
      </ul>

    </header>
  );
}

export default Navigation;