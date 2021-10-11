import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Login.module.css";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  async function onLogin(data) {
    const test = await axios.get('https://polar-lake-14365.herokuapp.com/api/test/all');
    console.log(test)
    const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin', {
      username: 'test',
      password: '123456',
    }, {
      'Content-Type': 'application/json'
    });
    console.log(result)
    console.log(data)
  }

  return (
    <>
      <div className={styles["small-container"]}>
        <h1 className={styles["small-title"]}>Login to watch the music videos of your recently played music</h1>
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            type="text"
            {...register("username", {
              required: "required",
            })}
            id="username"
            placeholder="Username"
          />
          <input
            type="text"
            {...register("password", {
              required: "required",
            })}
            id="password"
            placeholder="Password"
            required="required"
          />
          <button className={styles["login-button"]} type="submit">
            Login
          </button>
        </form>
      </div>
    </>

  )
}

export default LoginPage;