import React from 'react';
import { lazyload } from 'react-lazyload';
import YouTube from 'react-youtube';

@lazyload({
  height: 200,
  once: true
})
export default class Player extends React.Component {
  render() {
    let { onReady, styles } = this.props;
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
}
