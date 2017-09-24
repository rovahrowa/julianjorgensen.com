import React from 'react';
import moment from 'moment';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'components/Button';

import styles from './index.css';
import ChartIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/chart-bar.svg';
import DocIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/list.svg';

export default class TimeEntryDetails extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    let {
      active
    } = this.state;
    let {
      item
    } = this.props;

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
                { label: "Close", onClick: this.handleToggle }
              ]}
              active={active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              className={styles.modal}
            >
              <iframe src={`https://toggl.com/app/bookmark/${item.metadata.report}`} width="100%" height="600px" allowFullScreen />
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
    )
  }
}
