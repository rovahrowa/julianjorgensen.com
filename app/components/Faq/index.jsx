import React from 'react';
import Accordion from 'components/Accordion';
import styles from './index.css';

class Faq extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <h2>FAQ</h2>
          <div className={styles.accordions}>
            <Accordion className={styles.accordion}>
              <Accordion.Item>
                <Accordion.Title>Lorem ipsum</Accordion.Title>
                <Accordion.Content>Content here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Dolar sit amit</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Urit manu lorem</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Trusti Varnum</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Karim Rashu Manu Kilo</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
            </Accordion>

            <Accordion className={styles.accordion}>
              <Accordion.Item>
                <Accordion.Title>Lorem ipsum</Accordion.Title>
                <Accordion.Content>Content here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Dolar sit amit</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Urit manu lorem</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Trusti Varnum</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Title>Karim Rashu Manu Kilo</Accordion.Title>
                <Accordion.Content>Content2 here...</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Faq;
