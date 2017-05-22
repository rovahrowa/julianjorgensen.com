import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'Marquee/Marquee';

class FrontEnd extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <Marquee title="Front-End" bgColor="purple-blue" />
      </section>
    )
  }
}

module.exports = FrontEnd;
