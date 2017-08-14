import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';

import styles from './index.css';

export default class Calendly extends React.Component{
  constructor(){
    super();

    this.state = {
      active: false
    };
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <div>
        <Button label='Schedule time with me' onClick={this.handleToggle} className={styles.ctaButton} raised primary />
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
