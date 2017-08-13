import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'components/Marquee';
import StackGrid from "react-stack-grid";
import AtvImg from 'react-atv-img';

import styles from './index.css';

class Design extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div className="page-content">
        <Marquee title="Design" bgColor="orange" />

        <div className={styles.container}>
          content here
          <hr />

          <AtvImg
            layers={[
              'http://kloc.pm/images/back.png',
              'http://kloc.pm/images/front.png',
            ]}
            staticFallback="http://kloc.pm/images/kloc-icon-flattened.jpg"
            isStatic={false}
            className={'thisIsOptional'}
            style={{ width: 320, height: 190 }}
          />

          <hr />

          <StackGrid
            columnWidth={150}
          >
            <div key="key1" style={{backgroundColor: '#c0c0c0'}}>Item 1<br />continued</div>
            <div key="key2">Item 2</div>
            <div key="key3">Item 3</div>
            <div key="key4" style={{backgroundColor: '#c0c0c0'}}>Item 4<br />continued</div>
            <div key="key5" style={{backgroundColor: '#c0c0c0'}}>Item 5<br />continued</div>
            <div key="key6" style={{backgroundColor: 'red'}}>Item 6<br />continued</div>
          </StackGrid>
        </div>
      </div>
    )
  }
}

module.exports = Design;
