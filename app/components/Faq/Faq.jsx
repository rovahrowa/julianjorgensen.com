import React from 'react';
import Accordion from 'Accordion/Accordion';
import styles from './Faq.css';

class Faq extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>FAQ</h2>
        <Accordion>
          <Accordion.Item>
            <Accordion.Title>Title</Accordion.Title>
            <Accordion.Content>Content here...</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Title>Title2</Accordion.Title>
            <Accordion.Content>Content2 here...</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

module.exports = Faq;
