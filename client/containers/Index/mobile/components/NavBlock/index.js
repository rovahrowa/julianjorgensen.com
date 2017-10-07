import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import AngleRightIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/angle-right.svg';
import styles from './index.css';

export default class HomeNavBlock extends React.Component {
  render() {
    let { className, tags } = this.props;
    let _wrapperStyles = cn(styles.wrapper, className);
    return (
      <div className={_wrapperStyles}>
        <span>{this.props.title}</span>
        <AngleRightIcon />

        <div className={styles.tags}>
          {tags ? tags.map((tag) => {
            return (
              <div className={styles.tag}>{tag}</div>
            )
          }) : ''}
        </div>

      </div>
    )
  }
}
