import React from 'react';
import '../../src/App.css';
import '../../src/TimePicker.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import EventListDisplay from './EventListDisplay'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: {}
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);

  }

  componentDidMount() {
    this.getListData();
  }

  getListData() {
    axios.get('https://calendarapp-eca54.firebaseio.com/.json')
      .then((response) => {
        let events = response.data;
        this.setState({ events });
      });
  }

  postListData(eventData) {
    axios.post('https://calendarapp-eca54.firebaseio.com/.json', { eventData })
      .then((response) => {
      this.getListData();
      });
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1>Event Scheduler</h1>
          <AddEventForm
            postListData={this.postListData}
          />
          <EventListDisplay
            events={this.state.events}
            getListData={this.getListData}
          />
        </div>
      </div>
    );
  }
}
