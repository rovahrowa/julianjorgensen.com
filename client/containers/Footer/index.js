import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withScroll from 'utils/scroll';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import Faq from 'components/Faq';
import EstimateForm from 'containers/EstimateForm';
import pixelFade from 'assets/images/pixels-fade.png';
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
    const creditStyles = this.getScrollAnimatedStyles({ startOffset: -100 });

    const renderEstimateForm = () => {
      if (!this.props.estimate) return false;
      return <EstimateForm />;
    };

    const renderFAQ = () => {
      if (!this.props.faq) return false;
      return <Faq />;
    };

    return (
      <footer className={styles.wrapper}>
        <div className={styles.container}>
          {renderEstimateForm()}
          {renderFAQ()}

          <nav className={styles.nav}>
            <SocialIcons large className={styles.icons} />
          </nav>
        </div>
        <div className={styles.pixelFade} style={{ backgroundImage: `url(${pixelFade})` }} />

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
