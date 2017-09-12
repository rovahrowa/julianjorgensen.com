import React from 'react';
import axios from 'axios';

import Loader from 'components/LoadingSpinner';
import styles from './index.css';

export default class Proposal extends React.Component {
  constructor() {
    super();

    this.state = {
      proposal: null
    }
  }

  componentWillMount() {
    // Retrieve proposal data
    let proposalId = this.props.params.proposalId;
    let environment;
    if (this.props.location.query.env){
      environment = `/${this.props.location.query.env}`;
    }else{
      environment = '';
    }
    axios.get(`/api/proposal/${proposalId}${environment}`)
      .then((response) => {
        console.log(response);
        this.setState({
          proposal: response.data.fields
        });
      })
      .catch((error) => {
        console.log('Error getting proposal data from api...', error);
      });
  }

  render() {
    let {proposal} = this.state;
    if (proposal){
      let renderTechnologies = () => {
        return (
          <ul className="technologies">
            {proposal.technologies.map((technology) => {
              return <li>{technology}</li>
            })}
          </ul>
        )
      }

      return (
        <div className={styles.container}>
          <h1>Proposal</h1>
          <h3>{proposal.prospectName}</h3>
          {proposal.coverLetter}

          {renderTechnologies()}
        </div>
        )
    }else{
      return (
        <Loader />
      )
    }
  }
}
