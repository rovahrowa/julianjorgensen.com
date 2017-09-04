import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'react-toolbox/lib/dialog';
import Button from 'components/Button';
import styles from './index.css';

@connect(
  ({ scrollPosition, site }) => ({
    scroll: scrollPosition.y,
    site
  })
)
export default class Calendly extends React.Component{
  constructor(){
    super();

    this.state = {
      active: false,
      showButton: false
    };
  }

  handleToggle = () => {
    let { dispatch } = this.props;
    dispatch({type: 'TOGGLE_SCHEDULING'});
  }

  componentWillUpdate() {
    if (this.props.scroll > 1000 && !this.state.showButton){
      this.setState({
        showButton: true
      });
    }
  }

  render() {
    let { site } = this.props;

    return (
      <div className={`${styles.container} ${this.state.showButton ? styles.showButton : ''}`}>
        <Button
          label='Schedule a free consultation'
          onClick={this.handleToggle}
          className={styles.ctaButton}
          raised
        />
        <Dialog
          active={site.showScheduling}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          className={styles.modal}
        >
          <iframe src="https://calendly.com/julianjorgensen/consultation" width="100%" height="600px" allowFullScreen />
        </Dialog>
      </div>
    )
  }
}
