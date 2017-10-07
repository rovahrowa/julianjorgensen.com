import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  getItem
} from '../../qboUtils';

import LoadingSpinner from 'components/LoadingSpinner';
import {
  InvoiceBody
} from '../../components/Body';
import PaymentOptions from '../../components/PaymentOptions';
import styles from './index.css';

export default class Invoice extends React.Component {
  state = {
    item: null
  }

  componentDidMount() {
    // Retrieve invoice data
    let id = this.props.match.params.id;
    let token = this.props.match.params.token;

    getItem('invoice', id, token).then((response) => {
      let { error, item, customer } = response;
      if (error) {
        this.setState({
          error
        });
      } else {
        // set state
        this.setState({
          item,
          customer,
          paid: item.paid || false
        });

        // trigger callback
        this.props.onLoaded();
      }
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
      paid,
      error
    } = this.state;

    if (!item && !error) {
      return (
        <div className={styles.container}>
          <LoadingSpinner />
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
        </div>
      )
    }

    let {
      number,
      amount
    } = item;

    return (
      <div className={styles.container}>
        <InvoiceBody
          item={item}
          customer={customer}
          paid={paid}
        />
        <PaymentOptions
          item={item}
          customer={customer}
          paid={paid}
          markAsPaid={this.markAsPaid}
          onLoaded={() => this.props.onLoaded()}
        />
      </div>
    )
  }
}
