import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div class="container main">
        <div class="row">
          <div class="four columns">
            <div class="left">
              <div class="leftimage">
                <img src="images/question.png" width="100%" alt="Answers Image" />
                <h1>Get Answers!</h1>
                <h2>Enter Discrete Mathematics problems and receive instant answers</h2>
              </div>
              <a class="button button-primary" href="">ENTER</a>
            </div>
          </div>

          <div class="four columns">
            <div class="center">
              <div class="rightimage">
                <img src="images/descriptor.png" width="100%" alt="Resources Image" />
              </div>
              <h1>Access Resources</h1>
              <h2>Visit our list of additional resources hand picked for struggling students </h2>
              <a class="button button-primary" href="">VISIT</a>
            </div>
          </div>

          <div class="four columns">
            <div class="right">
              <div class="rightimage">
                <img src="images/project-management.png" width="100%" alt="Admin Image" />
                <h1>Admin Assistance</h1>
                <h2>Message us for administrative assistance with specific inquiries and issues.</h2>
              </div>
              <a class="button button-primary" href="">CONTACT</a>
            </div>
          </div>

          <div class="contactme"><a href=""><b>CONTACT</b></a></div>
        </div>
      </div>
    );
  }
}

export default About;
