import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import cn from 'classnames';
import Headroom from 'react-headroom';
import { navActions } from 'actions';
import Logo from 'components/Logo';
import styles from './index.css';

@withRouter
@connect(({ nav }) => ({
  nav,
}))
export default class MobileNav extends React.Component {
  constructor() {
    super();

    this.state = {
      navPinned: true,
    };
  }

  handleToggleNav = () => {
    this.props.dispatch(navActions.toggleNav());
  }

  handleNavUnpin = () => {
    this.setState({
      navPinned: false,
    });
  }

  handleNavUnfix = () => {
    this.setState({
      navPinned: true,
    });
  }

  render() {
    const { className, nav } = this.props;
    const pathname = this.props.location.pathname.split('/')[1];

    const wrapperStyles = cn(className, styles.wrapper);
    const headerStyles = cn(styles.header, {
      [styles.active]: nav.show,
      [styles.pinned]: this.state.navPinned,
      [styles.fixed]: !this.state.navPinned,
    });
    const barsStyles = cn(styles.bars, {
      [styles.open]: nav.show,
    });
    const navStyles = cn(styles.nav, {
      [styles.navOpen]: nav.show,
    });

    return (
      <Headroom
        onUnpin={this.handleNavUnpin}
        onUnfix={this.handleNavUnfix}
        upTolerance={1}
        className={wrapperStyles}
      >
        <header className={headerStyles}>
          <Link to="/" className={styles.logo}><Logo /></Link>
          <div className={styles.meta}>
            <div className={styles.title}>Julian Jorgensen</div>
            <div className={styles.subtitle}>UX & Full-Stack development</div>
          </div>
          <button className={barsStyles} onClick={this.handleToggleNav}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </button>
        </header>
        <nav className={navStyles}>
          <Link to="/frontend" className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</Link>
          <Link to="/fullstack" className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</Link>
          <Link to="/ux" className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</Link>
          <Link to="/automation" className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</Link>
          <Link to="/contact" className={styles.contact}>Contact</Link>
        </nav>
      </Headroom>
    );
  }
}
