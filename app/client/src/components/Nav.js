import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.renderLoginOrLogout = this.renderLoginOrLogout.bind(this);
  }

  renderLoginOrLogout() {
    if(this.props.isLoggedIn) {
      return (
        <Link to="/logout"
          onClick={this.props.handleLogout}>Logout</Link>
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
        <ul className="nav">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Scheduled Events</Link>
          </li>
          <li>
            {this.renderLoginOrLogout()}
          </li>
          </ul>
      </div>
    );
  }
}
