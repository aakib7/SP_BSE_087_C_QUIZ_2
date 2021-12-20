var express = require('express');
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/contact', function(req, res, next) {
  // User.insertOne({
  //   frist_name: 'aaqib',
  //   frist_name: 'javed',
  //   email: 'ajmehdi5@gmail.com',
  // contact_number: 03000,
  // password: 'zsfdsad',
  // });
  res.render('contact', { title: 'Contact' });
});
router.post('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
