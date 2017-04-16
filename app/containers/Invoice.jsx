import React from 'react';
import axios from 'axios';

import PaymentForm from 'PaymentForm';

class Invoice extends React.Component {
  constructor() {
    super();

    this.state = {
      invoiceData: null,
      customerData: null,
      paid: false
    };

    this.markAsPaid = this.markAsPaid.bind(this);
  }

  componentWillMount() {
    // Retrieve invoice data
    axios.get('/api/invoice/' + this.props.params.id + '?token=' + this.props.location.query.token)
      .then((response) => {
        this.setState({
          invoiceNumber: response.data.DocNumber,
          totalAmount: response.data.TotalAmt,
          currency: response.data.CurrencyRef.value,
          customerEmail: (response.data.PrimaryEmailAddr ? response.data.PrimaryEmailAddr.Address : ''),
          paid: response.data.CustomField[0].StringValue
        });
      })
      .catch((error) => {
        console.log('Error getting invoice data from api...', error);
        this.setState({
          error: error.response.data
        });
      });
  }

  markAsPaid() {
    this.setState({
      paid: 'yes'
    });
  }

  render() {
    if (this.state.invoiceNumber){
      return (
        <div className="container">
          <div className="callout success">{ this.state.paid === 'yes' ? 'Paid!' : 'Outstanding payment' }</div>
          <div className="callout alert">{ this.state.error }</div>
          <h1>Invoice total amount: { this.state.totalAmount }</h1>

          <PaymentForm
            invoiceId={this.props.params.id}
            invoiceNumber={this.state.invoiceNumber}
            amount={this.state.totalAmount}
            email={this.state.customerEmail}
            currency={this.state.currency}
            markAsPaid={this.markAsPaid}
          />
        </div>
      )
    }else{
      return (
        <div>Loading</div>
      )
    }
  }
}


module.exports = Invoice;
