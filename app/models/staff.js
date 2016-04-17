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
    enum: ['driver', 'rider']
  }],
  medCertified: {
    type: Boolean,
    required: [true, 'Please select medication certified'],
    default: false
  },
  notes: {
    type: String,
    default: ''
  }
});


Staff.plugin(uniqueValidator, {
  message: 'Another staff member with that {PATH} already exists'
});

Staff.pre('validate', validateRoles)

function validateRoles(next){
  if(this.roles.length == 0){
      this.invalidate('roles', 'Please choose a role');
  }
  next();
}

module.exports = mongoose.model('Staff', Staff);
