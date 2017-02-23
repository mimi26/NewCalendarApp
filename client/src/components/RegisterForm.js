import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export default class RegisterForm extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postUserRegistrationData = this.postUserRegistrationData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postUserRegistrationData(this.state);
    //reroute back to home
  }

  postUserRegistrationData(data) {
    axios.post('/auth/api/register', data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  handleFirstNameChange(event) {
    this.setState({ firstName : event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({ lastName : event.target.value});
  }

  handleEmailChange(event) {
    this.setState({ email : event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({ userName : event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({ password : event.target.value});
  }

  render() {
    return (
      <div>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={this.state.lastname}
            onChange={this.handleLastNameChange}
          />
          <label>Email:</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
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
            value="Register"
          />
       </form>
      </div>
    );
  }
}

