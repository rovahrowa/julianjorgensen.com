import React from 'react';
import AtvImg from 'components/3DImg';
import cn from 'classnames';

import Button from 'components/Button';

import WebArchitectureIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/wireframing.svg';
import UXIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/sketch.svg';
import DesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/ab-testing.svg';
import PrototypingIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/prototyping.svg';

import styles from './index.css';

import drawFillSvg from 'lib/draw-fill-svg';
import VisibilitySensor from 'react-visibility-sensor';

export default class HomeUx extends React.Component{
  state = {
    show: false
  }

  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.animateSvgs();
      this.setState({show:true});
    }else{
      this.setState({show:false});        
    }
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
  };

  animateSvgs = () => {
    let svgAnimation = new DrawFillSVG({
      elementId: "svg"
    });
    let svgAnimation2 = new DrawFillSVG({
      elementId: "svg2"
    });
    let svgAnimation3 = new DrawFillSVG({
      elementId: "svg3"
    });
    let svgAnimation4 = new DrawFillSVG({
      elementId: "svg4"
    });  
  };

  render() {
    const _box = cn(styles.box, {
      [styles.show]: this.state.show
    });
    const _boxLabel = cn(styles.boxLabel, {
      [styles.show]: this.state.show
    });
    const _boxWrapper = cn(styles.boxWrapper, {
      [styles.show]: this.state.show
    });
  
    return (
      <VisibilitySensor partialVisibility={true} offset={{top: 140, bottom: 80}} onChange={this.onVisibilityChange}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>User Experience</h2>
            <Button
              label='See more'
              hollow
              tiny
              className={styles.cta}
            />
          </div>

          <div className={styles.boxes}>
            <div className={_boxWrapper}>
              <div className={_box}>
                <WebArchitectureIcon id="svg" className={styles.boxIcon} />
              </div>
              <div className={_boxLabel}>Web Architecture</div>
            </div>

            <div className={_boxWrapper}>
              <div className={_box}>
                <UXIcon id="svg2" className={styles.boxIcon} />
              </div>
              <div className={_boxLabel}>UX Development</div>
            </div>

            <div className={_boxWrapper}>
              <div className={_box}>
                <DesignIcon id="svg3" className={styles.boxIcon} />
              </div>
              <div className={_boxLabel}>Interface Design</div>
            </div>

            <div className={_boxWrapper}>
              <div className={_box}>
                <PrototypingIcon id="svg4" className={styles.boxIcon} />
              </div>
              <div className={_boxLabel}>Prototyping</div>
            </div>
          </div>

        </div>
      </VisibilitySensor>
    )
  }
}

