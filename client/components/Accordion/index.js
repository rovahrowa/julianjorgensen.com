import React, { Component } from 'react';
import Item from './components/Item';
import styles from './index.css';

export default class Accordion extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(itemUid) {
    const selected = (itemUid === this.state.selected ? null : itemUid);
    this.setState({
      selected,
    });
  }

  render() {
    const { twoCols, children } = this.props;

    if (twoCols) {
      const splitChildren = [children.slice(0, children.length / 2), children.slice(children.length / 2, children.length)];
      return (
        <div className={styles.twoCols}>
          <Item twoCol selected={this.state.selected} handleOnClick={this.handleOnClick}>{splitChildren[0]}</Item>
          <Item twoCol selected={this.state.selected} handleOnClick={this.handleOnClick}>{splitChildren[1]}</Item>
        </div>
      );
    }

    return (
      <Item selected={this.state.selected} handleOnClick={this.handleOnClick} />
    );
  }
}
