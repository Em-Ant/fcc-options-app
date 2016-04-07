var update = function (state, updatedObj) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[updatedObj._id] = updatedObj;

  return Object.assign({}, state, {
    data: data,
    ids: ids,
    lastUpdated: {type: 'update', id: updatedObj._id}
  });
}

var destroy = function(state, id) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  delete data[id];
  var ind = ids.indexOf(id);
  ids.splice(ind, 1);

  return Object.assign({}, state, {
    ids: ids,
    data: data,
    lastUpdated: {type: 'destroy', id: id}
  });
}

var add = function(state, obj) {

  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[obj._id] = obj;
  ids.push(obj._id);
  var newState = Object.assign({}, state, {
    ids: ids,
    data: data,
    lastUpdated: {type: 'add', id: obj._id}});

  return newState;
}

var load = function(state, objsArray) {
  var s = {};
  objsArray.forEach(function(c){
    s[c._id] = c;
  });
  var ids = Object.keys(s);
  return Object.assign({}, state, {
    data: s,
    ids: ids,
    lastUpdated: {type: 'all'}});
}

var setRequested = function(state) {
  return Object.assign({}, state, {needToBeFetched: undefined});
}

module.exports.load = load;
module.exports.add = add;
module.exports.destroy = destroy;
module.exports.update = update;
module.exports.setRequested = setRequested;
