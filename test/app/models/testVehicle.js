'use strict';

var utils = require('../../utils');
var expect = require('expect.js');
var Vehicle = require('../../../app/models/vehicle');
var Consumer = require('../../../app/models/consumer');
var Staff = require('../../../app/models/staff');


describe('Vehicle: models', function() {


  describe('#save()', function() {
    it('should save a new Vehicle', function(done) {
      // Create a User object to pass to User.create()
      var v = new Vehicle({
        name: "test",
        seats: 1
      });
      v.save(function(err, createdVehicle) {
        // verify that the returned user is what we expect
        expect(v.name).to.be.equal(createdVehicle.name);
        expect(v.seats).to.be.equal(createdVehicle.seats);
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
    it('should have an error when putting empty name', function(done) {
      var v = new Vehicle({
        seats: 1
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.name.path).to.be.equal('name');
        expect(err.errors.name.kind).to.be.equal('required');

        done();
      });
    });

    it('should have an error when putting empty seats', function(done) {
      var v = new Vehicle({
        name: 'name'
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.seats.path).to.be.equal('seats');
        expect(err.errors.seats.kind).to.be.equal('required');

        done();
      });
    });
    it('should have an error when putting negative seats', function(done) {
      var v = new Vehicle({
        name: 'name',
        seats: -1
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.seats.path).to.be.equal('seats');
        expect(err.errors.seats.kind).to.be.equal('min');

        done();
      });
    });
    it('should have an error when putting negative foldable seats', function(done) {
      var v = new Vehicle({
        name: 'name',
        seats: 1,
        flexSeats: -1
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.flexSeats.path).to.be.equal('flexSeats');
        expect(err.errors.flexSeats.kind).to.be.equal('min');

        done();
      });
    });
    it('should have an error when putting negative wheelchairs', function(done) {
      var v = new Vehicle({
        name: 'name',
        seats: 1,
        wheelchairs: -1
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.wheelchairs.path).to.be.equal('wheelchairs');
        expect(err.errors.wheelchairs.kind).to.be.equal('min');

        done();
      });
    });

    it('should have an error when putting nonexisting consumers', function(done) {
      var consumer = new Consumer();
      var consumers = [];
      consumers.push(consumer._id);
      var v = new Vehicle({
        name: 'name',
        seats: 1,
        consumers: consumers
      });
      v.save(function(err, createdVehicle) {
        expect(err.errors.consumers.path).to.be.equal('consumers');
        expect(err.errors.consumers.message).to.be.equal('consumers references a non existing ID');
        expect(err.errors.consumers.kind).to.be.equal('user defined');

        done();
      });
    });

    it('should have no errors when putting existing consumers', function(done) {
      var consumer = new Consumer({
        name: 'name',
        sex: 'male',
        address: '12412421421'
      });
      consumer.save(function(err, savedConsumer) {
        var consumers = [];
        consumers.push(consumer._id);
        var v = new Vehicle({
          name: 'name',
          seats: 1,
          consumers: consumers
        });
        v.save(function(err, createdVehicle) {
          expect(err).to.be(null);
          expect(createdVehicle.consumers[0]).to.be.equal(consumer._id);
          done();
        });
      });
    });


  });

  describe('validate', function() {
    var consumer = new Consumer({
      name: 'name',
      sex: 'male',
      address: '12412421421'
    });
    var v;
    beforeEach(function(done) {
      consumer.save(function(err, savedConsumer) {
        var consumers = [];
        consumers.push(consumer._id);
        v = new Vehicle({
          name: 'name',
          seats: 1,
          consumers: consumers
        });
        v.save(function(err, createdVehicle) {
          done();
        });
      });
    })
    it('should have error if seats are changed and consumers no longer can fit', function(done) {
      v.seats = 0;
      v.save(function(err, createdVehicle) {
        expect(err.errors.consumers.path).to.be.equal('consumers');
        expect(err.errors.consumers.message).to.be.equal('Consumers cannot fit in vehicle anymore');
        expect(err.errors.consumers.kind).to.be.equal('user defined');
        done();
      });
    });
  })
  
  

  describe('driver validation', function() {
    var v;
    beforeEach(function(done) {
      v = new Vehicle({
        name: 'name',
        seats: 1
      });
      v.save(function(err, createdVehicle) {
        done();
      });
    })
    it('should have no errors if driver is in driver seat', function(done) {
      var staff = new Staff({
        name:"name",
        roles:["driver"]
      })
      staff.save(function(err){
        v.driver = staff
        v.save(function(err, createdVehicle) {
          expect(v.driver.name).to.be.equal(createdVehicle.driver.name);
          done();
        });
        
      })
    });
    it('should have error if rider is in driver seat', function(done) {
      var rider = new Staff({
        name:"name",
        roles:["rider"]
      })
      rider.save(function(err){
        v.driver = rider;
        v.save(function(err, createdVehicle) {
          expect(err.errors.driver.path).to.be.equal('driver');
          expect(err.errors.driver.message).to.be.equal('Driver must be a staff member with a driver role');
          expect(err.errors.driver.kind).to.be.equal('user defined');
          done();
        });
        
      })
    });
  })
  
  describe('rider validation', function() {
    var v;
    beforeEach(function(done) {
      v = new Vehicle({
        name: 'name',
        seats: 1
      });
      v.save(function(err, createdVehicle) {
        done();
      });
    })
    
    it('should have no errors when rider is in rider seat', function(done) {
      var rider = new Staff({
        name:"name",
        roles:["rider"]
      })
      rider.save(function(err){
        v.rider = rider;
        v.save(function(err, createdVehicle) {
          expect(v.rider.name).to.be.equal(createdVehicle.rider.name);
          done();
        });
      })
    });
    
    it('should have error when driver is in rider seat', function(done) {
      var driver = new Staff({
        name:"name",
        roles:["driver"]
      })
      driver.save(function(err){
        v.rider = driver;
        v.save(function(err, createdVehicle) {
          expect(err.errors.rider.path).to.be.equal('rider');
          expect(err.errors.rider.message).to.be.equal('Rider must be a staff member with a rider role');
          expect(err.errors.rider.kind).to.be.equal('user defined');
          done();
        });
        
      })
    });
  })
});
