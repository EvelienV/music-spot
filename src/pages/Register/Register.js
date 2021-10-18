import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import styles from "./Register.module.css";
import {Link, useHistory} from "react-router-dom";

function RegisterPage() {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onRegister(data) {
    try {
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
      history.push("/login")
    } catch (e) {
      console.error(e.response)
    }
  }

  return (
    <>
      <div className={styles["small-container"]}>
        <h1 className={styles["small-title"]}>Register to watch the music videos of your recently played music</h1>
        <form onSubmit={handleSubmit(onRegister)}>
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
            type="email"
            {...register("email", {
              required: "Email cannot be empty",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Value should be a valid e-mail address"
              }
            })}
            id="email"
            placeholder="Email address"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
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
          <button className={styles["register-button"]} type="submit">
            Register
          </button>
        </form>
        <p>Do you already have an account? <Link to="/login">Login</Link></p>
      </div>
    </>
  )
}

export default RegisterPage;