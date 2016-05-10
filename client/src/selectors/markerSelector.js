import {
  createSelector
} from 'reselect'

/*
colorMarkers(state.mapPage.consumerMarkers,
state.vehicles.consumersToVehiclesMap,
state.mapPage.activeVehicleId,
state.mapPage.highlightedMarker,
state.mapPage.markerLoading),
*/

const getMarkers = (state) => state.mapPage.consumerMarkers
const getC2VMap = (state) => state.vehicles.consumersToVehiclesMap
const getActiveVId = (state) => state.mapPage.activeVehicleId
const getHighligthedM = (state) => state.mapPage.highlightedMarker
const getMarkerLoadingState = (state) => state.mapPage.markerLoading
const colorMarkers = createSelector(
  [getMarkers, getC2VMap, getActiveVId, getHighligthedM, getMarkerLoadingState],
  (consumerMarkers,
    consumersToVehiclesMap,
    activeVehicleId,
    highlightedConsumerId,
    markerLoading) => {
    return consumerMarkers.map(function (marker) {
      var c_id = marker.consumerId;
      var icon = Object.assign({}, marker.icon);
      if (markerLoading == c_id) {
        icon.fillColor = mapConst.LOADING_CONSUMER_COLOR;
      } else if (consumersToVehiclesMap[c_id]) {
        // consumer is on board
        if (activeVehicleId == consumersToVehiclesMap[c_id]) {
          if (highlightedConsumerId == c_id) {
            icon.fillColor = mapConst.HIGHLIGHTED_CONSUMER_COLOR;
          } else {
            icon.fillColor = mapConst.SELECTED_ASSIGNED_CONSUMER_COLOR; // on the active bus
          }
        } else {
          if (highlightedConsumerId == c_id) {
            icon.fillColor = mapConst.HIGHLIGHTED_ASSIGNED_COLOR;
          } else {
            icon.fillColor = mapConst.ASSIGNED_CONSUMER_COLOR; // not on the active bus
          }
        }
      } else {
        //consumer not assigned to vehicle
        if (highlightedConsumerId == c_id) {
          icon.fillColor = mapConst.HIGHLIGHTED_UNASSIGNED_COLOR;
        } else {
          icon.fillColor = mapConst.UNASSIGNED_CONSUMER_COLOR;
        }
      }
      return Object.assign({}, marker, {
        icon: icon
      })
    });
  }
)
import {
  isFiltered
} from '../utils/consumerFilter'
const mapConst = require('../constants/map');
const getConsumers = (state) => state.consumers.data
const getMapFilters = (state) => state.mapFilters
export const filterMarkers = createSelector(
  [colorMarkers, getConsumers, getMapFilters, getActiveVId, getC2VMap],
  (consumerMarkers, consumers, mapFilters, activeVehicleId, consumersToVehiclesMap) => {
    return consumerMarkers.filter(function (marker) {
      var consumer = consumers[marker.consumerId];
      var consumerVehicleId = consumersToVehiclesMap[marker.consumerId];
      return isFiltered(mapFilters, activeVehicleId, consumer, consumerVehicleId)
    });
  }
)

module.exports.colorMarkers = colorMarkers
