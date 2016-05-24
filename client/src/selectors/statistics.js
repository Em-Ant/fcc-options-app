import {
  createSelector
} from 'reselect'
import {
  setVehicleCapacity
} from '../utils/vehicleUtils'

const getVehicleIds = (state) => state.vehicles.ids
const getVehicleData = (state) => state.vehicles.data
const getConsumerIds = (state) => state.consumers.ids
const getConsumerData = (state) => state.consumers.data

export const calculateVehicleStats = createSelector(
  [getVehicleIds, getVehicleData, getConsumerData],
  (v_ids, vehicles, consumers) => {
    var vehicleStatistics = {
      seats: 0,
      flexSeats: 0,
      wheelchairs: 0,
      occupiedSeats: 0,
      occupiedFlexSeats: 0,
      occupiedWheelchairs: 0
    }
    v_ids.forEach(function (v_id) {
      var vehicle = setVehicleCapacity(vehicles[v_id], consumers);
      vehicleStatistics.seats += vehicle.seats;
      vehicleStatistics.flexSeats += vehicle.flexSeats;
      vehicleStatistics.wheelchairs += vehicle.wheelchairs;
      vehicleStatistics.occupiedSeats += vehicle.occupiedSeats;
      vehicleStatistics.occupiedFlexSeats += vehicle.occupiedFlexSeats;
      vehicleStatistics.occupiedWheelchairs += vehicle.occupiedWheelchairs;
    })
    return vehicleStatistics
  }
)

export const calculateFilterStats = createSelector(
  [getVehicleIds, getVehicleData, getConsumerIds, getConsumerData],
  (v_ids, vehicles, c_ids, consumers) => {
    var stats = {
      noNeeds: 0,
      behavioralIssues:0,
      hasMedications:0,
      hasSeizures:0,
      hasWheelchair:0,
      needsTwoSeats:0,
      needsWave:0,
      notAssigned:0,
      vehicleStats: {}
    }
    c_ids.forEach(function (c_id) {
      var consumer = consumers[c_id];
      if (!consumer.behavioralIssues && !consumer.hasMedications && !consumer.hasSeizures && !consumer.hasWheelchair && !consumer.needsTwoSeats && !consumer.needsWave){
        stats.noNeeds++
      }
      if(consumer.behavioralIssues){
        stats.behavioralIssues++
      }
      if(consumer.hasMedications){
        stats.hasMedications++
      }
      if(consumer.hasSeizures){
        stats.hasSeizures++
      }
      if(consumer.hasWheelchair){
        stats.hasWheelchair++
      }
      if(consumer.needsTwoSeats){
        stats.needsTwoSeats++
      }
      if(consumer.needsWave){
        stats.needsWave++
      }
    })

    var totalAssignedConsumers = 0;;
    v_ids.forEach(function (v_id) {
      var vehicle = vehicles[v_id];
      var numConsumers = vehicle.consumers.length;
      totalAssignedConsumers += numConsumers;
      stats.vehicleStats[v_id] = numConsumers;
    })
    stats.notAssigned = c_ids.length - totalAssignedConsumers;
    
    return stats;
  }
)
