import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'Marquee/Marquee';

class About extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <Marquee title="About" />
      </section>
    )
  }
}

module.exports = About;
