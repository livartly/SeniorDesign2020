import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <h1>BANNER WILL GO HERE</h1>
        </div>

        <div className="container main">
          <div className="row">

            <div className="twelve columns">
              <h1>ABOUT WOLFRAM BETA</h1>
              <p>This is a placeholder for when we agree upon content</p>
              <h5>-WOLFRAM BETA TEAM</h5>
            </div>

            <div className="contactme"><a href="contact.html"><b>CONTACT</b></a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
