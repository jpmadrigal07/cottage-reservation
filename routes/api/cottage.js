const express = require('express');
const router = express.Router();
const moment = require('moment');
const uploadController = require("../../services/uploadController");

// User Model
require('../../models/Cottage');
const mongoose = require('mongoose');
const Cottage = mongoose.model('cottage');

// @route   GET api/cottage
// @desc    Get All Cottage
// @access  Public
router.get('/', (req, res) => {
  req.query.deletedAt = {$exists: false};
  Cottage.find(req.query)
    .then(cottage => res.json(cottage));
});

// @route   POST api/cottage
// @desc    Create A Cottage
// @access  Private
router.post('/', uploadController.uploadImages, uploadController.resizeImages, (req, res) => {
	if (req.files == undefined) {
		res.json({success: false})
	} else {
		Cottage.create(req.body, function (err, cottage) {
			if (err) {
        res.json({success: false})
			} else {
        Cottage.findOne({_id: cottage._id}).then(cottage => res.json(cottage));
			}
		})
	}
});

// @route   PUT api/cottage/:id
// @desc    Update A Cottage
// @access  Private
router.put('/:id', (req, res) => {
  const newCottage = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    imagePath: '/images/default-user.png'
  };

  Cottage.findByIdAndUpdate(req.params.id, newCottage, (err, updatedCottage) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
    } else {
        res.json(updatedCottage);
    }
  })

});

// @route   DELETE api/cottage/:id
// @desc    Delete A Cottage
// @access  Private
router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  Cottage.findByIdAndUpdate(req.params.id, { $set: { deletedAt: moment() } }, {new: true, useFindAndModify: false}, (err, deletedCottage) => {
    if (err) {
      res.json({
        error: true,
        message: err
      })
    } else {
        res.json(deletedCottage);
    }
  })
});

module.exports = router;