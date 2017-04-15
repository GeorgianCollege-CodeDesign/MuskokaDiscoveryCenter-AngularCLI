/**
 * Created by Esat IBIS on 2017-03-05.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const localStrategy = require('passport-local').Strategy;

// Get our API routes
const api = require('./server/routes/api');
const globals = require('./server/config/globals');

const app = express();
app.set('trust proxy', 1); // trust first proxy
// connect to the database
mongoose.connect(globals.dbRemote);
const db = mongoose.connection;

db.once('open', function () {
  console.log('We connected to the mongoDB');
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// passport config BEFORE controller references
app.use(cookieParser());
app.use(session({
  secret: '58d830b1f515b32b56610320',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// use the Account model to manage users
let Account = require('./server/models/account');
passport.use(Account.createStrategy());

// read / write user login info to mongodb
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
