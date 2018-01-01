import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'rmc-nuka-carousel';
import cn from 'classnames';
import Button from 'components/Button';
import Slide from 'components/slide';
import BillingIcon from 'assets/icons/colored/billing-automation.svg';
import CalendarIcon from 'assets/icons/colored/calendar.svg';
import EmailIcon from 'assets/icons/colored/email-automation.svg';
import AutomationIcon from 'assets/icons/colored/gears.svg';
import CloudSyncIcon from 'assets/icons/colored/cloud-sync.svg';
import SocialIcon from 'assets/icons/colored/linked-icon.svg';
import styles from './index.css';

const carouselDecorators = Carousel.getDefaultProps().decorators.slice(2, 3);
carouselDecorators[0].position = 'CenterRight';

const slides = [
  {
    label: 'Billing automation',
    className: styles.billing,
    icon: <BillingIcon />,
  },
  {
    label: 'Social media automation',
    className: styles.socialmedia,
    icon: <SocialIcon />,
  },
  {
    label: 'API automation',
    className: styles.api,
    icon: <AutomationIcon />,
  },
  {
    label: 'Email automation',
    className: styles.email,
    icon: <EmailIcon />,
  },
  {
    label: 'Automated tests & QA',
    className: styles.tests,
    icon: <AutomationIcon />,
  },
  {
    label: 'Scheduling automation',
    className: styles.scheduling,
    icon: <CalendarIcon />,
  },
  {
    label: 'Workflow automation',
    className: styles.workflow,
    icon: <CloudSyncIcon />,
  },
]

@connect()
export default class Automation extends Component {
  state = {};

  toggleScheduling = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TOGGLE_SCHEDULING',
    });
  }

  render() {
    return (
      <div className={styles.container} id="automation">
        <div className={styles.header}>
          <h2 className={styles.title}>Web automation</h2>
          {/* <Button
            label="See more"
            href="/automation"
            hollow
            tiny
            blue
          /> */}
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h3 className={styles.heroHeader}><span>Automation is the future.</span><br /><br /><span className={styles.connectCta} onClick={this.toggleScheduling}>Let's connect!</span></h3>
          </div>
          <div className={styles.carousel}>
            <Carousel decorators={carouselDecorators} vertical slidesToShow={2} wrapAround autoplay easing="easeInOutQuint" speed={800} autoplayInterval={5000} >
              {
                slides.map((slide, i) => {
                  const slideStyle = cn(styles.slide, slide.className);
                  return (
                    <Slide
                      key={slide.label}
                      label={slide.label}
                      labelClassName={styles.slideLabel}
                      className={slideStyle}
                      icon={slide.icon}
                      iconStyles={styles.icon}
                    />
                  );
                })
              }
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}
