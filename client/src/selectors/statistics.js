import { createSelector } from 'reselect'
import { setVehicleCapacity } from '../utils/vehicleUtils'

const getVehicleIds = (state) => state.vehicles.ids
const getVehicleData = (state) => state.vehicles.data
const getConsumerData = (state) => state.consumers.data

export const calculateVehicleStats = createSelector(
  [ getVehicleIds, getVehicleData, getConsumerData ],
  (v_ids, vehicles, consumers) => {
    var vehicleStatistics ={
      seats:0,
      flexSeats:0,
      wheelchairs:0,
      occupiedSeats:0,
      occupiedFlexSeats:0,
      occupiedWheelchairs:0
    }
    v_ids.forEach(function(v_id){
      var vehicle = setVehicleCapacity(vehicles[v_id], consumers);
      vehicleStatistics.seats+=vehicle.seats;
      vehicleStatistics.flexSeats+=vehicle.flexSeats;
      vehicleStatistics.wheelchairs+=vehicle.wheelchairs;
      vehicleStatistics.occupiedSeats+=vehicle.occupiedSeats;
      vehicleStatistics.occupiedFlexSeats+=vehicle.occupiedFlexSeats;
      vehicleStatistics.occupiedWheelchairs+=vehicle.occupiedWheelchairs;
    })
    return vehicleStatistics
  }
)
