import React from 'react';
import Accordion from 'components/Accordion';
import styles from './index.css';

export default class Faq extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>FAQ</h2>
        <div className={styles.accordions}>
          <Accordion className={styles.accordion}>
            <div>
              <div>Lorem ipsum</div>
              <div>Content here...</div>
            </div>
            <div>
              <div>Dolar sit amit</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Urit manu lorem</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Trusti Varnum</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Karim Rashu Manu Kilo</div>
              <div>Content2 here...</div>
            </div>
          </Accordion>

          <Accordion className={styles.accordion}>
            <div>
              <div>Lorem ipsum</div>
              <div>Content here...</div>
            </div>
            <div>
              <div>Dolar sit amit</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Urit manu lorem</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Trusti Varnum</div>
              <div>Content2 here...</div>
            </div>
            <div>
              <div>Karim Rashu Manu Kilo</div>
              <div>Content2 here...</div>
            </div>
          </Accordion>
        </div>
      </div>
    )
  }
}
