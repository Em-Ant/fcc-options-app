
module.exports.assembleWaypts = function(vehicle, cData) {
var waypoints = [];
var addWpts = vehicle.additionalWpts.slice();
var wptHead = addWpts[0];
vehicle.consumers.forEach(function(c, ind) {
  while (wptHead && (wptHead.beforeConsumer == ind )) {
    waypoints.push(wptHead);
    addWpts.shift();
    wptHead = addWpts[0];
  }
  if (cData) {
    waypoints.push(cData[c])
  } else  {
    waypoints.push(c);
  }
})
waypoints = waypoints.concat(addWpts);
return waypoints;
};

module.exports.disassembleWaypts = function(waypts, populated) {
  var wpts = waypts.slice();
  var cData = [];
  var addWpts = [];
  var wIndex = 0;
  var cIndex = 0;
  wpts.forEach(function(w) {
    if (w._type !== 'wpt') {
      if (populated) {
        cData.push(w);
      } else {
        cData.push(w._id);
      }
      ++cIndex;
    } else {
      w.beforeConsumer = cIndex;
      w.index = wIndex++;
      addWpts.push(w);
    }
  })
  return {consumers: cData, additionalWpts: addWpts}
}
