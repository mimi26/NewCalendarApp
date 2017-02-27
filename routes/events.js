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
    res.send({response})
  });
});

router.get('/api', (req, res, next) => {
  models.Event.findAll({}).then((data) => {
    res.json({data})
   })
})

router.delete('/api/:id', (req, res) => {
  models.Event.destroy({
    where: { id: req.params.id }
  }).then((event) => {
    res.send({event})
  });
});

module.exports = router;
