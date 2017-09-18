import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from 'components/Logo';
import { Parallax } from 'lib/react-scroll-parallax';

import SocialIcons from 'components/SocialIcons';

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
    let { scroll } = this.props;

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
          { ENV_CONFIG.ENV !== 'production' ?
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
            :
            <div></div>
          }

          <SocialIcons large className={styles.icons} />
        </nav>
        <div className={styles.pixelFade}></div>

        <Parallax
            className={styles.credit}
            offsetYMax={0}
            offsetYMin={800}
            fadeSpeed={1.6}
            tag="div"
        >
          <div className={styles.slogan}>Impress your online audience</div>
          <div className={styles.signature}>
            <Logo className={styles.logo} />
            <div>Julian Jorgensen</div>
          </div>
        </Parallax>
      </footer>
    )
  }
}
