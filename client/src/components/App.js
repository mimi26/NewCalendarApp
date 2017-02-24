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
      events: {},
      isLoggedIn: false
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);
  this.loginPost = this.loginPost.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.renderAddEventIfLoggedIn = this.renderAddEventIfLoggedIn.bind(this);

  }

  // componentDidMount() {
  //   this.getListData();
  //   }

  loginPost(data) {
    axios.post('/auth/api/login', data)
    .then((response) => {
      console.log('you are logged in!');
      this.setState({ isLoggedIn: true })
      console.log('this is state.isLoggedIn in loginpost:', this.state.isLoggedIn);
    }).catch((err) => {
      console.log(err);
    })
  }

  getListData() {
    // axios.get('https://calendarapp-eca54.firebaseio.com/.json')
    //   .then((response) => {
    //     let events = response.data;
    //     this.setState({ events });
    //   });
  }

  postListData(eventData) {
    axios.post('/api', eventData )
      .then((response) => {
        console.log(response);
      //this.getListData();
      });
  }

  handleLogout() {

    this.setState({ isLoggedIn: false });
    console.log('this is state.isLoggedIn in handleLogout:', this.state.isLoggedIn);
  }

  renderAddEventIfLoggedIn() {
    if(this.state.isLoggedIn) {
      return(
          <AddEventForm
              postListData={this.postListData}
            />
        )
    }
  }



  render() {
    return (
      <BrowserRouter>
        <div className="jumbotron">
          <div className="container">
          <Nav
            isLoggedIn={this.state.isLoggedIn}
            loginPost={this.loginPost}
            handleLogout={this.handleLogout}
            />
            <h1>Event Scheduler</h1>
           {this.renderAddEventIfLoggedIn()}
          </div>
            <div className="main">
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login"
                render={() => <LoginForm
                                loginPost={this.loginPost}/>}
              />
              <Route exact path="/events"
                render={() =>  <EventListDisplay
                                  events={this.state.events}
                                  getListData={this.getListData}/>}
              />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
