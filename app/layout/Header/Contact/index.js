import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import styles from './index.css';

import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';

import EmailIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/envelope.svg';
import PhoneIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/phone.svg';
import CloseIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/times.svg';

const Contact = ({active, handleToggle}) => {
  return (
    <Drawer
      theme={styles}
      active={active}
      onOverlayClick={handleToggle}
    >
      <CloseIcon className={styles.close} onClick={handleToggle} />

      <div className={styles.contact}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
        </div>
        <ul className={styles.methods}>
          <li className={styles.method}><a href="mailto:me@julianjorgensen.com"><EmailIcon className={styles.icon} /> me@julianjorgensen.com</a></li>
          <li className={styles.method}><a href="tel:1-888-709-0944"><PhoneIcon className={styles.icon} /> 1-888-709-0944</a></li>
        </ul>
      </div>

      <div className={styles.alternative}>
        <address>
          <strong>Flo Inc.</strong><br />
          308 5th Ave E.<br />
          V5T 1H4, Vancouver<br />
          B.C., Canada
        </address>
        <SocialIcons className={styles.icons} />
      </div>
    </Drawer>
  )
}

export default Contact;
