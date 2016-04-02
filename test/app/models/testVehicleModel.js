var expect = require('expect.js');
var Vehicle = require('../../../app/models/vehicle');
var Consumer = require('../../../app/models/consumer');

describe('vehicleModel', function() {

  var name = "name";
  it('should create new Vehicle', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var maxFixedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs,
      maxFixedWheelchairs: maxFixedWheelchairs
    });

    expect(vehicle.name).to.be.equal(name);
    expect(vehicle.maxFixedSeats).to.be.equal(maxFixedSeats);
    expect(vehicle.maxFoldableSeatsForWheelchairs).to.be.equal(maxFoldableSeatsForWheelchairs);
    expect(vehicle.maxFixedWheelchairs).to.be.equal(maxFixedWheelchairs);
  })

  it('should display number of available seats', function() {

    var maxFixedSeats = 1;
    var expectedAvailableSeats = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats
    });
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);
  })

  it('should add up fixed and foldable seats as available seats', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var expectedAvailableSeats = maxFixedSeats + maxFoldableSeatsForWheelchairs;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
    });
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);
  })

  it('should display number of available wheelchairs', function() {

    var maxFixedWheelchairs = 1;
    var expectedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedWheelchairs: expectedWheelchairs
    });
    expect(expectedWheelchairs).to.be.equal(vehicle.availableWheelchairs);
  })

  it('should add up wheelchairs and foldable seats as available wheelchairs', function() {

      var maxFixedWheelchairs = 1;
      var maxFoldableSeatsForWheelchairs = 2;
      var expectedWheelchairs = 2;
      var vehicle = new Vehicle({
        name: name,
        maxFixedWheelchairs: expectedWheelchairs,
        maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
      });
      expect(expectedWheelchairs).to.be.equal(vehicle.availableWheelchairs);
    })

  it('should decrement available seats when consumer is added', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
    });

    //add 1st consumer
    vehicle.consumers.push(new Consumer());

    var expectedAvailableSeats = maxFixedSeats + maxFoldableSeatsForWheelchairs - 1;
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);

    //add 2nd consumer
    vehicle.consumers.push(new Consumer());
    expectedAvailableSeats--;

    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);


  })

  it('should decrement available seats when wheelchair consumer is added', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var maxFixedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs,
      maxFixedWheelchairs: maxFixedWheelchairs
    });

    var expectedAvailableSeats = vehicle.availableSeats;

    //add 1st consumer
    vehicle.consumers.push(new Consumer({
        name: 'John',
        hasWheelchair: true
      }
    ));

    var expectedAvailableWheelchairs = maxFixedWheelchairs - 1;
    expect(expectedAvailableWheelchairs).to.be.equal(vehicle.availableWheelchairs);
    // Available seats should no change
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);

  })

  it('should decrement available seats when two seat consumer is added', function() {
    //write test
    expect().fail();
  })

  it('should increment available seats when consumer is removed', function() {
    //write test
    expect().fail();
  })

  it('should increment available seats when wheelchair consumer is removed', function() {
    //write test
    expect().fail();
  })

  it('should increment available seats when two seat consumer is removed', function() {
    //write test
    expect().fail();
  })


});
