const express = require('express');
const router = express.Router();
const models = require('../db/models/index');

router.post('/api/new', (req, res, next) => {
  models.Event.create({
    date: req.body.date,
    time: req.body.time,
    event_text: req.body.event_text,
    user_id: req.user.id

  }).then((response) => {
    console.log('event created');
  });
});

// router.get('/api', (req, res) => {
//   res.json({});
// })

router.get('/api', (req, res) => {
  models.Event.findAll({}).then((data) => {
    res.json({data})
    console.log(JSON.stringify(data[6].event_text));

  })
})

module.exports = router;
