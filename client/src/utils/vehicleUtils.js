var VehicleUtils = {
  /**
  Returns a vehicle with the following fields set
  vehicle.occupiedSeats
  vehicle.totalSeats
  vehicle.occupiedWheelchairs
  vehicle.totalWheelchairs
  **/
  setVehicleCapacity: function(vehicle, consumers=[]) {

    var totalSeats = vehicle.maxFixedSeats + vehicle.maxFoldableSeatsForWheelchairs;
    var totalWheelchairs = vehicle.maxFixedWheelchairs +
      Math.floor((vehicle.maxFoldableSeatsForWheelchairs / 2));

    //calculation of these properties are dependent on the consumer properties
    var occupiedSeats = 0;
    var occupiedWheelchairs = 0;
    vehicle.consumers.forEach(function(consumerId) {
      var consumer =  consumers[consumerId];
      if (consumer.hasWheelchair) {
        occupiedWheelchairs++;
      } else if (consumer.needsTwoSeats) {
        occupiedSeats += 2;
      } else {
        occupiedSeats++;
      }
    });
    //create new object with new properties
    var newVehicle = Object.assign({}, vehicle, {
      totalSeats: totalSeats,
      totalWheelchairs: totalWheelchairs,
      occupiedSeats: occupiedSeats,
      occupiedWheelchairs: occupiedWheelchairs
    })
    return newVehicle;
  }
};

module.exports = VehicleUtils;
