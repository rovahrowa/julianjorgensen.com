import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import Faq from 'components/Faq';
import EstimateForm from 'containers/EstimateForm';
import pixelFade from 'assets/images/pixels-fade.png';
import styles from './index.css';

@withRouter
export default class Footer extends Component {
  state = {};

  render() {
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

        <div className={styles.credit}>
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
