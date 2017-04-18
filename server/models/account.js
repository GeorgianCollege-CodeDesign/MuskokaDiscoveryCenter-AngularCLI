/**
 * Created by Esat IBIS on 2017-03-26.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

// reference passport-local-mongoose to make this model usable for managing Users
const plm = require('passport-local-mongoose');

// create the model schema.  username and password are included automatically
const accountSchema = new mongoose.Schema({
  // additional data might come here
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

accountSchema.plugin(plm);

accountSchema.pre('save', function(next) {
  let user = this;
  let SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/*
accountSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
*/



/*
accountSchema.methods.updatePassword = (password, conformPassword, cb) => {
  if (!password) {
    return cb(new BadRequestError(options.missingPasswordError));
  }
  if (password !== conformPassword) {
    return cb(new BadRequestError());
  }

  let self = this;

  crypto.randomBytes(options.saltlen, function(err, buf) {
    if (err) {
      return cb(err);
    }

    let salt = buf.toString('hex');

    crypto.pbkdf2(password, salt, options.iterations, options.keylen, function(err, hashRaw) {
      if (err) {
        return cb(err);
      }

      self.set(options.hashField, new Buffer(hashRaw, 'binary').toString('hex'));
      self.set(options.saltField, salt);

      cb(null, self);
    });
  });
};
*/

module.exports = mongoose.model('Account', accountSchema);
