import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';

export default class AddEventForm extends React.Component {


  constructor() {
    super();
      this.state = {
        unformattedDateValue: '',
        formattedTimeValue: '',
        unformattedTimeValue: '',
        isAddingEvent: false
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAddButtonOrForm = this.renderAddButtonOrForm.bind(this);
    this.handleCreateEventClick = this.handleCreateEventClick.bind(this);
    this.keyPress = this.keyPress.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleClick(event) {
    event.preventDefault();
    this.props.postListData({
      date: this.state.unformattedDateValue,
      time: this.state.unformattedTimeValue,
      event_text: this.state.eventTextValue
    });
    this.addEventForm.reset();
    this.setState({
      unformattedDateValue: '',
      formattedTimeValue: '',
      eventTextValue: '',
      isAddingEvent: false
    });
  }

  handleDateChange(unformattedDateValue, formattedValue) {
    this.setState({
      unformattedDateValue: unformattedDateValue,
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

  // handleTimeChange() {
  //   this.setState({ unformattedTimeValue: this.event.value });
  // }

  handleTextChange() {
    const eventTextValue = this.eventText.value;
    this.setState({ eventTextValue });
  }

  handleCreateEventClick() {
    this.setState({ isAddingEvent: true });
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.handleClick(e);
    }
  }

  renderAddButtonOrForm() {
    if(this.state.isAddingEvent) {
      return (
        <div>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            ref={(input) => this.addEventForm = input}
          >
            <div id="form">
              <h2>Create New Event:</h2>
              <DatePicker
                id="example-datepicker"
                value={this.state.unformattedDateValue}
                onChange={this.handleDateChange}
              />
              <DateTime
                dateFormat={false}
                inputProps={ {placeholder: "Time of Event"} }
                value={this.state.formattedTimeValue}
                onChange={this.handleTimeChange}
                />
              <textarea
                className="form-control"
                id="form-text"
                 rows="4" cols="40"
                placeholder="Event details"
                ref={(input) => this.eventText = input}
                onChange={this.handleTextChange}
                onKeyPress={(e) => this.keyPress(e)}
              >
              </textarea>
              <input
                className="btn btn-default"
                type="submit"
                value="Submit"
                onClick={(e) => this.handleClick(e)}
              />
            </div>
          </form>
        </div>
        );

    } else {
      return (
        <button className="btn btn-default create-event-btn"
          onClick={this.handleCreateEventClick}>+ Create New Event
        </button>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderAddButtonOrForm()}
    </div>
    )

  }
}

const propTypes = {
  postListData: React.PropTypes.func
};
AddEventForm.propTypes = propTypes;
