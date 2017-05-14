import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onSubmitClicked = (event) => {
    const user = { email: this.state.email, password: this.state.password, username: this.state.username };
    this.props.signupUser(user, this.props.history);
  }

  render() {
    return (
      <div>
        <input onChange={this.onEmailChange} placeholder="email" />
        <input onChange={this.onPasswordChange} placeholder="password" />
        <input onChange={this.onUsernameChange} placeholder="username" />
        <button onClick={this.onSubmitClicked}>Sign Up!</button>
        <p>Already an existing user? <Link to="/signin">Sign in!</Link></p>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
