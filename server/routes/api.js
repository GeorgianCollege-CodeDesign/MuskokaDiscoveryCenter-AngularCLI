/**
 * Created by Esat IBIS on 2017-03-05.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');

// middleware to use for all requests
router.use((req, res, next) =>{
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test API call
router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'hooray! welcome to our api!' });
});


/**
 * POST: post login information
 * */
router.post('/login', (req, res) => {

  passport.authenticate('local', function(err, user, info){

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log(user);
      res.status(200);
      res.json({
        "id": user._id,
        "username" : user.username
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

});

/**
 * POST: register information
 * */
router.post('/register', function(req, res) {
  // use the Account model to create a new user with passport
  //console.log(req);
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) { // failure
      console.log(err);
      res.status(406);
      res.json({message: "Some Error occurred."});
    }
    res.status(201); // success
    res.json({
      id : account._id,
      accountName: account.username,
      message: "New account is created"
    });
  });
});


module.exports = router;
