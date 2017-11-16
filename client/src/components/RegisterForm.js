import React from 'react';
import axios from 'axios';

export default class RegisterForm extends React.Component {

  render() {
    const { handleRegisterUserSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleRegisterUserSubmit}   className="form">
          <label>First Name:</label>
          <input
            type="text"
            value={this.state.firstName}
            name="firstName"
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={this.state.lastname}
            name="lastName"
          />
          <label>Email:</label>
          <input
            type="text"
            value={this.state.email}
            name="email"
          />
          <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
            />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            name="password"
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

