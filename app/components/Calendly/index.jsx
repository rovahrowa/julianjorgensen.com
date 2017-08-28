import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';
import styles from './index.css';

@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class Calendly extends React.Component{
  constructor(){
    super();

    this.state = {
      active: false,
      show: false
    };
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  componentWillUpdate() {
    if (this.props.scroll > 1000 && !this.state.show){
      this.setState({
        show: true
      });
    }
  }

  render() {
    return (
      <div className={`${styles.container} ${this.state.show ? styles.show : ''}`}>
        <Button label='Schedule a free consultation' onClick={this.handleToggle} className={styles.ctaButton} raised primary />
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          className={styles.modal}
        >
          <iframe src="https://calendly.com/julianjorgensen/30min" width="100%" height="600px" allowFullScreen />
        </Dialog>
      </div>
    )
  }
}
