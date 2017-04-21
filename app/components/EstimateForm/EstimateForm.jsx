import React from 'react';
import axios from 'axios';

import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import styles from './EstimateForm.css';

class EstimateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      projectName: '',
      projectWebsite: '',
      notes: '',
      submitting: false,
      sent: false,
      error: null
    };
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitting: true
    });

    // Submit the form
    axios.post('/email/get-estimate', {
      name: this.state.name,
      email: this.state.email,
      projectName: this.state.projectName,
      projectWebsite: this.state.projectWebsite,
      notes: this.state.notes
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
      console.log('Error using /email/get-estimate: ', error);
    });
  }

  render() {
    if (!this.state.sent){
      return (
        <div className={styles.container}>
          <div className="callout alert">{ this.state.error }</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div class="form-row">
              <Input
                type='text'
                label='Name'
                name='name'
                required
                value={this.state.name}
                onChange={this.handleChange.bind(this, 'name')} />

              <Input
                type='email'
                label='Email address'
                required
                value={this.state.email}
                onChange={this.handleChange.bind(this, 'email')} />

              <Input
                type='text'
                value={this.state.projectName}
                label='Company/project name'
                required
                onChange={this.handleChange.bind(this, 'projectName')} />

              <Input
                type='text'
                value={this.state.projectWebsite}
                label='Website'
                required
                onChange={this.handleChange.bind(this, 'projectWebsite')} />

              <Input
                type='textarea'
                value={this.state.notes}
                label='Notes'
                multiline={true}
                rows={3}
                onChange={this.handleChange.bind(this, 'notes')} />

              <Button type='submit' label='Get Estimate' disabled={this.state.submitting} raised primary />
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div className={styles.container}>
          Thank you. {this.state.name.split(' ')[0]}, please take 5-10 minutes to <a href="https://goo.gl/forms/i8TwGVYpMkrrk5hj2" target="new">answer some questions about {this.state.projectName}</a>. It will help make the estimate more thorough.
        </div>
      )
    }
  }
}


module.exports = EstimateForm;
