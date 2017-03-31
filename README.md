# Event Scheduler

![Screenshot of homepage](public/images/scheduler.png)

## Link to Event Scheduler

https://eventschedulerapp.herokuapp.com/events

## Description

Event Scheduler is a personal calendar app that you can use to keep track of appointments, events, interviews, birthdays, etc.

## Technologies Used
- HTML
- JSX
- CSS
- JavaScript
- React
- React Router DOM
- Bootstrap
- Express.js
- PostgreSQL
- Sequelize
- Passport
- Bcryptjs
- Express-Session
- Nodemon
- Github
- [Moment.js](http://momentjs.com/)
- [react-bootstrap-datepicker](https://github.com/pushtell/react-bootstrap-date-picker) for my date picker
- [react-datetime](https://github.com/YouCanBookMe/react-datetime) for my time picker
- [Axios](https://github.com/mzabriskie/axios)
- Google fonts

## Code Snippet: Setting up Events Routes

```javascript
//server side - setting up events route routes/events.js
router.get('/api', (req, res, next) => {
    models.Event.findAll({}).then((data) => {
    res.json({data})
   });
});

//client side - API call to fetch event data client/src/components/App.js
getListData() {
    axios.get('events/api')
        .then((response) => {
        let events = response.data.data;
        this.setState({ events });
    });
  }

componentDidMount() {
    this.getListData();
  }
```

## Complications/Future Improvements

Figuring out how the data flow between Express and React worked was a bit of a challenge at first. 

Future versions of this app will show weather forecast data for upcoming events. 

I would also like to add the ability to access map data for the event's location so users can find the location they need to get to more easily.

## Contributors

Mimi Klein