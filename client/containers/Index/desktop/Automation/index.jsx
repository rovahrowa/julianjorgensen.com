import React from 'react';
import Carousel from 'rmc-nuka-carousel';
import cn from 'classnames';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import Slide from 'components/slide';
import styles from './index.css';

import BillingIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/billing-automation.svg';
import CalendarIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/calendar.svg';
import EmailIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/email-automation.svg';
import AutomationIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/gears.svg';
import CloudSyncIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/cloud-sync.svg';
import SocialIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/linked-icon.svg';

let carouselDecorators = Carousel.getDefaultProps().decorators.slice(2, 3);
carouselDecorators[0].position = 'CenterRight';

let slides = [{
    label: 'Billing automation',
    className: styles.billing,
    icon: <BillingIcon />
  },
  {
    label: 'Social media automation',
    className: styles.socialmedia,
    icon: <SocialIcon />
  },
  {
    label: 'API automation',
    className: styles.api,
    icon: <AutomationIcon />
  },
  {
    label: 'Email automation',
    className: styles.email,
    icon: <EmailIcon />
  },
  {
    label: 'Automated tests & QA',
    className: styles.tests,
    icon: <AutomationIcon />
  },
  {
    label: 'Scheduling automation',
    className: styles.scheduling,
    icon: <CalendarIcon />
  },
  {
    label: 'Workflow automation',
    className: styles.workflow,
    icon: <CloudSyncIcon />
  },
]

export default class HomeAutomation extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Automation</h2>
          <Button
            label='See more'
            href='/automation'
            hollow
            tiny
            blue
          />
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h3 className={styles.heroHeader}>Connect to the future.<br />It's easy!</h3>
          </div>
          <div className={styles.carousel}>
            <Carousel decorators={carouselDecorators} vertical slidesToShow={2} wrapAround={true} autoplay easing='easeInOutQuint' speed={800} autoplayInterval={5000} >
              {
                slides.map((slide, i) => {
                  let _slideStyle = cn(styles.slide, slide.className);
                  return (
                    <Slide
                      key={i}
                      label={slide.label}
                      labelClassName={styles.slideLabel}
                      className={_slideStyle}
                      icon={slide.icon}
                      iconStyles={styles.icon}
                      href='/automation'
                    />
                  )
                })
              }
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
