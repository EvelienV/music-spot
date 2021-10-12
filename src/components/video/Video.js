import React, {useState} from "react";
import styles from "./Video.module.css"
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Video({trackName, trackArtist}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [videoID, setVideoID] = useState();

  async function fetchVideoId() {
    setError(false)
    setLoading(true)
    try {
      const videoListTrack = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${trackName}%20${trackArtist}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,{
        headers: {}
        })
      setVideoID(videoListTrack.data.items[0].id.videoId)
      console.log(videoID)
      setLoading(false)
    } catch (e) {
      setError(true)
      setLoading(false)
    }
  }



  return (
    <div className={styles["video"]}>
      <iframe title="title"
              src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0"
              allowFullScreen
      >
      </iframe>
      <p className={styles["artist-name"]}>{trackArtist}</p>
      <p className={styles["track-name"]}>{trackName}</p>
      <button type="button" onClick={fetchVideoId}>
        Haal de video ID op
      </button>
    </div>


  );
}

export default Video;
