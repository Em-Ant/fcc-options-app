var actionTypes = require('../constants/actionTypes/vehicleActionTypes');

function fetchRequest(state) {
  return Object.assign({}, state, {
    isLoading:true
  });
}

function fetchFailure(state, message) {
  return Object.assign({}, state, {
    isLoading:false,
    message: {
      type: "error",
      msg: "There was an error retrieving vehicle routes"
    }
  });
}

function fetchSuccess(state, vehicles) {
  return Object.assign({}, state, {
    isLoading:false,
    items: vehicles
  });
}

function addRequest(state, addedVehicle) {
    var newFormState = Object.assign({}, state.form, {
      isLoading:true
    });
    return Object.assign({}, state, {
      isLoading:true,
      form:newFormState
    });
}

function addFailure(state, message) {
  var newFormState = Object.assign({}, state.form, {
    isLoading:false,
    message: {
      type: "error",
      msg: message
    }
  })
  return Object.assign({}, state, {
    isLoading:false,
    form: newFormState
  });
}

function add(state, addedVehicle) {
  var newItemsState = state.items.slice();
  newItemsState.push(addedVehicle);
  var newFormState = Object.assign({}, state.form, {
    display:false
  })
  return Object.assign({}, state, {
    isLoading:false,
    items: newItemsState
  }, {
    form: newFormState
  });
}


function updateRequest(state) {
  var newFormState = Object.assign({}, state.form, {
    isLoading:true
  });
  return Object.assign({}, state, {
    isLoading:true,
    form:newFormState
  });
}

function updateFailure(state, message) {
  var newFormState = Object.assign({}, state.form, {
    isLoading:false,
    message: {
      type: "error",
      msg: message
    }
  })
  return Object.assign({}, state, {
    isLoading:false,
    form: newFormState
  });
}
function update(state, vehicle) {
  var newItemsState = state.items.slice();
  //replaces the item with matching id
  for (var i = 0; i < newItemsState.length; i++) {
    if (newItemsState[i]._id == vehicle._id) {
      newItemsState.splice(i, 1, vehicle);
      break;
    }
  }
  var newFormState = Object.assign({}, state.form, {
    isLoading:false,
    display:false
  })
  return Object.assign({}, state, {
    isLoading:false,
    items: newItemsState
  }, {
    form: newFormState
  });
}


function destroyRequest(state) {
  return Object.assign({}, state, {
    isLoading:true,
    form:{
      display:false
    }
  });
}

function destroyFailure(state) {
  return Object.assign({}, state, {
    isLoading:false,
    message: {
      type: "error",
      msg: "There was an error deleting vehicle"
    }
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
    isLoading:false,
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

function setAddMode(state) {
  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Add',
      item: {}
    }
  });
}

function closeForm(state) {
  return Object.assign({}, state, {
    form: {
      display: false
    }
  });
}

var initState = {
  isLoading:false,
  items: [],
  form: {
    display: false,
    verb: 'Add',
    item: {}
  }
};
var vehiclesReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_REQUEST:
      return fetchRequest(state);
    case actionTypes.FETCH_VEHICLES_FAILURE:
      return fetchFailure(state);
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return fetchSuccess(state, action.vehicles);
    case actionTypes.ADD_VEHICLE_REQUEST:
      return addRequest(state);
    case actionTypes.ADD_VEHICLE_FAILURE:
      return addFailure(state, action.message);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return add(state, action.addedVehicle);
    case actionTypes.UPDATE_VEHICLE_REQUEST:
      return updateRequest(state);
    case actionTypes.UPDATE_VEHICLE_FAILURE:
      return updateFailure(state, action.message);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return update(state, action.vehicle);
    case actionTypes.DESTROY_VEHICLE_REQUEST:
      return destroyRequest(state);
    case actionTypes.DESTROY_VEHICLE_FAILURE:
      return destroyFailure(state);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return destroy(state, action.id);
    case actionTypes.SET_VEHICLE_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.SET_VEHICLE_ADD_MODE:
      return setAddMode(state);
    case actionTypes.CLOSE_VEHICLE_FORM:
      return closeForm(state);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
