var VehicleUtils = {

  /**
   * Returns a NEW vehicle with the following additional fields set
   * occupiedSeats
   * occupiedFlexSeats
   * occupiedWheelchairs
   * needsMedications
   */
  setVehicleCapacity: function(vehicle, consumers) {
    //calculation of these properties are dependent on the consumer properties
    var occupiedSeats = 0;
    var occupiedFlexSeats = 0;
    var occupiedWheelchairs = 0;
    var needsMedications = false;
    var vehicle = Object.assign({}, vehicle, {
      occupiedSeats: occupiedSeats,
      occupiedFlexSeats: occupiedFlexSeats,
      occupiedWheelchairs: occupiedWheelchairs,
      needsMedications: needsMedications
    })
    vehicle.consumers.forEach(function(consumerId) {
      var consumer = consumers[consumerId];
      if (consumer.hasMedications) {
        vehicle.needsMedications = true;
      }
      if (consumer.hasWheelchair) {
        if (vehicle.occupiedWheelchairs + 1 <= vehicle.wheelchairs) {
          vehicle.occupiedWheelchairs++;
        } else if (vehicle.occupiedFlexSeats + 2 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats += 2;
        }else{
          console.log("Error: could not find spot for consumer on vehicle")
        }
      } else if (consumer.needsTwoSeats) {
        if (vehicle.occupiedSeats + 2 <= vehicle.seats) {
          vehicle.occupiedSeats+=2;
        } else if (vehicle.occupiedFlexSeats + 2 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats += 2;
        } else{
          console.log("Error: could not find spot for consumer on vehicle")
        }
      } else {
        if (vehicle.occupiedSeats + 1 <= vehicle.seats) {
          vehicle.occupiedSeats++;
        } else if (vehicle.occupiedFlexSeats + 1 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats++;
        } else{
            console.log("Error: could not find spot for consumer on vehicle")
        }
      }
    });
    return vehicle;
  }
};

module.exports = VehicleUtils;
