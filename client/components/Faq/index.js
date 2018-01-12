import React from 'react';
import Accordion from 'components/Accordion';
import styles from './index.css';

export default () => (
  <div className={styles.container}>
    <h2>FAQ</h2>
    <Accordion twoCols>
      <div>
        <div>What's your rate?</div>
        <div>My regular rate is $120 USD/hour. I also offer fixed quotes for some projects.</div>
      </div>
      <div>
        <div>Do you build Apps?</div>
        <div>I build web apps that run on both desktop and mobile devices (Mobile apps are built only for phones), which makes it cost-effective and versatile across all platforms.</div>
      </div>
      <div>
        <div>Which stacks do you develop in?</div>
        <div>I mainly build in Javascript, React, CSS, and Node. For details <a href="https://stackshare.io/JulianJorgensen/julians-full-stack" target="new">see my full stack</a>.</div>
      </div>
      <div>
        <div>Are you a developer or designer?</div>
        <div>I prefer the term UX Development because of my unique passion and ability to bridge both development and design. Good UX is found in both and that's what impresses your users.</div>
      </div>
      <div>
        <div>What do you automate?</div>
        <div>I generally automate workflows, scheduling, invoicing, emails, and user platforms. Contact me for more details.</div>
      </div>
      <div>
        <div>Do you also subcontract?</div>
        <div>I subcontract for agencies in Europe and North America. I prefer those that focus on management and/or design. This allows me to fully focus on the technical side.</div>
      </div>
      <div>
        <div>What's your availability?</div>
        <div>I'm typically booked for 1-3 months in advance, so it's best to reserve your project with me early on.</div>
      </div>
      <div>
        <div>Where are you located?</div>
        <div>Wherever you are located, I adjust my availability accordingly to make sure we have at least 3 cross-over hours.</div>
      </div>
      <div>
        <div>What's your timezone?</div>
        <div>I adjust according to my clients. I prefer to have at least 3 cross-over hours.</div>
      </div>
      <div>
        <div>Which payment methods do you accept?</div>
        <div>Credit Card, Bank transfer (in Canada, US, and Europe), E-transfer (Canada only), PayPal, and Cheque</div>
      </div>
    </Accordion>
  </div>
);
