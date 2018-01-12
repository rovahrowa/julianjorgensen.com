import React, { Component } from 'react';
import Index from 'containers/Index';
import axios from 'axios';
import Loader from 'components/LoadingSpinner';
import styles from './index.css';

export default class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      landingPage: null,
    };
  }

  componentWillMount() {
    // Retrieve landingPage data
    const { landingPageUrl, env } = this.props.match.params;
    axios.get(`/get-landingpage/${landingPageUrl}${env ? `/${env}` : ''}`)
      .then((response) => {
        console.log(response);
        this.setState({
          landingPage: response.data.fields,
        });
      })
      .catch((error) => {
        console.log('Error getting landingpage data from api...', error);
      });
  }

  render() {
    const { landingPage } = this.state;
    if (!landingPage) return <Loader className={styles.loader} />;

    // const renderTechnologies = () => {
    //   if (!landingPage.technologies) return false;
    //   return (
    //     <ul className="technologies">
    //       {landingPage.technologies.map((technology, i) => <li key={i}>{technology}</li>)}
    //     </ul>
    //   );
    // };

    return (
      <Index content={landingPage} />
    );
  }
}
