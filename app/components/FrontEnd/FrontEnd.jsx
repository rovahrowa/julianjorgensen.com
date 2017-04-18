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
        <section className="section">
          <Marquee title="Front-End" />
        </section>
      </section>
    )
  }
}

module.exports = FrontEnd;
