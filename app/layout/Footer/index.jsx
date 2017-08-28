import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Logo from 'components/Logo';
import { Parallax } from 'react-scroll-parallax';

// icons
import 'assets/icons/brands/github.svg';
import 'assets/icons/brands/linkedin-in.svg';
import 'assets/icons/brands/angellist.svg';

// styles
import styles from './index.css';

@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class Footer extends React.Component {
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

          <div className={styles.icons}>
            <a href='https://github.com/julianjorgensen' target='new' className={`${styles.icon} ${styles.github}`}></a>
            <a href='https://www.linkedin.com/in/julian-jorgensen-9a889b73' target='new' className={`${styles.icon} ${styles.linkedin}`}></a>
            <a href='https://angel.co/julianjorgensen' target='new' className={`${styles.icon} ${styles.angellist}`}></a>
          </div>
        </nav>
        <div className={styles.pixelFade}>
        </div>

        <Parallax
            className={styles.credit}
            offsetYMax={1800}
            offsetYMin={-400}
            slowerScrollRate
            tag="div"
        >
          <div className={styles.slogan}>Life's Good</div>
          <div className={styles.signature}>
            <Logo size={25} className={styles.logo} color='white' />
            <div>Julian Jorgensen</div>
          </div>
        </Parallax>
      </footer>
    )
  }
}
