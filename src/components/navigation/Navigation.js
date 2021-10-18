import React from "react";
import styles from "./Navigation.module.css";
import {NavLink, useHistory} from "react-router-dom";
import logo from "../../assets/logo-192x192.png"

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
        <NavLink to="/" exact activeClassName="current" >
          <li className={styles["list-item"]}>Home</li>
        </NavLink>
        {isAuth === true ?
          <>
            <NavLink to="/player" activeClassName="current" >
              <li className={styles["list-item"]}>Player</li>
            </NavLink>

            <NavLink to="/profile" activeClassName="current" >
              <li className={styles["list-item"]}>Profile</li>
            </NavLink>
            <li>
              <button type="button" onClick={signOut}>
                Logout
              </button>
            </li>
          </> :
          <>
            <NavLink to="/register" activeClassName="current">
              <li className={styles["list-item"]}>Register</li>
            </NavLink>
            <NavLink to="/login" activeClassName="current">
              <li className={styles["list-item"]}>Login</li>
            </NavLink>
          </>
        }
      </ul>

    </header>
  );
}

export default Navigation;