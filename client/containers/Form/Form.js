import React from 'react';
import cn from 'classnames';
import TextField from 'components/TextField';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
// import Checkbox from './components/Checkbox';
// import Upload from './components/Upload';
import styles from './index.css';

const Form = ({
  className,
  formFields,
  submitButton,
  successResponse,
  submitSucceeded,
  handleSubmit,
  pristine,
  reset,
  submitting,
}) => {
  const responseStyles = cn(styles.response, {
    [styles.success]: submitSucceeded,
  });

  const submitButtonStyles = cn(styles.submitButton, submitButton.className);

  const getComponentType = (type) => {
    // if (type === 'checkbox') return Checkbox;
    // if (type === 'upload') return Upload;
    return TextField;
  };
  
  const renderField = ({ name, type, ...others }) => (
    <Field
      key={name}
      name={name.toLowerCase().replace(/\s/g, '')}
      label={name}
      type={type || 'text'}
      component={getComponentType(type)}
      disabled={submitting}
      {...others}
    />
  );

  return (
    <form className={className} onSubmit={handleSubmit}>
      {formFields.map((formField) => {
        if (formField.type === 'group') {
          return (
            <div key={formField.label}>
              <div className={styles.groupLabel}>{formField.label}</div>
              <div className={formField.styles}>
                {formField.fields.map(groupFormField => renderField(groupFormField))}
              </div>
            </div>
          );
        }
        return renderField(formField);
      })}
      <div>
        <Button className={submitButtonStyles} label={submitting ? 'Sending...' : submitButton.label} type="submit" disabled={submitting} primary />
        <div className={responseStyles}>{submitSucceeded ? successResponse || 'Message sent successfully!' : ''}</div>
      </div>
    </form>
  );
};

export default reduxForm({
  // you can add other reduxForm options here
  destroyOnUnmount: false,
})(Form);
