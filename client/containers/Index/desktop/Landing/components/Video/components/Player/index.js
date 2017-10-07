import React from 'react';
import YouTube from 'react-youtube';

export default function Player({ onReady, styles }) {
  console.log('importing the player...');
  return <YouTube
      videoId="_OJzg063OyI"
      className={styles}
      opts={{
        playerVars: { 
          autoplay: 0,
          modestbranding: 1,
          showinfo: 0,
          rel: 0
        }
      }}
      onReady={onReady}
    />
}
