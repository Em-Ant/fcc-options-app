
  /**
   * Returns a NEW vehicle with the following additional fields set
   * occupiedSeats
   * occupiedFlexSeats
   * occupiedWheelchairs
   * needsMedications
   * consumersFit  //false if too many consumers assigned to vehicle
   */
  var setVehicleCapacity=function(vehicle, consumers) {
    //calculation of these properties are dependent on the consumer properties
    var vehicle = Object.assign({}, vehicle, {
      occupiedSeats: 0,
      occupiedFlexSeats: 0,
      occupiedWheelchairs: 0,
      needsMedications: false,
      consumersFit:true
    })

    // rider occupies a Seat
    if (vehicle.rider) {vehicle.occupiedSeats++; }
    if (vehicle.driver) {vehicle.occupiedSeats++; }

    vehicle.consumers.forEach(function(consumer) {
      if(consumers){
         //consumers not populated, so populate manually
         consumer = consumers[consumer];
      }
      if (consumer.hasMedications) {
        vehicle.needsMedications = true;
      }
      if (consumer.hasWheelchair) {
        if (vehicle.occupiedWheelchairs + 1 <= vehicle.wheelchairs) {
          vehicle.occupiedWheelchairs++;
        } else if (vehicle.occupiedFlexSeats + 2 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats += 2;
        }else{
          vehicle.consumersFit = false
        }
      } else if (consumer.needsTwoSeats) {
        if (vehicle.occupiedSeats + 2 <= vehicle.seats) {
          vehicle.occupiedSeats+=2;
        } else if (vehicle.occupiedFlexSeats + 2 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats += 2;
        } else{
          vehicle.consumersFit = false;
        }
      } else {
        if (vehicle.occupiedSeats + 1 <= vehicle.seats) {
          vehicle.occupiedSeats++;
        } else if (vehicle.occupiedFlexSeats + 1 <= vehicle.flexSeats) {
          vehicle.occupiedFlexSeats++;
        } else{
          vehicle.consumersFit = false;
        }
      }
    });
    return vehicle;
  }
  var willConsumerFit=function(consumerId, vehicle, consumers){
    var vehicle = Object.assign({}, vehicle, {
      consumers:vehicle.consumers.slice()
    })
    vehicle.consumers.push(consumerId);
    var vehicle = setVehicleCapacity(vehicle, consumers);
    return vehicle.consumersFit;
  }
  var validate = function(vehicle){
    vehicle =  setVehicleCapacity(vehicle);
    return vehicle.consumersFit;
  }


module.exports.setVehicleCapacity = setVehicleCapacity;
module.exports.willConsumerFit = willConsumerFit;
module.exports.validate = validate;
