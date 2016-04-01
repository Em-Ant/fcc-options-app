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
});
