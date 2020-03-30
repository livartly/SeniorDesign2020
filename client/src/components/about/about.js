import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
class About extends Component {
  render() {
    return (
      <div>
        <div className="container main">
          <Card>
            <Card.Header>Home</Card.Header>
            <Card.Body>
              <Card.Title><h7>Wolfram Beta is a website created by students for students</h7></Card.Title>
              <Card.Text>
              <h8>Whether you are struggling with discrete structures and mathematics or are 
          just looking to learn, Wolfram Beta has everything you need. Created by a team of 
          computer science majors, Wolfram Beta contains a wide variety of problem solvers
          to help you find answers. Not able to find what you are looking for? Feel free to contact us
          for further instruction and concerns.
        </h8>
              </Card.Text>
              <Link to="/feedback">
              <Button variant="primary">CONTACT</Button>
              </Link>
            </Card.Body>
          </Card>

          <div class="container">
            <div class="row">
              <div class="card-deck">
              <Link to="/">
              <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src="images/question.png" />
              <Card.Body>
                <Card.Title><h7>Get</h7></Card.Title>
                <Card.Title><h7>Answers!</h7></Card.Title>
                <Card.Text>
                  <h8>Enter Discrete Mathematics problems and receive instant answers
                  </h8>
                </Card.Text>
              </Card.Body>
            </Card>
            </Link>

            <Link to="/resources">
              <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src="images/book.png" />
              <Card.Body>
                <Card.Title><h7>Access Resources</h7></Card.Title>
                <Card.Text>
                  <h8>Visit our list of additional resources hand picked for struggling students
                  </h8>
                </Card.Text>
              </Card.Body>
            </Card>
            </Link>


            <Link to="/feedback">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="images/project-management.png" />
                  <Card.Body>
                    <Card.Title><h7>Admin Assistance</h7></Card.Title>
                    <Card.Text>
                      <h8>Message us for administrative assistance with specific inquiries and issues.
                      </h8>
                    </Card.Text>
                  </Card.Body>
            </Card>
            </Link>
              </div>
            </div>
          </div>
          </div>
          <br></br>
          <br></br>
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
