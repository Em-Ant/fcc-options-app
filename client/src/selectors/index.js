import { createSelector } from 'reselect'

const getIds = (state) => state.ids
const getData = (state) => state.data

export const sortAlphabetically = createSelector(
  [ getIds, getData ],
  (ids, data) => {
    var outIds = ids.slice();
    outIds.sort(function(a, b) {
      return data[a].name.localeCompare(data[b].name);
    })
    return outIds;
  }
)
