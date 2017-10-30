import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from 'react-toolbox/lib/input';
import Button from 'components/Button';
import CalendarIcon from 'assets/icons/FontAwesome/regular/calendar.svg';
import EmailIcon from 'assets/icons/FontAwesome/regular/envelope.svg';
import styles from './index.css';

@connect()
export default class EstimateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      project: '',
      notes: '',
      submitting: false,
      sent: false,
      error: null,
    };
  }

  toggleScheduling = () => {
    let {
      dispatch
    } = this.props;
    dispatch({
      type: 'TOGGLE_SCHEDULING',
    });
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitting: true,
    });

    // Submit the form
    axios.post('/email/get-estimate', {
      name: this.state.name,
      email: this.state.email,
      project: this.state.project,
      notes: this.state.notes,
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          submitting: false,
          sent: true,
        });
      }
    }).catch((error) => {
      console.log('Error using /email/get-estimate: ', error);
    });
  }

  render() {
    if (!this.props.show) {
      return false;
    }

    if (this.state.sent) {
      return (
        <div className={styles.container}>
          Thank you. {this.state.name.split(' ')[0]}, please take 5-10 minutes to <a href="https://goo.gl/forms/i8TwGVYpMkrrk5hj2" target="new">answer some questions about {this.state.project}</a>. It will help make the estimate more thorough.
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get a free estimate</h2>
          <h3 className={styles.subTitle}>(I often get fully booked, so reserve your spot now)</h3>
        </div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div>
            <Input
              type="text"
              label="Your name"
              required
              value={this.state.name}
              onChange={() => this.handleChange('name')}
            />

            <Input
              type="email"
              label="Your email"
              required
              value={this.state.email}
              onChange={() => this.handleChange('email')}
            />

            <Input
              type="text"
              label="Project name/website"
              value={this.state.project}
              required
              onChange={() => this.handleChange('project')}
            />

            <Input
              type="textarea"
              value={this.state.notes}
              label="How can I help?"
              multiline
              rows={4}
              onChange={() => this.handleChange('notes')}
            />

            <Button
              type="submit"
              label="Get Estimate"
              disabled={this.state.submitting}
              className={styles.submit}
              primary
            />
          </div>
        </form>

        <div className={styles.helper}>
          <div className={styles.helperHeadline}>Got questions?</div>
          <div className={styles.helperMethod}>
            <CalendarIcon className={styles.icon} />
            <button onClick={this.toggleScheduling}>Schedule a free meeting</button>
          </div>
          <div className={styles.helperMethod}>
            <EmailIcon className={styles.icon} />
            <a href="mailto:me@julianjorgensen.com">me@julianjorgensen.com</a>
          </div>
        </div>
      </div>
    );
  }
}
