const express = require('express');
const router = express.Router();
const models = require('../db/models/index');

router.post('/api/new', (req, res) => {
  models.Event.create({
    date: req.body.date,
    time: req.body.time,
    event_text: req.body.event_text,
    user_id: req.user.id

  }).then((response) => {
    console.log('event created');
  });
});

module.exports = router;
