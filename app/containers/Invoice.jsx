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
              customerData: response.data
            });
          });
      })
      .catch((error) => {
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
          {/* <p>Customer email: { this.state.customerData.email }</p> */}
          <PaymentForm
            invoiceId={this.props.params.id}
            amount={this.state.invoiceData.TotalAmt}
            email={this.state.customerData.PrimaryEmailAddr.Address}
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
