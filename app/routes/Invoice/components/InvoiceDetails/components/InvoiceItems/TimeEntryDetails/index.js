import React from 'react';
import axios from 'axios';
import fileDownload from 'react-file-download';
import { Document, Page } from 'react-pdf'

import moment from 'moment-timezone';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

import styles from './index.css';

import ChartIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/chart-bar.svg';

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

export default class TimeEntryDetails extends React.Component {
  state = {
    pdfData: ''
  }

  fetchReport = () => {
    axios.get('/api/toggl/get-report', {
      responseType: 'arraybuffer'
    }).then((response) => {
      let pdfData = response.data;
      console.log('response', response);
      this.setState({pdfData});
    });
  };

  render() {
    let { pdfData } = this.state;
    let { invoice } = this.props;

    return (
      <div className={styles.container} onClick={this.fetchReport}>
        <ChartIcon className={styles.icon} />
        <small>See the full time-entry report</small>
        {pdfData ?
          <Document file={{data: pdfData}}>
            <Page
              pageNumber={1}
            />
          </Document> : ''
        }
      </div>
    )
  }
}
