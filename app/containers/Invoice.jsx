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
          invoiceData: response.data,
          paid: response.data.CustomField[0].StringValue
        });

        // Retrieve customer data
        axios.get('/api/customer/' + response.data.CustomerRef.value)
          .then((response) => {
            this.setState({
              customerData: response.data,
              customerEmail: (response.data.PrimaryEmailAddr ? response.data.PrimaryEmailAddr.Address : '')
            });
          })
          .catch((error) => {
            console.log('Error getting customer data from api...', error);
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
    if (this.state.invoiceData && this.state.customerData){
      return (
        <div className="container">
          <div className="callout success">{ this.state.paid === 'yes' ? 'Paid!' : 'Outstanding payment' }</div>
          <div className="callout alert">{ this.state.error }</div>
          <h1>Invoice total amount: { this.state.invoiceData.TotalAmt }</h1>

          <PaymentForm
            invoiceId={this.props.params.id}
            amount={this.state.invoiceData.TotalAmt}
            email={this.state.customerEmail}
            currency={this.state.invoiceData.CurrencyRef.value}
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
