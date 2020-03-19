import React, { Component } from 'react';
import {Link} from 'react-router-dom'

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
                <h5>Enter Discrete Mathematics problems and receive instant answers</h5>
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
              <h5>Visit our list of additional resources hand picked for struggling students </h5>
              <a className="button button-primary" href="">VISIT</a>
            </div>
          </div>

          <div className="four columns">
            <div className="right">
              <div className="rightimage">
                <img src="images/project-management.png" width="100%" alt="Admin Image" />
                <h1>Admin Assistance</h1>
                <h5>Message us for administrative assistance with specific inquiries and issues.</h5>
              </div>
              <a className="button button-primary" href="">CONTACT</a>
            </div>
          </div>
        </div>

          {/* Footer */}
          <footer>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                <button type="button">Feedback</button>
                </Link>
              </div>

              <div className= "tweleve columns">
              <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
              </p>
              </div>

            </div>

            </div>
          </footer>

      </div>
    );
  }
}

export default About;
