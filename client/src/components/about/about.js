import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="container main">
        <div className="row">
          <div className="four columns">
            <div className="left">
              <div className="leftimage">
                <img src="images/question.png" width="100%" alt="Answers Image" />
                <h1>Get Answers!</h1>
                <h2>Enter Discrete Mathematics problems and receive instant answers</h2>
              </div>
              <a className="button button-primary" href="">ENTER</a>
            </div>
          </div>

          <div className="four columns">
            <div className="center">
              <div className="rightimage">
                <img src="images/descriptor.png" width="100%" alt="Resources Image" />
              </div>
              <h1>Access Resources</h1>
              <h2>Visit our list of additional resources hand picked for struggling students </h2>
              <a className="button button-primary" href="">VISIT</a>
            </div>
          </div>

          <div className="four columns">
            <div className="right">
              <div className="rightimage">
                <img src="images/project-management.png" width="100%" alt="Admin Image" />
                <h1>Admin Assistance</h1>
                <h2>Message us for administrative assistance with specific inquiries and issues.</h2>
              </div>
              <a className="button button-primary" href="">CONTACT</a>
            </div>
          </div>

          <div className="contactme"><a href=""><b>CONTACT</b></a></div>
        </div>
      </div>
    );
  }
}

export default About;
