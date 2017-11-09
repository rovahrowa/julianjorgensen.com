import React, { Component } from 'react';
import cn from 'classnames';
import Button from 'components/Button';
import VisibilitySensor from 'react-visibility-sensor';
import WebArchitectureIcon from 'assets/icons/colored/wireframing.svg';
import UXIcon from 'assets/icons/colored/sketch.svg';
import DesignIcon from 'assets/icons/colored/ab-testing.svg';
import PrototypingIcon from 'assets/icons/colored/prototyping.svg';
import 'lib/draw-fill-svg';
import styles from './index.css';

export default class HomeUx extends Component {
  state = {
    show: false,
  }

  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.animateSvgs();
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };

  animateSvgs = () => {
    const svgAnimation = new DrawFillSVG({
      elementId: 'svg',
    });
    const svgAnimation2 = new DrawFillSVG({
      elementId: 'svg2',
    });
    const svgAnimation3 = new DrawFillSVG({
      elementId: 'svg3',
    });
    const svgAnimation4 = new DrawFillSVG({
      elementId: 'svg4',
    });
  };

  render() {
    const boxStyles = cn(styles.box, {
      [styles.show]: this.state.show,
    });
    const boxLabel = cn(styles.boxLabel, {
      [styles.show]: this.state.show,
    });
    const boxWrapper = cn(styles.boxWrapper, {
      [styles.show]: this.state.show,
    });
  
    return (
      <VisibilitySensor partialVisibility offset={{ top: 140, bottom: 80 }} onChange={this.onVisibilityChange}>
        <div className={styles.container} id="ux">
          <div className={styles.header}>
            <h2 className={styles.title}>User Experience</h2>
            {/* <Button
              label="See more"
              hollow
              tiny
              className={styles.cta}
            /> */}
          </div>

          <div className={styles.boxes}>
            <div className={boxWrapper}>
              <div className={boxStyles}>
                <WebArchitectureIcon id="svg" className={styles.boxIcon} />
              </div>
              <div className={boxLabel}>Web Architecture</div>
            </div>

            <div className={boxWrapper}>
              <div className={boxStyles}>
                <UXIcon id="svg2" className={styles.boxIcon} />
              </div>
              <div className={boxLabel}>UX Development</div>
            </div>

            <div className={boxWrapper}>
              <div className={boxStyles}>
                <DesignIcon id="svg3" className={styles.boxIcon} />
              </div>
              <div className={boxLabel}>Interface Design</div>
            </div>

            <div className={boxWrapper}>
              <div className={boxStyles}>
                <PrototypingIcon id="svg4" className={styles.boxIcon} />
              </div>
              <div className={boxLabel}>Prototyping</div>
            </div>
          </div>

        </div>
      </VisibilitySensor>
    );
  }
}

