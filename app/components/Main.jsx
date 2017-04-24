import React from 'react';
import DocumentMeta from 'react-document-meta';

import { Layout } from 'react-toolbox/lib/layout';
import Calendly from 'Calendly/Calendly';
import EstimateForm from 'EstimateForm/EstimateForm';
import Header from 'Header/Header';
import Footer from 'Footer/Footer';

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: ''
    };
  }

  render() {
    const meta = {
      title: 'Julian Jorgensen',
      description: 'UX &amp; Front-End Development',
      meta: {
        charset: 'utf-8'
      },
      auto: {
        ograph: true
      }
    };

    let pageName = this.props.location.pathname.substr(1).split('/');

    return (
      <div id="main" className={`page-${pageName[0] ? pageName[0] + ' subpage' : 'home'}`}>
        <DocumentMeta {...meta} />
        <Header />
        <Layout>
          {this.props.children}
          <EstimateForm />
          <Footer />
        </Layout>
        <Calendly />
      </div>
    );
  }
}

module.exports = Main;
