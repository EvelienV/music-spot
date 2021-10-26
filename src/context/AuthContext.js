import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({})

// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending"
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserData(token)
    } else {
      setIsAuth({
        isAuth: false,
        user: null,
        status: "done"
      })
    }
  }, [])

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
  }

  async function fetchUserData(token) {
    setError(false)
    setLoading(true)
    try {
      const result = await axios.get("https://polar-lake-14365.herokuapp.com/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
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
      localStorage.removeItem("token")
      setIsAuth({
        isAuth: false,
        user: null,
        status: "done"
      });
      history.push("/")
    }
  }

  function logoff() {
    localStorage.removeItem("token")
    setIsAuth({
      isAuth: false,
      user: null,
      status: "done"
    })
    history.push("/")
  }

  const data = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    login: login,
    logoff: logoff,
  }

  return (
    <AuthContext.Provider value={data}>
      {isAuth.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;