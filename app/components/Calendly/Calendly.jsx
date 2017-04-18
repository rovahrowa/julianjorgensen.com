import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';
import Iframe from 'react-iframe';

import styles from './Calendly.css';

class Calendly extends React.Component{
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
        <Iframe url="https://calendly.com/julianjorgensen/30min"
                position="absolute"
                width="100%"
                height="100%"
                allowFullScreen/>
        </Dialog>
      </div>
    )
  }
}

module.exports = Calendly;
