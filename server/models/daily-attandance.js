/**
 * Created by Esat IBIS on 2017-04-12.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */
const mongoose = require('mongoose');

let dailyAttendanceSchema = new mongoose.Schema({
  date: Date,
  camper: []
});

// make this model public
module.exports = mongoose.model('DailyAttendance', dailyAttendanceSchema);
