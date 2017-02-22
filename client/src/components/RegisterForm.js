import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export default class RegisterForm extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastname: '',
      userName: '',
      password: '',
      email: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postUserRegistrationData = this.postUserRegistrationData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postUserRegistrationData(this.state);
    //reroute back to home
  }

  postUserRegistrationData(data) {
    axios.post('/api/register', { data })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
            onChange={this.handleChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Username:</label>
            <input
              type="text"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
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

