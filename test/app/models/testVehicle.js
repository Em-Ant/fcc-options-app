'use strict';

var utils = require('../../utils');
var expect = require('expect.js');
var Vehicle = require('../../../app/models/vehicle');


describe('Vehicle: models', function () {


  describe('#create()', function () {
    it('should create a new Vehicle', function (done) {
      // Create a User object to pass to User.create()
      var v = {
        name: "test",
        seats: 1
      };
      Vehicle.create(v, function (err, createdVehicle) {
        // verify that the returned user is what we expect
        expect(v.name).to.be.equal(createdVehicle.name);
        expect(v.seats).to.be.equal(createdVehicle.seats);
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
    it('should have an error when putting empty name', function (done) {
      var v = {
        seats: 1
      };
      Vehicle.create(v, function (err, createdVehicle) {
        expect(err.errors.name.path).to.be.equal('name');
        expect(err.errors.name.kind).to.be.equal('required');

        done();
      });
    });

    it('should have an error when putting empty seats', function (done) {
      var v = {
        name: 'name'
      };
      Vehicle.create(v, function (err, createdVehicle) {
        expect(err.errors.seats.path).to.be.equal('seats');
        expect(err.errors.seats.kind).to.be.equal('required');

        done();
      });
    });
    it('should have an error when putting negative seats', function (done) {
      var v = {
        name: 'name',
        seats: -1
      };
      Vehicle.create(v, function (err, createdVehicle) {
        expect(err.errors.seats.path).to.be.equal('seats');
        expect(err.errors.seats.kind).to.be.equal('min');

        done();
      });
    });
  });


});
