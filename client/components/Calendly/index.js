import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'components/Button';
import { withScroll } from 'react-window-decorators';
import styles from './index.css';

@withScroll
@connect(({ site }) => ({
  site,
}))
export default class Calendly extends Component {
  constructor() {
    super();

    this.state = {
      showButton: true,
    };
  }

  handleToggle = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'TOGGLE_SCHEDULING' });
  }

  render() {
    const { site, scrollPosition } = this.props;
    if (scrollPosition < 1000) return false;

    return (
      <div className={`${styles.container} ${this.state.showButton ? styles.showButton : ''}`}>
        <Button
          label="Schedule a free consultation"
          onClick={this.handleToggle}
          className={styles.ctaButton}
        />
        <Dialog
          active={site.showScheduling}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          className={styles.modal}
        >
          <iframe title="Julian Jorgensen Calendly" src="https://calendly.com/julianjorgensen/consultation" width="100%" height="600px" allowFullScreen />
        </Dialog>
      </div>
    );
  }
}
