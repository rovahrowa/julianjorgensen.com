import React from 'react';
import moment from 'moment-timezone';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'components/Button';

import styles from './index.css';
import ChartIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/chart-bar.svg';

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
        {item.dateRange ?
          <div className={styles.dateRange}>
            <label>Date range</label>
            <date>{moment(item.dateRange[0], 'DD-MM-YYYY').format('MMMM Do YYYY')} - {moment(item.dateRange[1], 'DD-MM-YYYY').format('MMMM Do YYYY')}</date>
          </div>
        : ''}

        {item.report ?
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
              <iframe src={`https://toggl.com/app/bookmark/${item.report}`} width="100%" height="600px" allowFullScreen />
            </Dialog>
          </div>
        : ''}
      </div>
    )
  }
}
