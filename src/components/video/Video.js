import React, {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Video({trackName, trackArtist, iframeWidth, iframeHeight, className }) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoID, setVideoID] = useState()

  useEffect(() => {
    console.log(trackArtist, trackName, videoID)
    setError(false)
    setLoading(true)
    if(!videoID) {
      fetchVideoId()
    }
    setLoading(false)
  }, [])

  async function fetchVideoId() {
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

      <iframe title="title"
              src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0"
              width={iframeWidth}
              height={iframeHeight}
              allowFullScreen
      >
      </iframe>
    }

    {error === true
    &&
        <iframe title="title"
                src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0"
                width={iframeWidth}
                height={iframeHeight}
                allowFullScreen
        >
        </iframe>
    }
    </>
  );
}

export default Video;
