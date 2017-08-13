import React from 'react';
let {connect} = require('react-redux');
import {Link} from 'react-router-dom';
import Logo from 'components/Logo';

import styles from './index.css';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {scroll} = this.props;

    let windowHeight = window.height;
    let creditOpacity = 1;
    let scrollMargin = windowHeight - 200;

    if(scroll.y > scrollMargin){
      creditOpacity = (scroll.y/windowHeight) - 1;
      console.log('windowHeight: ', windowHeight);
      console.log('creditOpacity: ', creditOpacity);
    }

    return (
      <footer className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <Link to='/design' className={styles.navItem}>UX Design</Link>
            <Link to='/design' className={styles.navItem}>Front-End Development</Link>
            <Link to='/design' className={styles.navItem}>Team Training</Link>
            <Link to='/design' className={styles.navItem}>Ecommerce</Link>
            <Link to='/design' className={styles.navItem}>Web Apps</Link>
            <Link to='/design' className={styles.navItem}>Brand Sites</Link>
            <Link to='/design' className={styles.navItem}>PortfoLinko</Link>
            <Link to='/design' className={styles.navItem}>About</Link>
            <Link to='/design' className={styles.navItem}>Get a Estimate</Link>
          </div>
        </nav>

        <div className={styles.credit} style={{opacity: creditOpacity}}>
          <div className={styles.slogan}>Life's Good</div>
          <div className={styles.logo}>
            <Logo fill='#ffffff' width={26} />
            <div>Julian Jorgensen</div>
          </div>
        </div>
      </footer>
    )
  }
}

export default connect(
  (state) => {
    return {
      scroll: state.scrollPosition
    }
  }
)(Footer);
