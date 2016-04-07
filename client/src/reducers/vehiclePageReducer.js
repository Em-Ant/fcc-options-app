var actionTypes = require('../constants/actionTypes/vehicleActionTypes');

function fetchRequest(state) {
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchFailure(state, message) {
  return Object.assign({}, state, {
    isLoading: false,
    message: {
      type: "error",
      msg: "There was an error retrieving vehicle routes"
    }
  });
}

function fetchSuccess(state, vehicles) {
  return Object.assign({}, state, {
    isLoading: false,
    vehicles: vehicles
  });
}

function addRequest(state, vehicle) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: true,
    vehicle:vehicle
  });
  return Object.assign({}, state, {
    isLoading: true,
    form: newFormState
  });
}

function addFailure(state, message) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    message: {
      type: "error",
      msg: message
    }
  })
  return Object.assign({}, state, {
    isLoading: false,
    form: newFormState
  });
}

function add(state, addedVehicle) {
  var newFormState = Object.assign({}, state.form, {
    display: false
  })
  return Object.assign({}, state, {
    isLoading: false
  }, {
    form: newFormState
  });
}


function updateRequest(state, vehicle) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: true,
    vehicle:vehicle
  });
  return Object.assign({}, state, {
    isLoading: true,
    form: newFormState
  });
}

function updateFailure(state, message) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    message: {
      type: "error",
      msg: message
    }
  })
  return Object.assign({}, state, {
    isLoading: false,
    form: newFormState
  });
}

function update(state, vehicle) {

  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    display: false
  })
  return Object.assign({}, state, {
    isLoading: false
  }, {
    form: newFormState
  });
}


function destroyRequest(state) {
  return Object.assign({}, state, {
    isLoading: true,
    form: {
      display: false
    }
  });
}

function destroyFailure(state) {
  return Object.assign({}, state, {
    isLoading: false,
    message: {
      type: "error",
      msg: "There was an error deleting vehicle"
    }
  });
}

function destroy(state, id) {
  return Object.assign({}, state, {
    isLoading: false
  });
}

function setEditMode(state, id) {
  var vehicle = {};
  //find vehicle that will be edited
  for (var i = 0; i < state.vehicles.length; i++) {
    if (state.vehicles[i]._id == id) {
      vehicle = state.vehicles[i];
    }
  }
  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Edit',
      vehicle: vehicle
    }
  });
}

function setAddMode(state) {
  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Add',
      vehicle: {}
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
  isLoading: false,
  vehicles: [],
  form: {
    display: false,
    verb: 'Add',
    vehicle: {}
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
      return addRequest(state, action.vehicle);
    case actionTypes.ADD_VEHICLE_FAILURE:
      return addFailure(state, action.message);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return add(state);
    case actionTypes.UPDATE_VEHICLE_REQUEST:
      return updateRequest(state, action.vehicle);
    case actionTypes.UPDATE_VEHICLE_FAILURE:
      return updateFailure(state, action.message);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return update(state);
    case actionTypes.DESTROY_VEHICLE_REQUEST:
      return destroyRequest(state);
    case actionTypes.DESTROY_VEHICLE_FAILURE:
      return destroyFailure(state);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return destroy(state);
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
