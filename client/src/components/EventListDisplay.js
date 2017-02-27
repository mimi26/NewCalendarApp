import React from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';


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
    this.renderItems = this.renderItems.bind(this);

  }

  handleEditClick(eventId) {
    const { events } = this.props;
      this.setState({
        eventToEdit: eventId,
        formattedDateValue: events[eventId].eventData.formattedDateValue,
        formattedTimeValue: events[eventId].eventData.formattedTimeValue,
        unformattedDateValue: events[eventId].eventData.unformattedDateValue,
        unformattedTimeValue: events[eventId].eventData.unformattedTimeValue,
        eventTextValue: events[eventId].eventData.eventTextValue
  });
}

  handleSubmit(e) {
    e.preventDefault();

  }

  patchListData(editedData) {
    let id = this.state.eventToEdit;
    axios.patch(`https://calendarapp-eca54.firebaseio.com/${id}.json`, { eventData: editedData })
      .then((response) => {
      this.props.getListData();
      this.setState({ eventToEdit: null });
     });
  }

  handleClick() {
    this.patchListData(this.state);
 }

 //  handleDateChange(date) {
 //    this.setState({ date })
 // }

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
      if ( this.state && this.state.eventToEdit === key ) {
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
                defaultValue={events[key].eventData.eventTextValue}
                onKeyPress={(e) => this.keyPress(e)}
              >
              </textarea>
            </form>
          </li>
      );
    } else {
      return (
        <li  key={key} className="event-item row">
          <span className="glyphicon glyphicon-remove  col-md-1 col-xs-12" onClick={() => this.handleDeleteClick(key)}></span>
          <div id="event-data">
            <p id="date" className="col-md-2 col-sm-6 col-xs-12"><span className="item-header">Date:</span>{events[key].eventData.formattedDateValue}</p>
            <p id="time"  className="col-md-2 col-xs-12"><span className="item-header">Time:</span>{events[key].eventData.formattedTimeValue}</p>
            <p id="display-text" className="col-md-6 col-xs-12"><span className="item-header">Scheduled Event:</span>{events[key].eventData.eventTextValue}</p>
          </div>
            <button className="btn btn-default edit-button col-md-1 col-xs-3" onClick={() => this.handleEditClick(key)}>Edit Event</button>
        </li>
      );
    }
  }

   handleDeleteClick(eventId) {
    axios.delete(`https://calendarapp-eca54.firebaseio.com/${eventId}.json`)
      .then(response => {
        let events = this.props.events;
        delete events[eventId]
        this.setState({ events })
      }).catch((error) => {
        console.error(error);
      });
  }

  // renderItems() {
  //   const events = this.props.events.data;
  //   console.log(events);
  //   if (events) {
  //     events.map((item) => { return (
  //       <li key={item.id}>hi{item.event_text}</li>
  //     )})
  //   } else {
  //     return (<li>hi</li>)
  //   }
  // }

  renderItems(key) {
    const events = this.props.events;
      if(events) {
        return (
        <div>
          <span className="glyphicon glyphicon-remove  col-md-1 col-xs-12"></span>
          <div id="event-data">
            <p id="date" className="col-md-2 col-sm-6 col-xs-12"><span className="item-header">Date:</span>{events[key].date}</p>
            <p id="time"  className="col-md-2 col-xs-12"><span className="item-header">Time:</span>{events[key].time}</p>
            <p id="display-text" className="col-md-6 col-xs-12"><span className="item-header">Scheduled Event:</span>{events[key].event_text}</p>
          </div>
            <button className="btn btn-default edit-button col-md-1 col-xs-3" onClick={() => this.handleEditClick(key)}>Edit Event</button>
          </div>
        )
    }
  }

  render() {
    //const events = JSON.stringify(this.props.events.data);
    const { events } = this.props;
    //console.log(events);
    return (
      <div id="event-list">
      <h2>Scheduled Events:</h2>
      <ul>
        {Object.keys(events)
          .map((key) => {return this.renderItems(key)})}
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
