import React, {useEffect, useState} from "react";
import axios from "axios";
import "lite-youtube-embed/src/lite-yt-embed.css";
import "lite-youtube-embed/src/lite-yt-embed.js";

// eslint-disable-next-line react/prop-types
function Video({trackName, trackArtist}) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoID, setVideoID] = useState()
  const [videoImage, setVideoImage] = useState()

  useEffect(() => {
    fetchVideoId()
  }, [])



  async function fetchVideoId() {
    setError(false)
    setLoading(true)
    try {
      const videoListTrack = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${trackName}%20${trackArtist}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, {
        headers: {}
      })
      setVideoID(videoListTrack.data.items[0].id.videoId)
      setVideoImage(videoListTrack.data.items[0].snippet.thumbnails.high.url)
      console.log(videoListTrack)
    } catch (e) {
      console.log(e.response.data.error.message)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <>
      {loading === true &&
      <p>Loading...</p>}

      {loading === false && error === false &&


      <lite-youtube videoid={videoID} className="background-image"
                    style={{backgroundImage: {videoImage}}}
      >
        <button type="button" className="lty-playbtn">
          <span className="lyt-visually-hidden">Play Video: {trackName} {trackArtist}</span>
        </button>
      </lite-youtube>

      }

      {error === true
      &&
      <lite-youtube videoid={videoID} className="background-image"
                    style={{backgroundImage: {videoImage}}}>
        <button type="button" className="lty-playbtn">
          <span className="lyt-visually-hidden">Play Video: {trackName} {trackArtist}</span>
        </button>
      </lite-youtube>
      }
    </>
  );
}

export default Video;
