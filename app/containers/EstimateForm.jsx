import React from 'react';
import axios from 'axios';

class EstimateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      projectName: '',
      submitting: false,
      sent: false,
      error: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
   }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitting: true
    });

    // Submit the form
    axios.post('/email/get-a-estimate', {
      name: this.state.name,
      email: this.state.email,
      projectName: this.state.projectName
    })
    .then((response) => {
      if (response.status === 200){
        this.setState({
          submitting: false,
          sent: true
        });
      }
    })
    .catch((error) => {
      console.log('Error using /email/get-a-estimate: ', error);
    });
  }

  render() {
    if (!this.state.sent){
      return (
        <div className="container">
          <div className="callout alert">{ this.state.error }</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div class="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={this.state.name}
                onChange={this.handleInputChange} />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={this.state.email}
                onChange={this.handleInputChange} />
              <input
                type="text"
                name="projectName"
                placeholder="Project name"
                value={this.state.projectName}
                onChange={this.handleInputChange} />

              <input type="submit" className="button" disabled={this.state.submitting} value="Get Estimate" />
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div>Thank you. {this.state.name.split(' ')[0]}, please take 5-10 minutes to <a href="https://goo.gl/forms/i8TwGVYpMkrrk5hj2" target="new">answer some questions about {this.state.projectName}</a>. It will help make the estimate more thorough.</div>
      )
    }
  }
}


module.exports = EstimateForm;
