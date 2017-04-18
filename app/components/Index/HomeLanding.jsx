import React from 'react';

import Button from 'react-toolbox/lib/button';
import styles from './HomeLanding.css';

class HomeLanding extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>This is the home landing page!</h1>
        <Button label="Test Button" raised accent />
      </div>
    )
  }
}

module.exports = HomeLanding;
