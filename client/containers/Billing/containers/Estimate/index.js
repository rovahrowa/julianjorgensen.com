import React, { Component } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { getItem } from '../../qboUtils';
import { EstimateBody } from '../../components/Body';
import styles from './index.css';

export default class Estimate extends Component {
  state = {
    item: null,
  }

  componentDidMount() {
    // Retrieve item data
    const { id } = this.props.match.params;
    const { token } = this.props.match.params;

    getItem('estimate', id, token).then((response) => {
      const { error, item, customer } = response;
      if (error) {
        this.setState({
          error,
        });
      } else {
        // set state
        this.setState({
          item,
          customer,
          paid: item.paid || false,
        });

        // trigger callback
        this.props.onLoaded();
      }
    });
  }

  markAsPaid = () => {
    this.setState({
      paid: true,
    });

    // trigger callback
    this.props.onLoaded();
  }

  render() {
    const {
      item,
      customer,
      paid,
      error,
    } = this.state;

    if (!item && !error) {
      return (
        <div className={styles.container}>
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <EstimateBody
          item={item}
          customer={customer}
          paid={paid}
        />
      </div>
    );
  }
}
