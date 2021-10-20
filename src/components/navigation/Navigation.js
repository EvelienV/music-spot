import React, {useContext} from "react";
import styles from "./Navigation.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../assets/logo-192x192.png"
import {AuthContext} from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
function Navigation() {
  const data = useContext(AuthContext)

  return (
    <header>
      <div>
        <img src={logo}
             alt="logo"
             className={styles["logo"]}/>
      </div>
      <ul>
        <NavLink exact to="/home" activeClassName="current" >
          <li className={styles["list-item"]}>Home</li>
        </NavLink>
        {data.isAuth === true &&
          <>
            <NavLink to="/profile" activeClassName="current">
              <li className={styles["list-item"]}>Profile</li>
            </NavLink>
            <li className={styles["list-item"]}>
              <button type="button" onClick={data.logoff}>
                LOGOUT
              </button>
            </li>
          </>
        }

        {data.isAuth === false &&
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