const express = require('express');
const router = express.Router();
const moment = require('moment');

// User Model
require('../../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('user');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  User.find(req.query)
    .then(editors => res.json(editors));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', (req, res) => {
  const newEditor = new User({
    username: req.body.username,
    password: req.body.password,
    profilePicture: '/images/default-user.png',
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role
  });

  newEditor.save().then(editors => res.json(editors));
});

// @route   PUT api/posts
// @desc    Update A Post Status
// @access  Private
router.put('/status/:id', (req, res) => {
  let query = {};
  if (req.body.status === "Block") {
    query = {
      $set: {
        blockedAt: moment()
      }
    }
  } else if (req.body.status === "Unblock") {
    query = {
      $unset: {
        blockedAt: 1
      }
    }
  }
  User.findByIdAndUpdate(req.params.id, query, (err, updatedUser) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
    } else {
      User.find({role: req.body.role}).then(users => res.json(users));
    }
  })

});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(editor => editor.remove().then(() => res.json({
      success: true
    })))
    .catch(err => res.status(404).json({
      success: false
    }));
});

module.exports = router;