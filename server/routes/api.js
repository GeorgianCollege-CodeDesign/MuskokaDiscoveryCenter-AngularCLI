/**
 * Created by Esat IBIS on 2017-03-05.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');
const Camper = require('../models/camper');
const DailyAttendance = require('../models/daily-attandance');

// middleware to use for all requests
router.use((req, res, next) =>{
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();  // user has logged in already so continue to the next function
  }
  res.redirect('/login');
}

// test API call
router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'hooray! welcome to our api!' });
});


/**
 * POST: post login information
 * */
router.post('/login', (req, res) => {

  passport.authenticate('local', (err, user, info) => {

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
router.post('/register', (req, res) =>{
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



/// CAMPER RESTFUL SECTION

/**
 * GET: get all campers
 * */
router.get('/campers', (req, res) => {

  Camper.find((err, campers) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.json({
        message: "Camper not found."
      });
      return;
    }
    // return all the campers if there is no error
    res.json(campers);
  });
});

/**
 * GET: get specific camper with the given ID
 * */
router.get('/campers/:camper_id', (req, res) => {
  Camper.findById(req.params.camper_id, (err, camper) => {
    if (err) {
      console.log(err);
      res.status(404); // Not found
      res.json({
        message: "Camper not found."
      });
      return;
    }
    // return camper if everything is okay
    res.status(200); // Okay
    res.json(camper);
  });
});


/**
 * GET: get all the active campers
 **/
router.get('/active-campers', (req, res) => {
  Camper.find((err, campers) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.json({
        message: "Camper not found."
      });
      return;
    }
    let returnArray = [];
    console.log(campers);
    for (let key in campers) {
      if (campers.hasOwnProperty(key))
      {
        let camper = campers[key];
        let startDate = new Date(camper.startDate).getTime();
        let endDate = new Date(camper.endDate).getTime();
        let today = new Date().getTime();
        console.log(`first: ${today - startDate} - second:  ${endDate - today} - today ${endDate}`);
        // check if the end date is passed. if it's not push that camper to the active list
        if ((endDate - today) > 0) {
          returnArray.push(camper);
        }
      }
    }
    if (returnArray.length > 0)
      res.json(returnArray).status(200);
    else {
      res.json({
        message: 'No active camper found.'
      });
    }
  });
});

/**
 * POST: create a new camper
 * */
router.post('/campers', (req, res) => {
  Camper.create({
    camperFirstName: req.body.camperFirstName,
    camperLastName: req.body.camperLastName,
    parentFirstName: req.body.parentFirstName,
    parentLastName: req.body.parentLastName,
    parentPhoneNumber: req.body.parentPhoneNumber,
    paymentDays: req.body.paymentType,
    camperAge: req.body.camperAge,
    camperNotes: req.body.camperNotes,
    camperPickupList: req.body.camperPickupList,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    absenceDays: req.body.absenceDays,
    isActive: req.body.isActive,
    pickupHistory: req.body.pickupHistory
  }, (err) => {
    if (err) {
      console.log(err);
      res.status(406); // Not acceptable
      res.json({
        message: "Creating a new camper failed."
      });
      return;
    }
    // new camper successfully created
    res.status(201); // Created
    res.json({
      message: "New Camper created."
    })
  });
});

/**
 * PUT: update the existing camper with the given ID
 * */
router.put('/campers/:camper_id', (req, res) => {
  let camper = new Camper({
    _id: req.params.camper_id,
    camperFirstName: req.body.camperFirstName,
    camperLastName: req.body.camperLastName,
    parentFirstName: req.body.parentFirstName,
    parentLastName: req.body.parentLastName,
    parentPhoneNumber: req.body.parentPhoneNumber,
    paymentDays: req.body.paymentDays,
    camperAge: req.body.camperAge,
    camperNotes: req.body.camperNotes,
    camperPickupList: req.body.camperPickupList,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    absenceDays: req.body.absenceDays,
    isActive: req.body.isActive,
    pickupHistory: req.body.pickupHistory
  });


  Camper.update({ _id: req.params.camper_id }, camper, function(err) {
    if (err) {
      console.log(err);
      res.status(409); // Conflict
      res.json({
        message: "Camper info couldn't updated."
      });
      return;
    }
    res.status(200); // Okay
    res.json({
      message: "Camper updated"
    });
  });
});

/**
 * DELETE: delete the existing camper with the given ID
 * FIXME: uncomment the isLoggedIn in prod
 * */
router.delete('/campers/:camper_id', /*isLoggedIn,*/ (req, res) => {
  console.log('This is camper delete.');
  Camper.remove({ _id: req.params.camper_id }, function(err) {
    if (err) {
      console.log(err);
      res.status(400); // Bad request
      res.json({
        message: "Camper couldn't deleted."
      });
      return;
    }
    // no error so show updated games list
    res.status(200); // Okay
    res.json({
      message: "Camper deleted"
    });
  });
});


/// ADMIN RESTFUL SECTION
/**
 * GET: get all the admins
 * */
router.get('/admins', (req, res) => {

  Account.find((err, admin) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.json({
        message: "Admin not found."
      });
      return;
    }
    // return all the campers if there is no error
    res.json(admin);
  });
});

/**
 * GET: get specific admin with given ID
 * */
router.get('/admins/:admin_id', (req, res) => {

  Account.findById(req.params.admin_id, (err, admin) => {
    if (err) {
      console.log(err);
      res.status(404); // Not found
      res.json({
        message: "Camper not found."
      });
      return;
    }
    // return camper if everything is okay
    res.status(200); // Okay
    res.json(admin);
  });
});

/**
 * POST: create a new admin
 * */
router.post('/admins', (req, res) => {
  Account.register(new Account(
    {
      username: req.body.username,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    ), req.body.password, function(err, account) {
    if (err) { // failure
      console.log(err);
      res.status(406);
      res.json({message: "Some Error occurred."});
    }
    res.status(201); // Created
    res.json({
      id : account._id,
      accountName: account.username,
      message: "New account is created"
    });
  });
});

/**
 * PUT: update an existing admin with given ID
 * */
router.put('/admins/admin_id', (req, res) => {
  // do this part later
  Account.update({_id: req.session.passport.user}, {
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  },function(err) {
    if (err) {
      res.status(501);
      res.json(err);
      return;
    }
    res.status(200);
    // maybe send something back
  });
});

/**
 * DELETE: delete an existing admin with given ID
 * */
router.delete('/admins/:admin_id', isLoggedIn , (req, res) => {
  Account.remove({ _id: req.params.admin_id }, function(err) {
    if (err) {
      console.log(err);
      res.status(400); // Bad request
      res.json({
        message: "Admin couldn't deleted."
      });
      return;
    }
    // no error so show updated games list
    res.status(200); // Okay
    res.json({
      message: "Admin deleted"
    });
  });
});


router.get('/camper/:firstName/:lastName', (req, res) => {
  let firstName = req.params.firstName;
  let lastName = req.params.lastName;

  Camper.find({
    camperFirstName: firstName,
    camperLastName: lastName
  }, (err, camper) => {
    if (err){
      res.status(501);
      res.json(err);
      return;
    }
    res.status(200);
    res.json(camper);
  });


});



// CAMPER sign in and sign out

/**
 * POST: get the camper ID and update the sign in date and signer
 * write the signed in camper in daily attendance document.
 * */
router.post('/camper-sign-in/:camper_id', (req, res) => {
  let camperGuardian = req.body.camperParent;
  let todayDate = new Date().toISOString().slice(0,10); // Format YYYY-MM-DD

  Camper.findOneAndUpdate({_id: req.params.camper_id}, {
    $push: {
      pickupHistory: {
        date: todayDate,
        dropOff: camperGuardian,
        pickUp: null
      }
    }
  }, {new: true, safe: true, upsert: true},
    (err, camper) => {
    if (err){
      return res.json(err).status(501);
    }

    DailyAttendance.findOneAndUpdate({date: todayDate}, {
        date: todayDate,
        $push: {
          camper: camper
        }
    }, {new: true, safe: true, upsert: true},
      (err, dailyAttendance) => {
        if (err) {
          return res.json(err).status(501);
        }

        res.json(dailyAttendance).status(200);
      });
  })

});

/**
 * GET: get all the campers who signed in today
 * */
router.get('/daily-campers', (req, res) => {
  DailyAttendance.find((err, dailyAttendance) =>{
    if (err){
      return res.json(err).status(501);
    }
    res.json(dailyAttendance).status(200);
  })
});

/**
 * POST: get the camper ID and update the sign out date and signer
 * */
router.post('/camper-sign-out/:camper_id', (req, res) => {

});


module.exports = router;
