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
    return (<div></div>)
  }
}
