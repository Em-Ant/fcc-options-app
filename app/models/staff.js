
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Staff = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  roles: [{
    type: String,
    enum: ['driver', 'rider']
  }],
  medCertified: {
    type: Boolean,
    default: false
  },
  notes: String
});

module.exports = mongoose.model('Staff', Staff);
