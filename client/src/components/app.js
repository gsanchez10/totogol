import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div className="main">
      	<Header />
        <div className="wrapper">
        	<div className="container-fluid">
        		{this.props.children}
        	</div>
        </div>
      	<Footer />
      </div>
    );
  }
}
