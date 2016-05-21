import { createSelector } from 'reselect'
import alphanumCase from '../utils/alphanumCase'

const getIds = (state) => state.ids
const getData = (state) => state.data

export const sortAlphabetically = createSelector(
  [ getIds, getData ],
  (ids, data) => {
    var outIds = ids.slice();
    outIds.sort(function(a, b) {
      return alphanumCase(data[a].name,data[b].name);
    })
    return outIds;
  }
)

export const filterByString = (getIds, getData, getFilterString, getFilter) => {
  let filter = createSelector (
    [getIds, getData, getFilterString, getFilter],
    (ids, data, fString, filter) => {
      return ids.filter((id)=>{
        return (data[id][filter || 'name']
          .toLowerCase().search(fString.toLowerCase()) != -1)
      })
    }
  )
  return filter
}

export const filterByNeeds = (getIds, getData, getNeedsFilter) => {
  let filter = createSelector (
    [getIds, getData, getNeedsFilter],
    (ids, data, needs) => {
      return ids.filter((id) => {
        if (data[id].sex === 'male' && !needs.male) return false
        if (data[id].sex === 'female' && !needs.female) return false
        return (data[id].hasWheelchair && needs.hasWheelchair) ||
          (data[id].hasMedications && needs.hasMedications) ||
          (data[id].hasSeizures && needs.hasSeizures) ||
          (data[id].needsTwoSeats && needs.needsTwoSeats) ||
          (data[id].needsWave && needs.needsWave) ||
          (data[id].behavioralIssues && needs.behavioralIssues) ||
          (needs.noNeeds &&
            !(data[id].hasWheelchair || data[id].hasSeizures
              || data[id].hasMedications || data[id].needsTwoSeats
              || data[id].needsWave || data[id].behavioralIssues))
      })
    }
  )
  return filter
}

export const paginateAndSort = (getIds, getData, getPage, getItemsPerPage) => {
  let pager = createSelector (
      [getIds, getData, getPage, getItemsPerPage],
      (ids, data, page, itemsPerPage) => {
        var outIds = ids.slice()
        outIds.sort(function(a, b) {
          return data[a].name.localeCompare(data[b].name);
        })
        return outIds.splice(itemsPerPage*(page-1), itemsPerPage);
      }
    )
  let getPagesCount = createSelector (
    [getIds, getItemsPerPage],
    (ids, itemsPerPage) => {
      let items = ids.length
      if (items === 0) return 1
      let pages = parseInt(items / itemsPerPage)
      if (pages*itemsPerPage < items) { pages += 1 }
      return pages
    }
  )
  return [
    pager,
    getPagesCount
  ]
}

import {
  isFiltered
} from '../utils/consumerFilter'
const getCIds = (state) => state.consumers.ids
const getConsumers = (state) => state.consumers.data
const getC2V = (state) => state.vehicles.consumersToVehiclesMap
const getActiveVId = (state) => state.mapPage.activeVehicleId
const getMapFilters = (state) => state.mapFilters
export const getFilteredConsumers = createSelector(
  [getCIds, getConsumers, getC2V, getMapFilters, getActiveVId],
  (c_ids, consumers, consumersToVehiclesMap, mapFilters, activeVehicleId) => {
    var filteredConsumerIds =  c_ids.filter(function (c_id) {
      var consumer = consumers[c_id];

      var consumerVehicleId = consumersToVehiclesMap[c_id];
      return isFiltered(mapFilters, activeVehicleId, consumer, consumerVehicleId)
    });
    var filteredConsumers =  filteredConsumerIds.map(function(c_ids){
      return consumers[c_ids];
    })
    var sortedConsumers = filteredConsumers.sort(function(a, b){
      return a.name.localeCompare(b.name);
    })
    return sortedConsumers;
  }
)


const getUID = (state) => state.auth._id
const getUserIds = (state) => state.users.ids
const getUsers = (state) => state.users.data
export const removeUIDFromLIstAndSort = createSelector(
  [getUID, getUserIds, getUsers],
  (UID, ids, users) => {
    var userIds = ids.slice();
    var index = ids.indexOf(UID);
    if(index !== -1){
      userIds.splice(index,1);
    }
    userIds.sort((idA,idB)=>{
      return users[idA].email.localeCompare(users[idB].email)
    })
    return userIds
  }
)

const getWpts = (state) => state.directions.waypoints
const getRouteType = (state, props) => props.routeType

export const waypointsSelector = createSelector(
  [getWpts, getRouteType],
  function(wpts, route) {
    if (route === 'PM') {
      return wpts.slice().reverse();
    } else {
      return wpts;
    }
  }
)
