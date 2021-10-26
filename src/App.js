import React from "react";
import './App.css';
import Navigation from "./components/navigation/Navigation";
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import CallbackPage from "./pages/Callback/Callback";
import ProfilePage from "./pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Navigation/>
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
        <Route path="/callback">
          <CallbackPage/>
        </Route>
        <Route path="/profile">
          <ProfilePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

