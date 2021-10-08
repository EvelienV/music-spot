import React, {useState} from "react";
import './App.css';
import Navigation from "./components/navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import PlayerPage from "./pages/Player/Player";
import CallbackPage from "./pages/Callback/Callback";
import ProfilePage from "./pages/Profile/Profile";

function App() {
  const [ isAuthenticated, toggleIsAuthenticated ] = useState(false)

  return (
    <Router>
      <Navigation isAuth={isAuthenticated} toggleAuth={toggleIsAuthenticated} />
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/register">
          <RegisterPage/>
        </Route>
        <Route path="/player" isAuth={isAuthenticated}>
          <PlayerPage/>
        </Route>
        <Route path="/callback">
          <CallbackPage/>
        </Route>
        <Route path="/user-profile" isAuth={isAuthenticated}>
          <ProfilePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
//Vragen:
// Data API ophalen in App.js of op de pagina waar het nodig is
// Callback page, nodig voor ophalen code, daarna weer naar home? Of home de callback page maken?
// CSS verwarrend dat het globaal werkt, hoe hiermee om te gaan, syling van buttons etc en andere algemene dingen in app.css en verder specifieke klasses?

