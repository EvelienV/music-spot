import React from "react";
import { withRouter } from "react-router-dom";

function HomePage() {

  function login() {
    window.open(`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-recently-played%20user-modify-playback-state%20user-read-currently-playing`,"_self")
  }

  //TODO: current playing, pause, play, shuffle, next , previous

  // Search on youtube > GET https://www.googleapis.com/youtube/v3/search // quota costs 100 units
  // type: video, part:snippet, q: artist name, track name
  // response object items.id.videoId

  return (
    <>
      //Als gebruiker is ingelogd bij novi backend en nog geen spotify authorisatie heeft gegeven

      <h1>Welcome</h1>
      <button onClick={login}>Geef toegang tot jouw spotify acount</button>

      // als gebruiker is ingelogd bij novi backend en ook een spotify authorisatie heeft

    </>

  )
}

export default withRouter(HomePage);

