import React from 'react';
import Header from 'Header';
import Footer from 'Footer';
import DocumentMeta from 'react-document-meta';

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
        <div id="main-container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

module.exports = Main;
