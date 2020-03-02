import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
              {/* <p>Welcome to <b>WolframBeta</b> the site created by computer science students for computer students!</p> */}
              <h2>Built for students</h2>
              <h2>by students.</h2>
              <p>Discrete structures can be hard to understand so we have created a site to assist students with finding solutions for:</p>
              <h5>·Symbolic Representations, Tautologies, Propositional Logic</h5>
              <h5>·Recursive definitions</h5>
              <h5>·Sets</h5>
              <h5>·Relations, Topological Sorting, Functions, Order of Magnitude</h5>
              <h5>·Boolean Matrices</h5>
              <p>Log in to access problem solving features, resources, and more!</p>
            </div>
          </div>
          <div className="four columns">
            <div className="center">
              <p>
                <b>Register below </b>
                </p>
              <p className="">
                Already have an account? 
                  <Link to="/login"> Login Here</Link>
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              {/* <div className=""> */}
              <p className="">
                  <b>Username</b>
                </p>
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", { // try erasing
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username"></label>
                <span className="">
                  {errors.username}
                </span>
              {/* </div> */}
              {/* <div className=""> */}
              <p className="">
                  <b>Email</b>
                </p>
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
              {/* </div> */}
              {/* <div className=""> */}
              <p className="">
                  <b>Password</b>
                </p>
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
              {/* </div> */}
              {/* <div className=""> */}
              <p className="">
                  <b>Confirm Password</b>
                </p>
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
              {/* </div> */}
              <div className="">
                <button type="submit">
                  Sign up
                </button>
              </div>
            </form>
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