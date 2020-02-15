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
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h4>
                <b>Register</b> below
                </h4>
              <p className="">
                Already have an account?
                  <Link to="/login">Login</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
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
                <label htmlFor="username">Username</label>
                <span className="">
                  {errors.username}
                </span>
              </div>
              <div className="">
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
                <label htmlFor="email">Email</label>
                <span className="">
                  {errors.email}
                </span>
              </div>
              <div className="">
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
                <label htmlFor="password1">Password</label>
                <span className="">
                  {errors.password1}
                </span>
              </div>
              <div className="">
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
                  Confirm Password
                  </label>
                <span className="">
                  {errors.password2}
                </span>
              </div>
              <div className="">
                <button type="submit">
                  Sign up
                </button>
              </div>
            </form>
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