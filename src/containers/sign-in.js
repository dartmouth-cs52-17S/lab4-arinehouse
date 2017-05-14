import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmitClicked = (event) => {
    const user = { email: this.state.email, password: this.state.password };
    this.props.signinUser(user, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <div className="inputForm">
          <p>Sign In:</p>
          <input className="black-box" onChange={this.onEmailChange} placeholder="email" />
          <input className="black-box" onChange={this.onPasswordChange} placeholder="password" />
          <button className="done" onClick={this.onSubmitClicked}>Sign In</button>
        </div>
        <p>New to Redux Blog? <Link to="/signup" className="authlink">Sign Up!</Link></p>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
