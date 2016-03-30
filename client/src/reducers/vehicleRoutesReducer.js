

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
    isLoading:true
  });
}

function destroyFailure(state) {
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
    case 'FETCH_VEHICLE_ROUTES_REQUEST':
      return fetchRequest(state);
    case 'FETCH_VEHICLE_ROUTES_FAILURE':
      return fetchFailure(state);
    case 'FETCH_VEHICLE_ROUTES_SUCCESS':
      return fetchSuccess(state, action.vehicleRoutes);
    case 'ADD_VEHICLE_ROUTE_REQUEST':
      return addRequest(state);
    case 'ADD_VEHICLE_ROUTE_FAILURE':
      return addFailure(state, action.message);
    case 'ADD_VEHICLE_ROUTE_SUCCESS':
      return add(state, action.addedVehicleRoute);
    case 'UPDATE_VEHICLE_ROUTE_REQUEST':
      return updateRequest(state);
    case 'UPDATE_VEHICLE_ROUTE_FAILURE':
      return updateFailure(state, action.message);
    case 'UPDATE_VEHICLE_ROUTE_SUCCESS':
      return update(state, action.vehicleRoute);
    case 'DESTROY_VEHICLE_ROUTE_REQUEST':
      return destroyRequest(state);
    case 'DESTROY_VEHICLE_ROUTE_FAILURE':
      return destroyFailure(state);
    case 'DESTROY_VEHICLE_ROUTE_SUCCESS':
      return destroy(state, action.id);
    case 'SET_EDIT_MODE':
      return setEditMode(state, action.id);
    case 'SET_ADD_MODE':
      return setAddMode(state);
    case 'CLOSE_FORM':
      return closeForm(state);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
