import React from "react";
import "./Video.css"

// eslint-disable-next-line react/prop-types
function Video({trackName, trackArtist}) {
  const videoId = "y8trd3gjJt0";

  return (
    <div className="video">
      <iframe title="title"
              src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0"
              allowFullScreen
      >
      </iframe>
      <p className="artist-name">{trackArtist}</p>
      <p className="track-name">{trackName}</p>
    </div>
  );
}

export default Video;
