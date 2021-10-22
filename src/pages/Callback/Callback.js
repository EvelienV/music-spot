import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Video from "../../components/video/Video";
import styles from "./Callback.module.css";

function CallbackPage(props) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recentlyPlayed, setRecentlyPlayed] = useState({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState({})
  // eslint-disable-next-line react/prop-types
  const parsed = queryString.parse(props.location.hash)
  const accessToken = parsed.access_token

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setError(false)
    setLoading(true)
    try {
      const recentlyPlayedPlayer = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
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
    } catch (e) {
      console.error(e)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <>
      {Object.keys(currentlyPlaying).length > 0 && !error && !loading &&
      <div className={styles["currently-playing-container"]}>
        <h1 className={styles["header-currently-playing"]}>Playing now: {currentlyPlaying.item.album.artists[0].name} - {currentlyPlaying.item.name}</h1>
          <Video
            key={currentlyPlaying.item.href}
            trackName={currentlyPlaying.item.name}
            trackArtist={currentlyPlaying.item.album.artists[0].name}
            iframeWidth="896px"
            iframeHeight="500px"
          />
      </div>
      }

      {Object.keys(recentlyPlayed).length > 0 && !error && !loading &&
        <div className={styles["videos-container"]}>
          <h1 className={styles["header-recently-played"]}>Recently played songs</h1>
          <div className={styles["videos"]}>
            {recentlyPlayed.items.map((recentPlay) => {
              return (
                <>
                  <div className={styles["recently-played"]}>
                    <Video
                      key={recentPlay.track.id}
                      trackName={recentPlay.track.name}
                      trackArtist={recentPlay.track.artists[0].name}
                      iframeWidth="300px"
                      iframeHeight="168px"
                    />
                    <p className={styles["artist-name"]}>{recentPlay.track.artists[0].name}</p>
                    <p className={styles["track-name"]}>{recentPlay.track.name}</p>

                  </div>

                </>
              )
            })}
          </div>
        </div>
      }

      {error &&
        <p>Error</p>

      }

      {loading &&
      <p>Error</p>

      }
    </>
  );
}

export default withRouter(CallbackPage);