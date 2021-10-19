import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({})

// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending"
  })

  useEffect(() => {
    console.log(isAuth)
    const token = localStorage.getItem("token")
    console.log(token)
    if (!isAuth.user && token) {
      fetchUserData(token)
    } else if (isAuth.user && token) {
      console.log("klaar")
    } else {
      setIsAuth({
        ...isAuth,
        user: null,
        status: "done"
      })
    }
  })

  function login(data) {
    localStorage.setItem("token", data.accessToken)
    setIsAuth({
      isAuth: true,
      user: {
        username: data.username,
        email: data.email,
        id: data.id,
      },
      status: "done"
    });
    history.push("/")
  }

  async function fetchUserData(token) {
    try {
      const result = await axios.get("https://polar-lake-14365.herokuapp.com/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(result.data.username)
      console.log(result.data.email)
      console.log(result.data.id)

      setIsAuth({
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id,
        },
        status: "done"
      });
    } catch (e) {
      console.error(e)
    }
  }

  function logoff() {
    setIsAuth({
      ...isAuth,
      isAuth: false
    })
    history.push("/home")
  }

  const data = {
    login: login,
    logoff: logoff,
    ...isAuth
  }

  return (
    <AuthContext.Provider value={data}>
      { isAuth.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;