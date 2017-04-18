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
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// middleware to use for all requests
router.use((req, res, next) =>{
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// FIXME: change the commented line to uncomment in prod
function isLoggedIn(req, res, next) {
  //if (req.isAuthenticated())
    return next();  // user has logged in already so continue to the next function
  //res.status(401).send({message: 'Not Authorized.'});
}

// FIXME: change the commented line to uncomment in prod
function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    //if (req.user.passport.role === 'admin')
      return next();  // user has logged in already so continue to the next function
  }
  //res.status(401).send({message: 'Not Admin.'});
  return next();
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
      let response = {
        id: user._id,
        username : user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      console.log(response);
      res.json(response).status(200);
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

});

/**
 * POST: password change method
 * */
// FIXME : fix this mess
router.post('/change-password', (req, res) => {
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;
  console.log(req.session.passport.user);

});

/**
 * POST: register information
 * */
router.post('/register', (req, res) =>{
  // use the Account model to create a new user with passport
  //console.log(req);
  Account.register(new Account({
    username: req.body.username,
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }), req.body.password, function(err, account) {
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


/// ----------------------------------------------------------------------------------------
/// -------------------------- CAMPER RESTFUL SECTION --------------------------------------
/// ----------------------------------------------------------------------------------------
/**
 * GET: get all campers
 * */
router.get('/campers', isLoggedIn, (req, res) => {

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
router.get('/campers/:camper_id', isLoggedIn, (req, res) => {
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
router.get('/active-campers', isLoggedIn, (req, res) => {
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
        let today = new Date();
        let tempToday = `${ISOtoYYYYMMDD(today)}T04:00:01`;
        today = new Date(tempToday);

        console.log(`first: ${today - startDate} - second:  ${endDate - today} - today ${endDate}`);
        // check if the end date is passed. if it's not push that camper to the active list
        if ((endDate - today) > 0) {
          camper.isActive = true;
          returnArray.push(camper);
        } else {
          camper.isActive = false;
        }
        camper.save((err)=> {
          if(err) {
            console.error('Can not save the camper');
          }
        });
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
router.post('/campers', isLoggedIn, (req, res) => {
  Camper.create({
    camperFirstName: req.body.camperFirstName,
    camperLastName: req.body.camperLastName,
    parentFirstName: req.body.parentFirstName,
    parentLastName: req.body.parentLastName,
    parentPhoneNumber: req.body.parentPhoneNumber,
    paymentDays: req.body.paymentDays || 1,
    camperAge: req.body.camperAge,
    camperNotes: req.body.camperNotes,
    camperPickupList: req.body.camperPickupList,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    absenceDays: req.body.absenceDays || [],
    isActive: req.body.isActive || true,
    pickupHistory: req.body.pickupHistory || []
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
router.put('/campers/:camper_id', isLoggedIn, (req, res) => {
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
router.delete('/campers/:camper_id', isLoggedIn, (req, res) => {
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


// CAMPER sign in and sign out

/**
 * POST: get the camper ID and update the sign in date and signer
 * write the signed in camper in daily attendance document.
 * */
router.post('/camper-sign-in/:camper_id', isLoggedIn, (req, res) => {
  let camperGuardian = req.body.camperParent;
  let todayDate = ISOtoYYYYMMDD(new Date()); // Format YYYY-MM-DD

  Camper.findOneAndUpdate({_id: req.params.camper_id}, {
      $push: {
        pickupHistory: {
          date: todayDate,
          dropOff: camperGuardian,
          pickUp: null
        }
      }
    }, { new: true, safe: true, upsert: true },
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
    });

});

/**
 * GET: get all the campers who signed in today
 * */
router.get('/daily-campers', isLoggedIn, (req, res) => {
  DailyAttendance.find((err, dailyAttendance) =>{
    if (err){
      return res.json(err).status(501);
    }
    for(let i = 0; i < dailyAttendance.length; i++){
      let date =  dailyAttendance[i].date;

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      let tempDt;
      let tempMonth;

      if (dt < 10) {
        tempDt = '0' + dt;
      }
      else {
        tempDt = dt.toString();
      }
      if (month < 10) {
        tempMonth = '0' + month;
      } else {
        tempMonth = month.toString()
      }
      //console.log('ISO YEAR ' + year + '-' + tempMonth + '-' + tempDt);
      let day = (year + '-' + tempMonth + '-' + tempDt);
      let today = ISOtoYYYYMMDD(new Date());

      console.log('Day: ' + day);
      console.log('Today: ' + today);
      if (day === today){
        return res.json(dailyAttendance[i]).status(200);
      }
    }
    res.status(210).send([]);
  })
});

/**
 * POST: get the camper ID and update the sign out date and signer
 * */
router.post('/camper-sign-out/:camper_id', isLoggedIn, (req, res) => {
  let todayDate = ISOtoYYYYMMDD(new Date());
  let camperParent = req.body.camperParent;

  Camper.findOne({ _id: req.params.camper_id},
    (err, camper) => {
      if (err){
        return res.json(err).status(501);
      }
      for (let  i = 0; i < camper.pickupHistory.length; i++) {
        //console.log(camper.pickupHistory[i]);
        if ((todayDate === camper.pickupHistory[i].date)){
          camper.pickupHistory[i].pickUp = camperParent;
        }
      }
      camper.save((err)=> {
        if(err) {
          console.error('Can not save the camper');
          return;
        }
        DailyAttendance.findOne({date: todayDate},
          (err, dailyAttendance) => {
            if (err) {
              return res.json(err).status(501);
            }

            for(let i = 0; i < dailyAttendance.camper.length; i++) {
              console.log(dailyAttendance.camper[i]._id);
              console.log(camper._id);

              if(dailyAttendance.camper[i]._id.toString() === camper._id.toString()){
                console.log('dSADSADSAD');
                dailyAttendance.camper[i] = camper;
                console.log(dailyAttendance.camper[i]);
              }

            }
            DailyAttendance.findOneAndUpdate({_id: dailyAttendance._id}, dailyAttendance, (err)=> {
              if (err)
                return console.log(err);
              res.json(dailyAttendance).status(200);
            });
          })
      });
      //res.json(camper).status(200);
    });
});

/**
 * GET: get the camper with given name and last name
 * */
router.get('/camper/:firstName/:lastName', isLoggedIn, (req, res) => {
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


/// --------------------------------------------------------------------------------------------------------
/// ---------------------------------- ADMIN RESTFUL SECTION -----------------------------------------------
/// --------------------------------------------------------------------------------------------------------
/**
 * GET: get all the admins
 * */
router.get('/admins', isAdmin, (req, res) => {

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
router.get('/admins/:admin_id', isAdmin, (req, res) => {

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
router.post('/admins', isAdmin, (req, res) => {
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
router.put('/admins/:admin_id', isAdmin, (req, res) => {
  // do this part later
  Account.update({_id: req.params.admin_id}, {
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
    res.json({message: `Update of ${req.params.admin_id} is successful`}).status(200);
    // maybe send something back
  });
});

/**
 * DELETE: delete an existing admin with given ID
 * */
router.delete('/admins/:admin_id', isAdmin, (req, res) => {
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


/**
 * @description: Gets a date value and converts it to YYYY-MM-DD format string
 * @date: date parameter
 * @return: YYYY-MM-DD format of the given date
 * */
function ISOtoYYYYMMDD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  let tempDt;
  let tempMonth;

  if (dt < 10) {
    tempDt = '0' + dt;
  }
  else {
    tempDt = dt.toString();
  }
  if (month < 10) {
    tempMonth = '0' + month;
  } else {
    tempMonth = month.toString()
  }
  //console.log('ISO YEAR ' + year + '-' + tempMonth + '-' + tempDt);
  return (year + '-' + tempMonth + '-' + tempDt);
}

router.get('/logout', function (req, res) {
  req.logout();
  res.json({message: 'Logging out successful.'}).status(200);
});


/*---------------------------------------------------------------------------*/



router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        let token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      Account.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
         console.log(err)
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {

       let transporter = nodemailer.createTransport({
       service: 'gmail',
         auth: {
           user: 'muskoka.discovery.center@gmail.com',
           pass: 'Muskoka2017'
         }
       });


      // link to follow https://nodemailer.com/usage/using-gmail/

      /*let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers:'SSLv3'
        },
        auth: {
          user: '!!!your email address here !!!',
          pass: '!!!your password here !!!'
        }
      });*/
      let mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        res.json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' }).status(200);
        //done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return console.log(err);
  });
});





router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return;
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'muskoka.discovery.center@gmail.com',
          pass: 'Muskoka2017'
        }
      });


      // link to follow https://nodemailer.com/usage/using-gmail/

      /*let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers:'SSLv3'
        },
        auth: {
          user: '!!!your email address here !!!',
          pass: '!!!your password here !!!'
        }
      });*/

      let mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        res.json( { message: 'Success! Your password has been changed.' }).status(200);
        done(err);
      });
    }
  ], function(err) {
  });
});
module.exports = router;
