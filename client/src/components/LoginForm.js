import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
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
    axios.post('/auth/api/login', (this.state))
    .then((response) => {
      console.log('you are logged in!');
      //this.setState({ isLoggedIn: true })
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  renderLoginOrLogout() {
    if(this.state.isLoggedIn) {
      return (
        <Link to="/logout">Logout</Link>
        )
    } else {
      return (
        <Link to="/login">Login</Link>
        )
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <form onSubmit={this.handleSubmit}>
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
          />
          <input
            type="submit"
            value="Login"
          />
        </form>
      </div>
    );
  }
}
