import React from 'react';
import {Collapse} from 'react-collapse';
import styles from './Accordion.css';

class Accordion extends React.Component{
  constructor(){
    super();

    this.state = {
      selected: null
    }
  }

  render() {
    let {className} = this.props;
    return (
      <div className={className}>
        {this.props.children.map((item, index) => {
          let title = item.props.children[0].props.children;
          let content = item.props.children[1].props.children;
          let selected;

          return (
            <div className={`${styles.item} ${this.state.selected === index ? styles.active : ''}`}>
              <div className={styles.title} onClick={() => {
                selected = (index === this.state.selected ? null : index)
                this.setState({
                  selected: selected
                });
              }}>{title}</div>
              <Collapse
                isOpened={this.state.selected === index ? true : false}
                springConfig={{stiffness: 200, damping: 20}}
              >
                <div className={styles.content}>{content}</div>
              </Collapse>
            </div>
          )
        })}
      </div>
    )
  }
}

module.exports = Accordion;
