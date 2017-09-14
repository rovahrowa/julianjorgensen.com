import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import styles from './index.css';

import AlertIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/exclamation-circle.svg';

export default class PayPal extends React.Component {
  state = {
    error: false
  }

  onSuccess = (payment) => {
    this.props.markAsPaid();
  }

  onCancel = (data) => {
    this.setState({
      error: 'The payment was cancelled. Please try again'
    });
    console.log('The payment was cancelled!', data);
  }

  onError = (err) => {
    this.setState({
      error: 'There was an error'
    });
    console.log("Error!", err);
  }

  render() {
    let { item, customer } = this.props;
    let { error } = this.state;

    const client = {
      sandbox:    'AdZlbZzCbbXWZiykWTYT82lc3KvVK32IQxYFrMx8CYQSNVIzaIzT7Oq3IymA4Az4Bsrae-2POEYAFGus',
      production: 'AWgT41s1hvDF1AAEX9T-iZljVXT34RVSgutZ9SVKM7NtT-fLLkqgfWiGHR4l5xb6TZRb4RBKoenTRwvw'
    }

    return (
      <div className={styles.container}>
        <PaypalExpressBtn
          env={ENV_CONFIG.ENV === 'production' ? 'production' : 'sandbox'}
          client={client}
          currency={item.currency}
          total={item.balance}
          onError={this.onError}
          onSuccess={this.onSuccess}
          onCancel={this.onCancel}
          className={styles.paypal}
        />
        {error ?
          <div className={styles.error}>
            <AlertIcon className={styles.icon} /> {error}
          </div>
        : ''}
      </div>
    );
  }
}
