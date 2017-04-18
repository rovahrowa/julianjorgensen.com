import React from 'react';
import {Link, IndexLink} from 'react-router';

import styles from './Footer.css';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <footer className={styles.container}>
        Footer
      </footer>
    )
  }
}

module.exports = Footer;
