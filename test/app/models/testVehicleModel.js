var expect = require('expect.js');
var Vehicle = require('../../../app/models/vehicle');
var Consumer = require('../../../app/models/consumer');

describe('vehicleModel', function() {
  
  var name = "name";
  it('should create new Vehicle', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeats = 1;
    var maxWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeats: maxFoldableSeats,
      maxWheelchairs: maxWheelchairs
    });

    expect(vehicle.name).to.be.equal(name);
    expect(vehicle.maxFixedSeats).to.be.equal(maxFixedSeats);
    expect(vehicle.maxFoldableSeats).to.be.equal(maxFoldableSeats);
    expect(vehicle.maxWheelchairs).to.be.equal(maxWheelchairs);
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
    var maxFoldableSeats = 1;
    var expectedAvailableSeats = maxFixedSeats + maxFoldableSeats;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeats: maxFoldableSeats
    });
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);
  })

  it('should display number of available wheelchairs', function() {

    var maxWheelchairs = 1;
    var expectedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxWheelchairs: expectedWheelchairs
    });
    expect(expectedWheelchairs).to.be.equal(vehicle.availableWheelchairs);
  })

  it('should decrement available seats when consumer is added', function() {
    
    var maxFixedSeats = 1;
    var maxFoldableSeats = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeats: maxFoldableSeats
    });
    
    //add 1st consumer
    vehicle.consumers.push(new Consumer());
   
    var expectedAvailableSeats = maxFixedSeats + maxFoldableSeats - 1;
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);
    
    //add 2nd consumer
    vehicle.consumers.push(new Consumer());
    expectedAvailableSeats--;
    
    expect(expectedAvailableSeats).to.be.equal(vehicle.availableSeats);


  })

  it('should decrement available seats when wheelchair consumer is added', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeats = 1;
    var maxWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeats: maxFoldableSeats,
      maxWheelchairs: maxWheelchairs
    });
    
    var expectedAvailableSeats = vehicle.availableSeats;
    
    //add 1st consumer
    vehicle.consumers.push(new Consumer({
        name: 'John',
        hasWheelchair: true
      }
    ));
    
    var expectedAvailableWheelchairs = maxWheelchairs - 1;
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
