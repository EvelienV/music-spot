import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./Home.module.css"

function HomePage() {

  function login() {
    window.open(`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-recently-played%20user-modify-playback-state%20user-read-currently-playing`,"_self")
  }

  return (
    <>
      <div className={styles["container"]}>
        <h1 className={styles["header-left"]}>Welcome</h1>
        <p>With this application you can play  YouTube music video&apos;s from your recently played tracks on Spotify </p>
        <h2>How does that work?</h2>
        <ol>
          <li>
            Register and login on this application
          </li>
          <li>
            Give permission to us to get your recently played tracks from Spotify
          </li>
          <li>
            We&apos;ll get your 50 most recently listened tracks and search for the music video on YouTube
          </li>
          <li>
            You can click play and have some fun!
          </li>
        </ol>
        <button className={styles["spotify-button"]} onClick={login}>Give access to Spotify</button>
      </div>

    </>

  )
}

export default withRouter(HomePage);

