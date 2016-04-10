var VehicleUtils = {

  /**
  * Returns a NEW vehicle with the following additional fields set
  * vehicle.occupiedSeats
  * vehicle.occupiedWheelchairs
  */

  setVehicleCapacity: function(vehicle, consumers) {

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
      occupiedSeats: occupiedSeats,
      occupiedWheelchairs: occupiedWheelchairs
    })
    return newVehicle;
  }
};

module.exports = VehicleUtils;
