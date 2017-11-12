import React from 'react';
import YouTube from 'react-youtube';

export default ({
  onReady,
  onPlay,
  styles,
}) => (
  <YouTube
    videoId="8SHDyLNd0Cw"
    className={styles}
    opts={{
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
      },
    }}
    onReady={onReady}
    onPlay={onPlay}
  />
);
