var expect = require('expect.js');
var Vehicle = require('../../../../app/models/vehicle');
var Consumer = require('../../../../app/models/consumer');
var VehicleUtils = require('../../../../client/src/utils/vehicleUtils');
var _ = require('lodash');

describe('vehicleUtils', function() {

  var vehicle;
  var consumers;
  var consumerNonWheelchair;
  var consumerHasWheelchair;
  var consumerNeedsTwoSeats;
  beforeEach(function() {
    //toObject needed because we can't add new fields to a mongoose schema properly
    vehicle = new Vehicle().toObject();

    consumers = [];
    consumerNonWheelchair = new Consumer();
    consumerHasWheelchair = new Consumer({
      hasWheelchair: true
    });
    consumerNeedsTwoSeats = new Consumer({
      needsTwoSeats: true
    });
    consumers.push(consumerNonWheelchair);
    consumers.push(consumerHasWheelchair);
    consumers.push(consumerNeedsTwoSeats);

    //converts consumers array to an object map with the consumer's _id as the key
    consumers = _.keyBy(consumers, '_id');
  });

  it('should display number of total seats', function() {

    vehicle.maxFixedSeats = 1;
    var expectedTotalSeats = 1;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle);

    expect(expectedTotalSeats).to.be.equal(vehicle.totalSeats);
  })

  it('should add up fixed and foldable seats as total seats', function() {

    vehicle.maxFixedSeats = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;
    var expectedTotalSeats = 2;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle);
    expect(expectedTotalSeats).to.be.equal(vehicle.totalSeats);
  })

  it('should display number of total wheelchairs', function() {

    var expectedWheelchairs = 1;
    vehicle.maxFixedWheelchairs = 1;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle);
    expect(expectedWheelchairs).to.be.equal(vehicle.totalWheelchairs);
  })

  it('should add up wheelchairs and foldable seats as available wheelchairs', function() {
    vehicle.maxFixedWheelchairs = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 2;
    var expectedWheelchairs = 2;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle);
    expect(expectedWheelchairs).to.be.equal(vehicle.totalWheelchairs);
  })

  it('should increment occupied seats when consumer is added', function() {

    vehicle.maxFixedWheelchairs = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;

    var expectedOccupied = 0;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);

    //add consumer
    vehicle.consumers.push(consumerNonWheelchair._id);
    expectedOccupied++;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);


  })

  it('should increment occupied seats when wheelchair consumer is added', function() {

    vehicle.maxFixedSeats = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;
    vehicle.maxFixedWheelchairs = 1;

    var expectedOccupiedWheelchairs = 0;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);

    //add wheelchair consumer
    vehicle.consumers.push(consumerHasWheelchair._id);

    expectedOccupiedWheelchairs++;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);

  })

  it('should increment occupied seats when two seat consumer is added', function() {

    vehicle.maxFixedSeats = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;
    vehicle.maxFixedWheelchairs = 1;

    var expectedOccupiedSeats = 0;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);

    expect(expectedOccupiedSeats).to.be.equal(vehicle.occupiedSeats);
    //add needsTwoSeats consumer
    vehicle.consumers.push(consumerNeedsTwoSeats._id);

    expectedOccupiedSeats += 2;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedSeats).to.be.equal(vehicle.occupiedSeats);
  })

  it('should decrement occupied seats when consumer is removed', function() {
    vehicle.maxFixedWheelchairs = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;

    vehicle.consumers.push(consumerNonWheelchair._id);
    var expectedOccupied = 1;


    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);

    //remove consumer
    vehicle.consumers.pop();
    expectedOccupied--;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);

  })

  it('should decrement occupied seats when wheelchair consumer is removed', function() {
    vehicle.maxFixedSeats = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;
    vehicle.maxFixedWheelchairs = 1;

    vehicle.consumers.push(consumerHasWheelchair._id);
    var expectedOccupiedWheelchairs = 1;

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);

    //add wheelchair consumer
    vehicle.consumers.pop();
    expectedOccupiedWheelchairs--;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);

  })

  it('should decrement occupied seats when two seat consumer is removed', function() {

    vehicle.maxFixedSeats = 1;
    vehicle.maxFoldableSeatsForWheelchairs = 1;
    vehicle.maxFixedWheelchairs = 1;

    var expectedOccupiedSeats = 0;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);

    expect(expectedOccupiedSeats).to.be.equal(vehicle.occupiedSeats);
    //add needsTwoSeats consumer
    vehicle.consumers.push(consumerNeedsTwoSeats._id);

    expectedOccupiedSeats += 2;
    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedOccupiedSeats).to.be.equal(vehicle.occupiedSeats);
  })

  it('should decrement total seats when wheelchair occupies foldable seats', function() {

    vehicle.maxFoldableSeatsForWheelchairs = 2;
    var expectedVehicle = Object.assign({}, vehicle, {
      occupiedSeats:0,
      totalSeats:2,
      occupiedWheelchairs:0,
      totalWheelchairs:1
    })

    vehicle = VehicleUtils.setVehicleCapacity(vehicle, consumers);
    expect(expectedVehicle).to.be.equal(vehicle);

    //add wheelchair consumer
    vehicle.consumers.push(consumerHasWheelchair._id);

    expectedVehicle = Object.assign({}, vehicle, {
      occupiedSeats:0,
      totalSeats:0,
      occupiedWheelchairs:1,
      totalWheelchairs:1
    })  
    expect(expectedVehicle).to.be.equal(vehicle);
  })

  it('should decrement total wheelchairs when non wheelchair occupies foldable seats', function() {
    //write test
    expect().fail();
  })


});
