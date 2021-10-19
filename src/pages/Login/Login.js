import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Login.module.css";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function LoginPage() {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onLogin(data) {
    try {
      const result = await axios.post("https://polar-lake-14365.herokuapp.com/api/auth/signin", {
        username: data.username,
        password: data.password,
      })
      login(result.data)
      history.push("/home")
    } catch (e) {
      console.error(e.response)
    }
  }

  return (
    <>
      <div className={styles["small-container"]}>
        <h1 className={styles["small-title"]}>Login to watch the music videos of your recently played music</h1>
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            type="text"
            {...register("username", {
              required: "Username cannot be empty"
            })}
            id="username"
            placeholder="Username"
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
          <input
            type="password"
            {...register("password", {
              required: "Password must have at least 6 characters",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters"
              }
            })}
            id="password"
            placeholder="Password"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <button className={styles["login-button"]} type="submit">
            Login
          </button>
        </form>
        <p>Not registered yet? <Link to="/register">Register</Link></p>
      </div>
    </>
  );
}

export default LoginPage;