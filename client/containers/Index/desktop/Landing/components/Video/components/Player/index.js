import React from 'react';
import ReactYouTube from 'react-youtube';

export default class Player extends React.Component {
  componentWillMount(){
    console.log('mounting player!');
  }
  render() {
    let { onReady, styles } = this.props;
    return <ReactYouTube
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
