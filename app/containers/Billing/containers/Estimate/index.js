import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  getItem
} from '../../qboUtils';

import LoadingSpinner from 'components/LoadingSpinner';
import {
  EstimateBody
} from '../../components/Body';
import styles from './index.css';

export default class Estimate extends React.Component {
  state = {
    item: null
  }

  componentDidMount() {
    // Retrieve item data
    let id = this.props.match.params.id;
    let token = this.props.match.params.token;

    getItem('estimate', id, token).then(({
      item,
      customer
    }) => {
      // set state
      this.setState({
        item,
        customer,
        paid: item.paid || false
      });

      // trigger callback
      this.props.onLoaded();
    });
  }

  markAsPaid = () => {
    this.setState({
      paid: true
    });

    // trigger callback
    this.props.onLoaded();
  }

  render() {
    let {
      item,
      customer,
      paid
    } = this.state;

    if (!item) {
      return (
        <div className={styles.container}>
          <LoadingSpinner />
        </div>
      )
    }

    let {
      number,
      amount
    } = item;

    return (
      <div className={styles.container}>
        <EstimateBody
          item={item}
          customer={customer}
          paid={paid}
        />
      </div>
    )
  }
}
