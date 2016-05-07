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

const getCIds = (state) => state.consumers.ids
const getConsumers = (state) => state.consumers.data
const getC2V = (state) => state.vehicles.consumersToVehiclesMap
export const getUnassignedConsumersSorted = createSelector(
  [getCIds, getConsumers, getC2V],
  (c_ids, consumers, consumersToVehiclesMap) => {
    var unassignedConsumers = [];
    c_ids.forEach(function(c_id){
      if(!consumersToVehiclesMap[c_id]){
        unassignedConsumers.push(consumers[c_id])
      }
    })
    unassignedConsumers.sort(function(a, b){
      return a.name.localeCompare(b.name);
    })
    return unassignedConsumers;
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
