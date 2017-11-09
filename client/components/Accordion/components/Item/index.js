import React, { Component } from 'react';
import cn from 'classnames';
import { Collapse } from 'react-collapse';
import styles from './index.css';

export default class Accordion extends Component {
  state = {};

  render() {
    const { className, handleOnClick, children, selected, twoCol } = this.props;

    const wrapperStyles = cn(styles.wrapper, className, {
      [styles.twoCol]: twoCol,
    });

    return (
      <div className={wrapperStyles}>
        {children.map((item) => {
          const title = item.props.children[0].props.children;
          const uid = title.toLowerCase().replace(/\s/g, '');
          const content = item.props.children[1].props.children;

          const itemStyles = cn(styles.item, {
            [styles.active]: selected === uid,
          });

          return (
            <button
              key={title}
              className={itemStyles}
              onClick={() => handleOnClick(uid)}
            >
              <div className={styles.title}>{title}</div>
              <Collapse
                isOpened={selected === uid}
                springConfig={{ stiffness: 200, damping: 20 }}
              >
                <div className={styles.content}>{content}</div>
              </Collapse>
            </button>
          );
        })}
      </div>
    );
  }
}
