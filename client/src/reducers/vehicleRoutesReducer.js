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

function update(state, vehicleRoute) {
  var newItemsState = state.items.slice();
  //replaces the item with matching id
  for (var i = 0; i < newItemsState.length; i++) {
    if (newItemsState[i]._id == vehicleRoute._id) {
      newItemsState.splice(i, 1, vehicleRoute);
      break;
    }
  }
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

function setEditMode(state, id) {
  var item = {};
  //find item that will be edited
  for (var i = 0; i < state.items.length; i++) {
    if (state.items[i]._id == id) {
      item = state.items[i];
    }
  }
  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Edit',
      item: item
    }
  });
}

var initState = {
  items: [],
  form: {
    display: true,
    verb: 'Add',
    item:{}
  }
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
    case 'UPDATE_VEHICLE_ROUTE_REQUEST':
      return state;
    case 'UPDATE_VEHICLE_ROUTE_FAILURE':
      return state;
    case 'UPDATE_VEHICLE_ROUTE_SUCCESS':
      return update(state, action.vehicleRoute);
    case 'DESTROY_VEHICLE_ROUTE_REQUEST':
      return state;
    case 'DESTROY_VEHICLE_ROUTE_FAILURE':
      return state;
    case 'DESTROY_VEHICLE_ROUTE_SUCCESS':
      return destroy(state, action.id);
    case 'SET_EDIT_MODE':
      return setEditMode(state, action.id);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
