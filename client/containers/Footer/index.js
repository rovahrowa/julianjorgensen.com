import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { navActions } from 'actions';
import Button from 'components/Button';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import Faq from 'components/Faq';
import EstimateForm from 'containers/EstimateForm';
import pixelFade from 'assets/images/pixels-fade.png';
import styles from './index.css';

@withRouter
@connect()
export default class Footer extends Component {
  state = {};

  toggleContact = () => {
    const { dispatch } = this.props;
    dispatch(navActions.toggleContact());
  }

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
            <Button className={styles.contact} onClick={this.toggleContact} small label="Contact me" />
            <SocialIcons large className={styles.icons} />
          </nav>
        </div>
        <div className={styles.pixelFade} style={{ backgroundImage: `url(${pixelFade})` }} />

        <div className={styles.credit}>
          <div className={styles.slogan}>Impress your users</div>
          <div className={styles.signature}>
            <Logo className={styles.logo} />
            <div>Julian Jorgensen</div>
          </div>
        </div>
      </footer>
    );
  }
}
