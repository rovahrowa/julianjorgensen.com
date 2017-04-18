import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'Marquee/Marquee';

import styles from './Design.css';

class Design extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section>
        <Marquee title="Design" bgColor="orange" />
      </section>
    )
  }
}

module.exports = Design;
