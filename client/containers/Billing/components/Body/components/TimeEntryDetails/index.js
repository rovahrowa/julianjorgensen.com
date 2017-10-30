import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'components/Button';
import ChartIcon from 'assets/icons/FontAwesome/light/chart-bar.svg';
import DocIcon from 'assets/icons/FontAwesome/light/list.svg';
import styles from './index.css';

export default class TimeEntryDetails extends Component {
  state = {
    active: false,
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  render() {
    const { active } = this.state;
    const { item } = this.props;

    return (
      <div className={styles.container}>
        {item.metadata.report ?
          <div>
            <Button small className={styles.button} onClick={this.handleToggle}>
              <ChartIcon className={styles.icon} />
              <small>See full time-entry report</small>
            </Button>

            <Dialog
              actions={[
                { label: 'Close', onClick: this.handleToggle }
              ]}
              active={active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              className={styles.modal}
            >
              <iframe title="Invoice time-entry details" src={`https://toggl.com/app/bookmark/${item.metadata.report}`} width="100%" height="600px" allowFullScreen />
            </Dialog>
          </div>
        : ''}

        {item.metadata.estimate ?
          <div className={styles.linkedEstimate}>
            <Button href={`/estimate/${item.metadata.estimate}`} target="new" small className={styles.button}>
              <DocIcon className={styles.icon} />
              <small>See linked estimate</small>
            </Button>
          </div>
        : ''}

      </div>
    );
  }
}
