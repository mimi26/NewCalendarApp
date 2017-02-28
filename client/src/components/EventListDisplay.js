import React from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AddEventForm from './AddEventForm';


export default class EventListDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
        formattedDateValue: '',
        unformattedDateValue: '',
        formattedTimeValue: '',
        unformattedTimeValue: ''
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleEditClick(eventIndex) {
    const { events } = this.props;
    console.log(events);
      this.setState({
        eventToEdit: events[eventIndex].id,
        formattedDateValue: events[eventIndex].date,
        formattedTimeValue: events[eventIndex].formattedTimeValue,
        unformattedDateValue: events[eventIndex].time,
        unformattedTimeValue: events[eventIndex].unformattedTimeValue,
        eventTextValue: events[eventIndex].event_text
  });
}

  handleSubmit(e) {
    e.preventDefault();

  }

  patchListData(editedData) {
    let id = this.state.eventToEdit;
    axios.put(`/events/api/${id}`, {
        date: this.state.formattedDateValue,
        time: this.state.unformattedTimeValue,
        event_text: this.state.eventTextValue
     })
      .then((response) => {
      this.props.getListData();
      this.setState({ eventToEdit: null });
     });
  }

  handleClick() {
    this.patchListData(this.state);
 }

  handleDateChange(dateValue, formattedValue) {
    this.setState({
      unformattedDateValue: dateValue,
      formattedDateValue: formattedValue
       });
  }

   handleTimeChange(timeValue) {
    let formattedTime = moment(timeValue).format("hh:mm A");
    this.setState({
      formattedTimeValue: formattedTime,
      unformattedTimeValue: timeValue
       });
  }

  handleTextChange() {
    const eventTextValue = this.eventText.value;
    this.setState({ eventTextValue });
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.handleClick(e);
    }
  }

  renderItemOrEditField(key) {
    const { events } = this.props;
      if ( this.state && this.state.eventToEdit === events[key].id) {
        return (
          <li  key={key}  className="event-item">
            <form
              onSubmit={(e) => this.handleSubmit(e)}
              ref={(input) => this.addEventForm = input}
            >
              <input
                type="submit"
                value="Save Changes"
                onClick={() => this.handleClick(key)}
              />
              <DatePicker
                id="example-datepicker"
                value={this.state.unformattedDateValue}
                onChange={this.handleDateChange}
              />
               <DateTime
                  dateFormat={false}
                  inputProps={ {placeholder: "Time"} }
                  value={this.state.formattedTimeValue}
                  onChange={this.handleTimeChange}
                />
              <textarea
                type="text"
                placeholder="Event details"
                ref={(input) => this.eventText = input}
                onChange={this.handleTextChange}
                defaultValue={events[key].eventTextValue}
                onKeyPress={(e) => this.keyPress(e)}
              >
              </textarea>
            </form>
          </li>
      );
    } else if (events) {
      return (
        <li>
          <div id="event-data">
          <span className="glyphicon glyphicon-remove  col-md-1 col-xs-12" onClick={() => this.handleDeleteClick(events[key].id)}></span>
            <p id="date" className="col-md-2 col-sm-6 col-xs-12"><span className="item-header">Date:</span>{moment(events[key].date).format("M/DD/YYYY")}</p>
            <p id="time"  className="col-md-2 col-xs-12"><span className="item-header">Time:</span>{moment(events[key].time).format("h:mm A")}</p>
            <p id="display-text" className="col-md-6 col-xs-12"><span className="item-header">Scheduled Event:</span>{events[key].event_text}</p>
            <button className="btn btn-default edit-button col-md-1 col-xs-3" onClick={() => this.handleEditClick(key)}>Edit Event</button>
            </div>
        </li>
      );
    }
  }

   handleDeleteClick(eventId) {
    axios.delete(`/events/api/${eventId}`)
      .then(response => {
        let events = this.props.events;
        delete events[eventId]
        this.setState({ events })
        this.props.getListData();
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { events } = this.props;
      return (
        <div id="event-list">
          <Link to="/new">
            <button className="btn btn-default create-event-btn">
            + Create New Event
            </button>
          </Link>
          <h2>Scheduled Events:</h2>
          <ul>
            {Object.keys(events)
            .map((key) => {return this.renderItemOrEditField(key)})}
          </ul>
        </div>
      );
    }
  }

const propTypes = {
  event: React.PropTypes.object,
  getListData: React.PropTypes.func,
};
EventListDisplay.propTypes = propTypes;
