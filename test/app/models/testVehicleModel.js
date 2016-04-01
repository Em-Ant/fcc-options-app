var assert = require('assert');
var Vehicle = require('../../../app/models/vehicle');

describe('vehicleModel', function() {
  it('should create new Vehicle', function() {

    var name = "test";
    var maxFixedSeats = 1;
    var maxFoldableSeats = 1;
    var maxWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeats: maxFoldableSeats,
      maxWheelchairs: maxWheelchairs
    });

    assert.equal(vehicle.name, name);
    assert.equal(vehicle.maxFixedSeats, maxFixedSeats);
    assert.equal(vehicle.maxFoldableSeats, maxFoldableSeats);
    assert.equal(vehicle.maxWheelchairs, maxWheelchairs);
  })

  it('should display number of available seats', function() {

    var name = "name";
    var maxFixedSeats = 1;
    var expectedAvailableSeats = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats
    });
    assert.equal(expectedAvailableSeats, vehicle.availableSeats);
  })

  it('should add up fixed and foldable seats as available seats', function() {

    var name = "name";
    var maxFixedSeats = 1;
    var maxFoldableSeats = 1;
    var expectedAvailableSeats = maxFixedSeats + maxFoldableSeats;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFixedSeats: maxFixedSeats
    });
    assert.equal(expectedAvailableSeats, vehicle.availableSeats);
  })

  it('should display number of available wheelchairs', function() {
    //write test
    assert(false);
  })

  it('should decrement available seats when consumer is added', function() {
    //write test
    assert(false);
  })

  it('should decrement available seats when wheelchair consumer is added', function() {
    //write test
    assert(false);
  })

  it('should decrement available seats when two seat consumer is added', function() {
    //write test
    assert(false);
  })

  it('should increment available seats when consumer is removed', function() {
    //write test
    assert(false);
  })

  it('should increment available seats when wheelchair consumer is removed', function() {
    //write test
    assert(false);
  })

  it('should increment available seats when two seat consumer is removed', function() {
    //write test
    assert(false);
  })


});
