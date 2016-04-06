var actionTypes = require('../constants/actionTypes/vehicleActionTypes');

function load(state, vehicles) {
  var s = {};
  vehicles.forEach(function(v){
    s[v._id] = v;
  });
  var ids = Object.keys(s);
  return Object.assign({}, state, {data: s, ids: ids});
}

function add(state, newVehicle) {
  
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[newVehicle._id] = newVehicle;
  ids.push(newVehicle._id);
  var newState = Object.assign({}, state, {ids: ids, data: data});

  return newState;
}


function update(state, vehicle) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[vehicle._id] = vehicle;
  
  return Object.assign({}, state, {data: data, ids: ids});
}


function destroy(state, id) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  delete data[id];
  var ind = ids.indexOf(id);
  ids.splice(ind, 1);
  
  return Object.assign({}, state, {ids: ids, data: data});
}



var vehiclesReducer = function(state, action) {
  state = state || {ids:[], data:{}};
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return load(state, action.vehicles);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return add(state, action.addedVehicle);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return update(state, action.vehicle);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
