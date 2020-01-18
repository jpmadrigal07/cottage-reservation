const express = require('express');
const router = express.Router();
const moment = require('moment');

// User Model
require('../../models/Reservation');
const mongoose = require('mongoose');
const Reservation = mongoose.model('reservation');

// @route   GET api/reservation
// @desc    Get All Reservation
// @access  Public
router.get('/', (req, res) => {
    req.query.deletedAt = {$exists: false};
    console.log(req.query)
    Reservation.find(req.query).populate({path : 'userId'}).populate({path : 'cottageId'}).exec((err, allReservation) => {
      if (err) {
        res.json({
          error: true
        })
      } else {
        res.json(allReservation)
      }
    });
});

// @route   POST api/reservation
// @desc    Create A Reservation
// @access  Private
router.post('/', (req, res) => {
  const newReservation = new Reservation({
    userId: req.body.userId,
    cottageId: req.body.cottageId,
    date: req.body.date
  });

  newReservation.save().then(reservation => res.json(reservation));
});

// @route   PUT api/reservation/:id
// @desc    Update A Reservation
// @access  Private
router.put('/:id', (req, res) => {
  const newReservation = {
    date: req.body.date
  };

  Reservation.findByIdAndUpdate(req.params.id, newReservation, (err, updatedReservation) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
    } else {
        res.json(updatedReservation);
    }
  })

});

// @route   PUT api/reservation/status/:id
// @desc    Update A Reservation Status
// @access  Private
router.put('/status/:id', (req, res) => {
  let query = {};
  if (req.body.status === "Approve") {
    query = {
      $set: {
        approvedAt: moment()
      }
    }
  } else if (req.body.status === "Disapprove") {
    query = {
      $unset: {
        approvedAt: 1
      }
    }
  }
    Reservation.findByIdAndUpdate(req.params.id, query, {new: true, useFindAndModify: false}, (err, updatedReservation) => {
      if (err) {
        res.json({
          error: true,
          message: err
        })
      } else {
        Reservation.find({}).populate({path : 'userId'}).populate({path : 'cottageId'}).exec((err, allReservation) => {
          if (err) {
            res.json({
              error: true
            })
          } else {
            res.json(allReservation)
          }
        });
      }
    })
  
  });

// @route   DELETE api/reservation/:id
// @desc    Delete A Reservation
// @access  Private
router.delete('/:id', (req, res) => {
  console.log(req.params.id)
    Reservation.findByIdAndUpdate(req.params.id, { $set: { deletedAt: moment() } }, {new: true, useFindAndModify: false}, (err, deletedReservation) => {
      if (err) {
        res.json({
          error: true,
          message: err
        })
      } else {
          res.json(deletedReservation);
      }
    })
});

module.exports = router;