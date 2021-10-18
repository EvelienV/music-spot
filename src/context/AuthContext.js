import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
  const history = useHistory()
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending"
  })

  // function login(token) {
  //   localStorage.setItem("token", token)
  //   const userId =
  // }
}