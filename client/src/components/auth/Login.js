import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container main">
        <div className="row">
          <div className= "eight columns">
            <div className= "left">
              <p>Welcome to <b>WolframBeta</b> the site created by computer science students for computer students!</p>
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
                <b>Login below</b>
              </p>
              <p className="">
                Don't have an account?
                <Link
                  to="/register"> Register Here
                </Link>
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <p className="">
                  <b>Email</b>
                </p>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || 
                      errors.emailnotfound
                  })}
                />
                <label htmlFor="email"></label>
                <span className="">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="">
              <p className="">
                  <b>Password</b>
                </p>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  errors={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || 
                      errors.passwordincorrect
                  })}
                />
                <label htmlFor="password"></label>
                <span className="">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
                <div className="">
                <button type="submit">
                  Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Login;