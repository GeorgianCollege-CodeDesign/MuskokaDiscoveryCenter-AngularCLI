/**
 * Created by Esat IBIS on 2017-03-26.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */
const mongoose = require('mongoose');

let camperSchema = new mongoose.Schema({
  camperFirstName: {
    type: String,
    required: 'Camper first name is Required'
  },
  camperLastName: {
    type: String,
    required: 'Camper last name is Required'
  },
  parentFirstName: {
    type: String,
    required: "Parent first name is Required"
  },
  parentLastName: {
    type: String,
    required: "Parent last name is Required"
  },
  parentPhoneNumber : {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'User phone number required']
  },
  paymentType : String,
  camperAge: {
    type: Number,
    required: 'Camper\'s age is Required',
    min: 1
  },
  camperNotes : String,
  camperPickupList : [
    {
      firstName: String,
      lastName: String
    }
  ],
  startDate: Date,
  endDate: Date,
  absenceDays: [
    {
      absenceDay: Date
    }
  ],
  isActive: Boolean
});

// make this model public
module.exports = mongoose.model('Camper', camperSchema);
