/*
Sets the vehicleRoutes state
*/
function fetch(state, vehicleRoutes) {
  return Object.assign({}, state, {
    items: vehicleRoutes
  });
}

function add(state, addedVehicleRoute) {
  var newItemsState = state.items.slice();
  newItemsState.push(addedVehicleRoute);
  return Object.assign({}, state, {
    items: newItemsState
  });
}

function destroy(state, id) {
  var newItemsState = state.items.slice();
  //removes the item with matching id
  for (var i = 0; i < newItemsState.length; i++) {
    if (newItemsState[i]._id == id) {
      newItemsState.splice(i, 1);
      break;
    }
  }

  return Object.assign({}, state, {
    items: newItemsState
  });
}

var initState = {
  items: []
};
var vehicleRoutesReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'FETCH_VEHICLE_ROUTES_REQUEST':
      return state;
    case 'FETCH_VEHICLE_ROUTES_FAILURE':
      return state;
    case 'FETCH_VEHICLE_ROUTES_SUCCESS':
      return fetch(state, action.vehicleRoutes);
    case 'ADD_VEHICLE_ROUTE_REQUEST':
      return state;
    case 'ADD_VEHICLE_ROUTE_FAILURE':
      return state;
    case 'ADD_VEHICLE_ROUTE_SUCCESS':
      return add(state, action.addedVehicleRoute);
    case 'DESTROY_VEHICLE_ROUTE_REQUEST':
      return state;
    case 'DESTROY_VEHICLE_ROUTE_FAILURE':
      return state;
    case 'DESTROY_VEHICLE_ROUTE_SUCCESS':
      return destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
