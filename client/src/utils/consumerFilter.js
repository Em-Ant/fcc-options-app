var isFiltered = function(mapFilters, activeVehicleId, consumer, consumerVehicleId){
  if(consumerVehicleId == activeVehicleId){
    return true;
  }
  return ( mapFilters.vehicleUnassigned && consumerVehicleId==null ||
    mapFilters.vehicleIds.indexOf(consumerVehicleId) !== -1 ) &&
  ((mapFilters.behavioralIssues && consumer.behavioralIssues) ||
    (mapFilters.needsTwoSeats && consumer.needsTwoSeats) ||
    (mapFilters.hasSeizures && consumer.hasSeizures) ||
    (mapFilters.hasWheelchair && consumer.hasWheelchair) ||
    (mapFilters.hasMedications && consumer.hasMedications) ||
    (mapFilters.needsWave && consumer.needsWave) ||
    (mapFilters.noNeeds &&
      !consumer.behavioralIssues &&
      !consumer.needsTwoSeats &&
      !consumer.hasSeizures &&
      !consumer.hasWheelchair &&
      !consumer.hasMedications)&&
      !consumer.needsWave)
}

module.exports.isFiltered = isFiltered;
