var expect = require('expect.js');
var Vehicle = require('../../../app/models/vehicle');
var Consumer = require('../../../app/models/consumer');

describe('vehicleModel', function() {

  var name = "name";
  it('should display number of total seats', function() {

    var maxFixedSeats = 1;
    var expectedTotalSeats = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats
    });
    expect(expectedTotalSeats).to.be.equal(vehicle.totalSeats);
  })

  it('should add up fixed and foldable seats as total seats', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var expectedTotalSeats = maxFixedSeats + maxFoldableSeatsForWheelchairs;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
    });
    expect(expectedTotalSeats).to.be.equal(vehicle.totalSeats);
  })

  it('should display number of total wheelchairs', function() {

    var maxFixedWheelchairs = 1;
    var expectedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedWheelchairs: maxFixedWheelchairs
    });
    expect(expectedWheelchairs).to.be.equal(vehicle.totalWheelchairs);
  })

  it('should add up wheelchairs and foldable seats as available wheelchairs', function() {

      var maxFixedWheelchairs = 1;
      var maxFoldableSeatsForWheelchairs = 2;
      var expectedWheelchairs = 2;
      var vehicle = new Vehicle({
        name: name,
        maxFixedWheelchairs: maxFixedWheelchairs,
        maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
      });
      expect(expectedWheelchairs).to.be.equal(vehicle.totalWheelchairs);
    })

  it('should increment occupied seats when consumer is added', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs
    });

    //add 1st consumer
    vehicle.consumers.push(new Consumer({
      name:"Mary"
    }));

    var expectedOccupied = 1;
    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);

    //add 2nd consumer
    vehicle.consumers.push(new Consumer());
    expectedOccupied++;

    expect(expectedOccupied).to.be.equal(vehicle.occupiedSeats);


  })

  it('should increment occupied seats when wheelchair consumer is added', function() {

    var maxFixedSeats = 1;
    var maxFoldableSeatsForWheelchairs = 1;
    var maxFixedWheelchairs = 1;
    var vehicle = new Vehicle({
      name: name,
      maxFixedSeats: maxFixedSeats,
      maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs,
      maxFixedWheelchairs: maxFixedWheelchairs
    });

    var expectedOccupiedWheelchairs = 0;
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);
    //add 1st consumer
    var consumer = new Consumer({
        name: 'John',
        sex: 'male',
        address:'address',
        hasWheelchair: true
      }
    );
    vehicle.consumers.push(new Consumer({
        name: 'John',
        sex: 'male',
        address:'address',
        hasWheelchair: true
      }
    ));


    expectedOccupiedWheelchairs++;
    expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occupiedWheelchairs);

  })

  it('should increment occupied seats when two seat consumer is added', function() {

        var maxFixedSeats = 1;
        var maxFoldableSeatsForWheelchairs = 1;
        var maxFixedWheelchairs = 1;
        var vehicle = new Vehicle({
          name: name,
          maxFixedSeats: maxFixedSeats,
          maxFoldableSeatsForWheelchairs: maxFoldableSeatsForWheelchairs,
          maxFixedWheelchairs: maxFixedWheelchairs
        });

        var expectedOccupiedWheelchairs = 0;
        expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.occuWheelchairs);
        //add 1st consumer
        vehicle.consumers.push(new Consumer({
            name: 'John',
            needsTwoSeats: true
          }
        ));

        expectedOccupiedWheelchairs++;
        expect(expectedOccupiedWheelchairs).to.be.equal(vehicle.totalWheelchairs);
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
