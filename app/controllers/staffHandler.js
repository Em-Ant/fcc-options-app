'use strict';

var Staff = require('../models/staff.js');
var _ = require('lodash');

function StaffHandler() {

  var getErrorMessage = function(err) {
    //returns first error message
    var key = Object.keys(err.errors)[0];
    return err.errors[key].message;
  }

  this.create = function(req, res) {

    var staffMember = new Staff(req.body);

    staffMember.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: getErrorMessage(err)
        });
      }
      return res.status(200).json(staffMember);
    });
  }

  this.index = function(req, res) {
    Staff.find(function(err, response) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error retrieving staff'
        });
      }
      return res.status(200).json(response);
    });
  }

  this.show = function(req, res) {
    Staff.findById(req.params.id, function(err, response) {
      if (err) {
        return res.status(500).json({
          msg: 'There was an error finding staff member'
        });
      }
      if (!response) {
        return res.status(404).json({
          msg: 'Staff member not found'
        });
      }
      return res.status(200).json(response);
    });
  }

  this.update = function(req, res) {

    if (req.body._id) {
      delete req.body._id;
    }
    Staff.findById(req.params.id, function(err, staffMember) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding staff member'
        });
      }
      if (!staffMember) {
        return res.status(400).json({
          msg: 'Staff member not found'
        });
      }
      var updated = _.assign(staffMember, req.body);
      updated.save(function(err, savedStaffMember) {
        if (err) {
          console.log(err)
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(200).json(savedStaffMember);
      });
    });
  }

  this.destroy = function(req, res) {
    var id = req.params.id;
    Staff.findByIdAndRemove(id, function(err, staffMember) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error deleting staff member'
        });
      }
      return res.status(200).json(id);
    });
  }


}

module.exports = StaffHandler;
