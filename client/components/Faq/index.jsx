import React from 'react';
import Accordion from 'components/Accordion';
import styles from './index.css';

export default class Faq extends React.Component{
  handleUpdate = () => {
    console.log('handling faq update');
    this.props.handleUpdate();
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>FAQ</h2>
        <div className={styles.accordions}>
          <Accordion className={styles.accordion} handleUpdate={this.handleUpdate}>
            <div>
              <div>What's your rate?</div>
              <div>I charge USD $120 / hour.</div>
            </div>
            <div>
              <div>Which stacks do you develop in?</div>
              <div>I mainly build in JAM stack. It stands for Javascript APIs and Markup. Specifically I use Node, Javascript, React, CSSNext, CSS Modules, Webpack 3, and other up-to-date NPM libraries.</div>
            </div>
            <div>
              <div>What's your availability?</div>
              <div>I'm typically booked for 2-3 months in advance, so make sure to book with me well in advance.</div>
            </div>
            <div>
              <div>Where are you located?</div>
              <div>I'm based online! My entire business is built to be nomadic, which means I can work from anywhere in the world.</div>
            </div>
            <div>
              <div>What's your timezone?</div>
              <div>When I take on a new client I adjust my work hours accordingly. I prefer to have at least 3 cross-over hours.</div>
            </div>
          </Accordion>

          <Accordion className={styles.accordion} handleUpdate={this.handleUpdate}>
            <div>
              <div>Do you build Apps?</div>
              <div>I build Web Apps. They run on both desktops and mobile devices. That being said, a Web App is different than a Mobile App. A Web App can run on all platforms, while mobile apps can only run on mobile devices. Mobile apps are specifically built for the mobile device, and therefore has some benefits over Web Apps. Web Apps in return are very versatile and a great cost-effective way to publish a app for all devices.</div>
            </div>
            <div>
              <div>Which payment methods do you accept?</div>
              <div>Credit Card, Bank transfer (in Canada, US, and Europe), E-transfer, PayPal, and Cheque. The invoice I send has all the details.</div>
            </div>
            <div>
              <div>Are you a developer or designer?</div>
              <div>I'm among the rare breed of developers who also has a passion for design and beauty. If development and design is too separated, both seem to suffer. I like the term UX Development because it implies that good UX is not just found in design - also in development.</div>
            </div>
            <div>
              <div>What do you automate?</div>
              <div>I automate workflows, invoicing, emails, and user platforms in general. Contact me for more details.</div>
            </div>
            <div>
              <div>Do you also subcontract?</div>
              <div>Yes, I do subcontract for agencies in North America. I prefer to work with agencies that focus on management while giving me complete responsibility on the technical side.</div>
            </div>
          </Accordion>
        </div>
      </div>
    )
  }
}
