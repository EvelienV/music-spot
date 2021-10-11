import React from "react";
import styles from "./Navigation.module.css";
import {NavLink, useHistory} from "react-router-dom";
import logo from "../../public/logo-192x192.png"

// eslint-disable-next-line react/prop-types
function Navigation({ isAuth, toggleAuth }) {
  const history = useHistory();

  function signOut() {
    toggleAuth(false)
    history.push('/')
  }

  return (
    <header>
      <div>
        <img src={logo}
             alt="logo"
             className={styles["logo"]}/>
      </div>
      <ul>
        <NavLink to="/" exact>
          <li className={styles["link"]}>Home</li>
        </NavLink>
        {isAuth === true ?
          <>
            <NavLink to="/player">
              <li className={styles["link"]}>Player</li>
            </NavLink>

            <NavLink to="/profile">
              <li className={styles["link"]}>Profile</li>
            </NavLink>
            <li>
              <button type="button" onClick={signOut}>
                Logout
              </button>
            </li>
          </> :
          <>
            <NavLink to="/register">
              <li className={styles["link"]}>Register</li>
            </NavLink>
            <NavLink to="/login">
              <li className={styles["link"]}>Login</li>
            </NavLink>
          </>
        }
      </ul>

    </header>
  );
}

export default Navigation;