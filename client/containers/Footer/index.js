import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withScroll from 'utils/scroll';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import Faq from 'components/Faq';
import EstimateForm from 'components/EstimateForm';
import styles from './index.css';

@withRouter
@withScroll
export default class Footer extends Component {
  state = {};

  getScrollAnimatedStyles({ startOffset }) {
    if (!this.creditRef) return {};

    const elementOffsetTop = this.creditRef.offsetTop;
    const viewportHeight = window.innerHeight;
    const elementHeight = this.creditRef.clientHeight;
    const distance = (this.props.scrollPosition + viewportHeight) - elementOffsetTop;
    const distancePercentage = distance / elementHeight;

    if (distancePercentage < -2) {
      return {
        transform: `translateY(${startOffset}px)`,
        opacity: 0,
      }
    };

    const translateY = (1 - distancePercentage) * startOffset;
    const opacity = distancePercentage;
    return {
      transform: `translateY(${translateY}px)`,
      opacity,
    };
  }

  render() {
    const { location, scrollPosition } = this.props;

    const creditStyles = this.getScrollAnimatedStyles({ startOffset: -100 });

    return (
      <footer className={styles.container}>
        <EstimateForm show={location.pathname !== 'invoice' && location.pathname !== 'estimate'} />
        <Faq />

        <nav className={styles.nav}>
          {/* <div className={styles.navItems}>
            <Link to="/design" className={styles.navItem}>UX Design</Link>
            <Link to="/design" className={styles.navItem}>Front-End Development</Link>
            <Link to="/design" className={styles.navItem}>Team Training</Link>
            <Link to="/design" className={styles.navItem}>Ecommerce</Link>
            <Link to="/design" className={styles.navItem}>Web Apps</Link>
            <Link to="/design" className={styles.navItem}>Brand Sites</Link>
            <Link to="/design" className={styles.navItem}>PortfoLinko</Link>
            <Link to="/design" className={styles.navItem}>About</Link>
            <Link to="/design" className={styles.navItem}>Get a Estimate</Link>
          </div> */}
          <SocialIcons large className={styles.icons} />
        </nav>
        <div className={styles.pixelFade} />

        <div className={styles.credit} ref={(el) => this.creditRef = el} style={creditStyles}>
          <div className={styles.slogan}>Impress your online audience</div>
          <div className={styles.signature}>
            <Logo className={styles.logo} />
            <div>Julian Jorgensen</div>
          </div>
        </div>
      </footer>
    );
  }
}
