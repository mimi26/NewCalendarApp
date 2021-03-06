import React from 'react';

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
    this.props.loginPost(this.state);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  // keyPress(e) {
  //   if (e.charCode === 13) {
  //     this.handleClick();
  //   }
  // }

  render() {
    return (
      <div>
        <h3 className="open text-center">Log in to add or edit your events</h3>
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
