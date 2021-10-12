import React from "react";
import { withRouter } from "react-router-dom";

function HomePage() {

  function login() {
    window.open(`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-recently-played%20user-modify-playback-state%20user-read-currently-playing`,"_self")
  }

  //TODO: current playing, pause, play, shuffle, next , previous

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={login}>Geef toegang tot jouw spotify acount</button>
    </>

  )
}

export default withRouter(HomePage);

