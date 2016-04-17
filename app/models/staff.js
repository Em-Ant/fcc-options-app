var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var Staff = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a staff member name'],
    unique: true
  },
  roles: [{
    type: String,
    validate: {
      validator: function(roles) {
        return roles.length;
      },
      message: 'Please select a role'
    },
    enum: ['driver', 'rider']
  }],
  medCertified: {
    type: Boolean,
    default: false
  },
  notes: String
});


Staff.plugin(uniqueValidator, {
  message: 'Another staff member with that {PATH} already exists'
});

module.exports = mongoose.model('Staff', Staff);
