import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.renderLoginOrLogout = this.renderLoginOrLogout.bind(this);
  }

  renderLoginOrLogout() {
    if(this.props.isLoggedIn) {
      return (
        <Link to="/"
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
      <div className="fixed">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/events">Scheduled Events</Link>
          </li>
          <li className="nav-item">
            {this.renderLoginOrLogout()}
          </li>
          </ul>
      </div>
    );
  }
}
