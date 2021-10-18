import React, {useEffect, useState} from "react";
import styles from "./Video.module.css"
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Video({trackName, trackArtist, className}) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoID, setVideoID] = useState()

  useEffect(() => {
    fetchVideoId()
  }, [])

  async function fetchVideoId() {
    setError(false)
    setLoading(true)
    try {
      const videoListTrack = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${trackName}%20${trackArtist}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,{
        headers: {}
        })
      setVideoID(videoListTrack.data.items[0].id.videoId)
    } catch (e) {
      console.log(e.response.data.error.message)
      setError(true)

    }
    setLoading(false)
  }

  return (
    <>
    { loading === true &&
    <p>Loading...</p>}

    { loading === false && error === false &&
    <div className={styles[`{className}`]}>
      <iframe title="title"
              src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0"
              allowFullScreen
      >
      </iframe>
      <p className={styles["artist-name"]}>{trackArtist}</p>
      <p className={styles["track-name"]}>{trackName}</p>
    </div>}

    {error === true
    &&
      <>
        <p>Oops... out of credits</p>
        <p className={styles["artist-name"]}>{trackArtist}</p>
        <p className={styles["track-name"]}>{trackName}</p>
      </>
    }
    </>
  );
}

export default Video;
