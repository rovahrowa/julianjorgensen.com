import React from 'react';
import cn from 'classnames';
import styles from './index.css';

const Dots = {
  component: class Dots extends React.Component {
    getIndexes(count, inc) {
      var arr = [];
      for (var i = 0; i < count; i += inc) {
        arr.push(i);
      }
      return arr;
    }

    render() {
      var self = this;
      var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
      return (
        <ul className={styles.dots}>
          {
            indexes.map(function(index) {
              let _dotStyles = cn(styles.dot, {
                [styles.active] : self.props.currentSlide === index
              });
              return (
                <li className={_dotStyles} key={index} onClick={self.props.goToSlide.bind(null, index)}></li>
              )
            })
          }
        </ul>
      )
    }
  },
  position: 'BottomCenter'
};

export default Dots;
