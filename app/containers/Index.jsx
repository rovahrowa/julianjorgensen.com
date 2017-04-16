import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
let {connect} = require('react-redux');

import EstimateForm from 'EstimateForm';

class Index extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        Index
        <EstimateForm />
      </div>
    )
  }
}


module.exports = Index;
