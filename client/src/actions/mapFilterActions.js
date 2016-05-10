var actionTypes = require('../constants/actionTypes/mapFilterActionTypes.js');
module.exports.updateFilter = function(filterName, value) {
  return {
    type: actionTypes.FILTER_UPDATE,
    filterName: filterName,
    value: value
  }
}

module.exports.updateVehicleFilter = function(vehicleId, value) {
  return {
    type: actionTypes.FILTER_VEHICLE_UPDATE,
    vehicleId: vehicleId,
    value: value
  }
}
