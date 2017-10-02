import React from 'react';
import cn from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import Logo from 'components/Logo';
import styles from './index.css';

@withRouter
export default class NavItems extends React.Component {
  render() {
    let { active, activeClassName, className } = this.props;
    let pathname = this.props.location.pathname.split('/')[1];
    let _containerStyles = cn(styles.container, className, {
      [activeClassName]: active
    });

    return (
      <div>{ENV_CONFIG.ENV === 'production' ?
      <nav className={_containerStyles}>
        <li><div className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></div></li>
        <li><div className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</div></li>
        <li><div className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</div></li>
        <li><div className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</div></li>
        <li><div className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</div></li>
        <li><div className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</div></li>
      </nav> : <nav className={_containerStyles}>
      <li><Link to='/' className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></Link></li>
      <li><Link to='/frontend' className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</Link></li>
      <li><Link to='/fullstack' className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</Link></li>
      <li><Link to='/ux' className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</Link></li>
      <li><Link to='/automation' className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</Link></li>
      <li><div className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</div></li>
    </nav>}
    </div>
    )
  }
}
