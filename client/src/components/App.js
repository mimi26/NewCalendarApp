import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import '../../src/App.css';
import '../../src/TimePicker.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import EventListDisplay from './EventListDisplay';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Nav from './Nav';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoggedIn: false
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);
  this.loginPost = this.loginPost.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  //this.renderAddEventIfLoggedIn = this.renderAddEventIfLoggedIn.bind(this);

  }

  componentDidMount() {
    this.getListData();
    }

  loginPost(data) {
    axios.post('/auth/api/login', data)
    .then((response) => {
      console.log('you are logged in!');
      this.setState({ isLoggedIn: true })
      }).catch((err) => {
      console.log(err);
    })
  }

  getListData() {
    axios.get('events/api')
      .then((response) => {
        let events = response.data.data;
      this.setState({ events });

    });

  }

  postListData(eventData) {
    axios.post('/events/api/new', eventData )
      .then((response) => {
        this.getListData();
      });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="jumbotron">
          <div>
          <Nav
            isLoggedIn={this.state.isLoggedIn}
            loginPost={this.loginPost}
            handleLogout={this.handleLogout}
            />
            <h1 className="heading">Event Scheduler</h1>

          </div>
            <div className="main container">
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login"
                render={() => <LoginForm
                                loginPost={this.loginPost}/>}
              />

              <Route exact path="/events"
                render={() =>  <EventListDisplay
                                  events={this.state.events}
                                  getListData={this.getListData}
                                  />}
              />
              <Route exact path="/new"
                render={() => <AddEventForm
                                postListData={this.postListData}/>}
               />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
