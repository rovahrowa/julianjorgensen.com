import React from 'react';
import { Collapse } from 'react-collapse';
import styles from './index.css';

export default class Accordion extends React.Component{
  constructor(){
    super();

    this.state = {
      selected: null
    }
  }

  handleUpdate = () => {
    setTimeout(() => {
      console.log('handling accordion update');
      this.props.handleUpdate();
    }, 250);
  };

  render() {
    let {className} = this.props;
    return (
      <div className={className}>
        {this.props.children.map((item, index) => {
          let title = item.props.children[0].props.children;
          let content = item.props.children[1].props.children;
          let selected;

          return (
            <div
              key={index}
              className={`${styles.item} ${this.state.selected === index ? styles.active : ''}`}
              onClick={() => {
                selected = (index === this.state.selected ? null : index)
                this.setState({
                  selected: selected
                }, () => {
                  this.handleUpdate();
                });
              }}
            >
              <div className={styles.title}>{title}</div>
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