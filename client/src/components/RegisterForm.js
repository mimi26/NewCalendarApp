import React from 'react';


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
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
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

