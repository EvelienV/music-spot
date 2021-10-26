import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import styles from "./Register.module.css";
import {Link, useHistory} from "react-router-dom";

function RegisterPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory();
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onBlur"
  });

  async function onRegister(data) {
    setError(false)
    setLoading(true)

    try {
      await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
        role: ["user"],
      }, {
        'Content-Type': 'application/json'
      });
      history.push("/login")
    } catch (e) {
      console.error(e.response.data.message)
      setError(true)
      setErrorMessage(e.response.data.message)
    }
    setLoading(false)
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
          {error && <h3 className="error-message">{errorMessage}</h3>}
          <button className={styles["register-button"]} type="submit" disabled={loading}>
            Register
          </button>
        </form>
        <p>Do you already have an account? <Link to="/login">Login</Link></p>
      </div>
    </>
  )
}

export default RegisterPage;