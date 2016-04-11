var actionTypes = require('../constants/actionTypes/vehicleRoutes');

function fetchRequest(state) {
  return Object.assign({}, state, {
    isLoading:true
  });
}

function fetchFailure(state, error) {
  return Object.assign({}, state, {
    isLoading:false,
    msg: error.responseJSON.msg
  });
}

function fetchSuccess(state, vehicleRoutes) {
  return Object.assign({}, state, {
    isLoading:false,
    items: vehicleRoutes
  });
}

function addRequest(state, addedVehicleRoute) {
    var newFormState = Object.assign({}, state.form, {
      isLoading:true
    });
    return Object.assign({}, state, {
      isLoading:true,
      form:newFormState
    });
}

function addFailure(state, error) {
  var newFormState = Object.assign({}, state.form, {
    isLoading:false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  })
  return Object.assign({}, state, {
    isLoading:false,
    form: newFormState
  });
}

function add(state, addedVehicleRoute) {
  var newItemsState = state.items.slice();
  newItemsState.push(addedVehicleRoute);
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

function updateFailure(state, error) {
  var newFormState = Object.assign({}, state.form, {
    isLoading:false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  })
  return Object.assign({}, state, {
    isLoading:false,
    form: newFormState
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

function destroyFailure(state, error) {
  return Object.assign({}, state, {
    isLoading:false,
    message: {
      type: "error",
      msg: "There was an error deleting route"
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
var vehicleRoutesReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.FETCH_VEHICLE_ROUTES_REQUEST:
      return fetchRequest(state);
    case actionTypes.FETCH_VEHICLE_ROUTES_FAILURE:
      return fetchFailure(state, action.error);
    case actionTypes.FETCH_VEHICLE_ROUTES_SUCCESS:
      return fetchSuccess(state, action.vehicleRoutes);
    case actionTypes.ADD_VEHICLE_ROUTE_REQUEST:
      return addRequest(state);
    case actionTypes.ADD_VEHICLE_ROUTE_FAILURE:
      return addFailure(state, action.error);
    case actionTypes.ADD_VEHICLE_ROUTE_SUCCESS:
      return add(state, action.addedVehicleRoute);
    case actionTypes.UPDATE_VEHICLE_ROUTE_REQUEST:
      return updateRequest(state);
    case actionTypes.UPDATE_VEHICLE_ROUTE_FAILURE:
      return updateFailure(state, action.error);
    case actionTypes.UPDATE_VEHICLE_ROUTE_SUCCESS:
      return update(state, action.vehicleRoute);
    case actionTypes.DESTROY_VEHICLE_ROUTE_REQUEST:
      return destroyRequest(state);
    case actionTypes.DESTROY_VEHICLE_ROUTE_FAILURE:
      return destroyFailure(state, action.error);
    case actionTypes.DESTROY_VEHICLE_ROUTE_SUCCESS:
      return destroy(state, action.id);
    case actionTypes.SET_VEHICLE_ROUTE_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.SET_VEHICLE_ROUTE_ADD_MODE:
      return setAddMode(state);
    case actionTypes.CLOSE_VEHICLE_ROUTE_FORM:
      return closeForm(state);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
