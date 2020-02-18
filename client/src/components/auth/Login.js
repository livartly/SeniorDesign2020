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
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h4>
                <b>Login</b> below
              </h4>
              <p className="">
                Don't have an account?
                <Link
                  to="/register">Register
                </Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
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
                <label htmlFor="email">Email</label>
                <span className="">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="">
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
                <label htmlFor="password">Password</label>
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
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Login;