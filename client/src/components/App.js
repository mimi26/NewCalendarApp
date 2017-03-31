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
      isLoggedIn: false,
      isAddingEvent: false
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);
  this.loginPost = this.loginPost.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.renderEventsIfLoggedIn = this.renderEventsIfLoggedIn.bind(this);
  this.setIsAddingEventTrue = this.setIsAddingEventTrue.bind(this);
  this.setIsAddingEventFalse = this.setIsAddingEventFalse.bind(this);

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

  setIsAddingEventTrue(){
    this.setState({ isAddingEvent: true });
  }

  setIsAddingEventFalse() {
    this.setState({ isAddingEvent: false });
  }

  renderEventsIfLoggedIn() {
    if (this.state.isLoggedIn === true && this.state.events) {
      return (
        <div>
          <AddEventForm
            postListData={this.postListData}
          />
          <EventListDisplay
            events={this.state.event}
            getListData={this.getListData}
          />
        </div>
        )
    }
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
              <Route exact path="/"
                render={() => (!this.state.isLoggedIn ? <Redirect push to="/login" /> : <Redirect push to="/events" />)} />
                
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login"
                render={() => (this.state.isLoggedIn ? <Redirect push to='/events' /> : <LoginForm
                                loginPost={this.loginPost}
                                />) } />

              <Route exact path="/events"
                render={() => (!this.state.isLoggedIn ? <Redirect push to='/login' /> : <EventListDisplay
                                events={this.state.events}
                                getListData={this.getListData}
                                setIsAddingEventTrue={this.setIsAddingEventTrue}
                                setIsAddingEventFalse={this.setIsAddingEventFalse}  
                 />) } />

              <Route exact path="/new"
                render={() => (this.state.isAddingEvent === false ? <Redirect push to='/events' /> : <AddEventForm
                                postListData={this.postListData}
                                isAddingEvent={this.state.isAddingEvent}
                                setIsAddingEventFalse={this.setIsAddingEventFalse}
                                setIsAddingEventTrue={this.setIsAddingEventTrue}
                                />) } />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
