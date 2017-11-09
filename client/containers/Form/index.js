import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import axios from 'axios';
import Form from './Form';

@connect((state, props) => ({
  form: props.formName,
}))
export default class FormContainer extends Component {
  onSubmit = (formValues) => {
    const { dispatch, template, form } = this.props;
    if (Array.isArray(template)) {
      template.forEach((templateItem, i) => {
        this.sendMail(formValues, templateItem);
        if (i === (template.length - 1)) {
          dispatch(reset(form));
        }
      });
      return true;
    }

    if (template) return this.sendMail(formValues, template);
    return this.sendMail(formValues);
  }

  sendMail({ ...formValues }, {
    templateName, to, from, subject,
  }) {
    return new Promise((resolve, reject) =>
      axios.post('/email', {
        template: templateName || this.props.form,
        to,
        from,
        subject,
        ...formValues,
      }).then(() => {
        resolve();
      }).catch((err) => {
        console.error('error sending email', err);
        resolve();
      }));
  }

  render() {
    return <Form {...this.props} onSubmit={this.onSubmit} />;
  }
}
