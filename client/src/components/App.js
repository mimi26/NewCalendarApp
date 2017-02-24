import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import '../../src/App.css';
import '../../src/TimePicker.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import EventListDisplay from './EventListDisplay';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: {},
      isLoggedIn: false
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);

  }

  componentDidMount() {
    this.getListData();
  }

  getListData() {
    // axios.get('https://calendarapp-eca54.firebaseio.com/.json')
    //   .then((response) => {
    //     let events = response.data;
    //     this.setState({ events });
    //   });
  }

  postListData(eventData) {
    axios.post('https://calendarapp-eca54.firebaseio.com/.json', { eventData })
      .then((response) => {
      this.getListData();
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="jumbotron">
          <div className="container">
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>

              </li>
            </ul>
            <h1>Event Scheduler</h1>
            <AddEventForm
              postListData={this.postListData}
            />
            </div>
            <div className="main">
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
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
