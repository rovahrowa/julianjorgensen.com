import React from 'react';
import { connect } from 'react-redux';
import Form from 'containers/Form';
import CalendarIcon from 'assets/icons/FontAwesome/regular/calendar.svg';
import EmailIcon from 'assets/icons/FontAwesome/regular/envelope.svg';
import styles from './index.css';

const formFields = [
  {
    label: 'Your name',
    name: 'name',
    required: true,
  },
  {
    label: 'Your email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Project name/website',
    name: 'project',
  },
  {
    label: 'How can I help?',
    name: 'notes',
    multiline: true,
    rows: 4,
  },
];

@connect(({ form }) => ({
  form: form.estimate,
}))
export default class EstimateForm extends React.Component {
  state = {};
  
  toggleScheduling = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TOGGLE_SCHEDULING',
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get a free estimate</h2>
          <h3 className={styles.subTitle}>(I'm often fully booked, so reserve your spot now!)</h3>
        </div>
        <Form
          className={styles.form}
          formFields={formFields}
          formName="estimate"
          submitButton={{
            label: 'Get Estimate',
            className: styles.submitButton,
          }}
          successResponse={<div>Thank you! Please take 5-10 minutes to <a href="https://goo.gl/forms/i8TwGVYpMkrrk5hj2" target="new">answer some questions about your project</a>. It will help make the estimate more thorough.</div>}
          template={[
            {
              templateName: 'estimateConfirmation',
              from: 'user',
              to: 'admin',
              subject: 'Estimate confirmation',
            },
            {
              templateName: 'estimateRequest',
              from: 'admin',
              to: 'user',
              subject: 'Estimate request',
            },
          ]}
        />
        <div className={styles.helper}>
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
