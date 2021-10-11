import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {withRouter} from "react-router-dom"; //useHistory
import axios from "axios";
import Video from "../../components/video/Video";
import styles from "./Callback.module.css";

function CallbackPage(props) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recentlyPlayed, setRecentlyPlayed] = useState({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState({})
  // eslint-disable-next-line react/prop-types
  const parsed = queryString.parse(props.location.hash)
  const accessToken = parsed.access_token

  async function fetchData() {
    setError(false)
    setLoading(true)
    try {
      const recentlyPlayedPlayer = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=15`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      setRecentlyPlayed(recentlyPlayedPlayer.data)
      const nowPlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      setCurrentlyPlaying(nowPlaying.data)
      console.log(currentlyPlaying)
      setLoading(false)
    } catch (e) {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles["videos-container"]}>
      {Object.keys(recentlyPlayed).length > 0 &&
        <>
          <h1 className={styles["header-left"]}>Recently played songs</h1>
          <div className={styles["videos"]}>
            {recentlyPlayed.items.map((recentPlay) => {
              return <Video
                key={recentPlay.track.id}
                trackName={recentPlay.track.name}
                trackArtist={recentPlay.track.artists[0].name}
              />
            })}
          </div>
        </>
      }
      </div>
      <button type="button" onClick={fetchData}>
        Haal de nummers op
      </button>
    </>
  );
}

export default withRouter(CallbackPage);