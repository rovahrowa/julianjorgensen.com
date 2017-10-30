import React, { Component } from 'react';
import Marquee from 'components/Marquee';

export default class About extends Component{
  render() {
    return (
      <section className="section">
        <Marquee title="About" />
      </section>
    )
  }
}
