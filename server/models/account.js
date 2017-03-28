/**
 * Created by Esat IBIS on 2017-03-26.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

const mongoose = require('mongoose');

// reference passport-local-mongoose to make this model usable for managing Users
const plm = require('passport-local-mongoose');

// create the model schema.  username and password are included automatically
const accountSchema = new mongoose.Schema({
  // additional data might come here
  role: String
});

accountSchema.plugin(plm);

module.exports = mongoose.model('Account', accountSchema);
