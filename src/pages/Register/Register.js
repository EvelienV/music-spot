import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import styles from "./Register.module.css";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  async function onRegister(data) {
    const test = await axios.get('https://polar-lake-14365.herokuapp.com/api/test/all');
    console.log(test)
    const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup', {
      username: data.username,
      email: data.email,
      password: data.password,
      role: ["user"],
    }, {
      'Content-Type': 'application/json'
    });
    console.log(result)
    console.log(data)
  }

  return (
    <>
      <div className={styles["small-container"]}>
        <h1 className={styles["small-title"]}>Register to watch the music videos of your recently played music</h1>
        <form onSubmit={handleSubmit(onRegister)}>
          <input
            type="text"
            {...register("username", {
              required: "required",
            })}
            id="username"
            placeholder="Username"
          />
          <input
            type="email"
            {...register("email", {
              required: "required",
            })}
            id="email"
            placeholder="Email address"
            required="required"
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
          <button className={styles["register-button"]} type="submit">
            Register
          </button>
          //TODO: Na klikken op registreren en succes door naar login page
        </form>
      </div>
    </>
  )
}

export default RegisterPage;