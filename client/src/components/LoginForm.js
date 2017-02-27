import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class LoginForm extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''

    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //reroute back to home
    this.props.loginPost(this.state);


  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleClick() {
    <Link to="/"></Link>
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}  className="form">
          <label>Username:</label>
          <input
            type="text"
            value={this.state.userName}
            onChange={this.handleUsernameChange}
          />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onKeyPress={(e) => this.keyPress(e)}
          />
          <input
            type="submit"
            value="Login"
            onClick={this.handleClick}
          />

        </form>
      </div>
    );
  }
}
