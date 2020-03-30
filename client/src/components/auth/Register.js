import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'

import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    this.props.clearErrors();
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container main">
        <div className="row">
          <div className= "eight columns">
            <div className= "left">
              <Card>
                <Card.Body>
                  <Card.Title><h2>Built for students</h2><h2>by students.</h2></Card.Title>
                  <Card.Text>
                <h8>Discrete structures can be hard to understand so we have created a site to assist students with finding solutions for the problem 
                  types below. Log in to access problem solving features, resources, and more!
                </h8>

                <br></br>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>  Symbolic Representations, Tautologies, Propositional Logic</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Recursive definitions</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Sets</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Relations, Topological Sorting, Functions, Order of Magnitude</td>
                      <td></td>
                      <td></td>
                    </tr>
                  <tr>
                      <td>  Boolean Matrices</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="four columns">
            <div className="center">
            <Card>
                <Card.Body>
                  <Card.Title><h7>Register below</h7></Card.Title>
                  <Card.Text>
                  <h8>Already have an account? </h8>
                  <Link
                  to="/register"> <h9>Login Here</h9>
                  </Link>
                  </Card.Text>
                    <form noValidate onSubmit={this.onSubmit}>
 
                  <h8><b>Username</b></h8>
                  <br></br>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", { 
                      invalid: errors.username
                    })}
                  />
                  <label htmlFor="username"></label>
                  <span className="">
                    {errors.username}
                  </span>
 
                  <h8><b>Email</b></h8>
                  <br></br>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email"></label>
                  <span className="">
                    {errors.email}
                  </span>


                  <h8><b>Password</b></h8>
                  <br></br>
                  <input
                    onChange={this.onChange}
                    value={this.state.password1}
                    error={errors.password1}
                    id="password1"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password1
                    })}
                  />
                  <label htmlFor="password1"></label>
                  <span className="">
                    {errors.password1}
                  </span>


                  <h8><b>Confirm Password</b></h8>
                  <br></br>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">
                    </label>
                  <span className="">
                    {errors.password2}
                  </span>
                <div className="">
                  <button type="submit">
                    Sign up
                  </button>
                </div>
              </form>
                </Card.Body>
            </Card>


            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Register;