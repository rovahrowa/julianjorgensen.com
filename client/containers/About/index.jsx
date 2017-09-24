import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'components/Marquee';

export default class About extends React.Component{
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
