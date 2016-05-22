
var React = require('react');
var connect = require('react-redux').connect;
var moment = require('moment');
var routeConstants = require('../../constants/routeConstants.js');
var _addFlags = require('../../utils/addConsumerFlags');


const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;

function _hasDescription(waypoints, index) {
  return (index > 0 && waypoints[index] && waypoints[index].description)
}

var PrintableRoute = React.createClass({
  render:function(){
    var self = this;
    var route = this.props.route;
    var maxPassengerDuration = Math.ceil(route.maxPassengerDuration/routeConstants.MINUTES_IN_HOUR);
    var consumers =  self.props.vehicle.consumers;
    var routeStartTime = moment(this.props.routeStartTime);
    var routeTime = moment(this.props.routeStartTime);
    var routeHasMeds = consumers.some(function(consumerId){
      var consumer = self.props.consumers[consumerId];
      return consumer.hasMedications
    })
    //HACK: When we switch to use drop in waypoints, this might change.
    if(this.props.routeType=="PM"){
      consumers = consumers.slice().reverse();
    }
    return(
      <div className="container printable-route">
        <div>
        <div className="text-center"><h3>{this.props.vehicle.name} {this.props.routeType} Route </h3></div>
        {routeHasMeds?<div className="text-center"><h4>THIS ROUTE HAS MEDS</h4></div>:null}

        <p/>
        <table className="table">
          <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Address</th>
            <th>Needs</th>
          </tr>
          </thead>
          <tbody>
        {consumers.map(function(consumerId){
            var consumer = self.props.consumers[consumerId];
            var flags = _addFlags(consumer);
            var needFlags = flags.needs;
            return(
              <tr key={consumerId}>
                <td>{consumer.name}</td>
                <td>{consumer.address}</td>
                <td><div
                  dangerouslySetInnerHTML={{__html:flags.flagsString}}
                /></td>
              </tr>
            )
          })
        }</tbody>
        </table>
        <p/>
        {
          route.legs.map(function(leg, index){
            if(leg.start_address != leg.end_address){
              routeTime.add(leg.duration.value + self.props.vehicleWaitTime,'s')
            }
            return(

              <div key={index}>
                {index==0?
                  <div>
                  <p/>
                  <div> <b>{leg.start_location_name} - {routeStartTime.format(routeConstants.TIME_FORMAT)}</b></div>
                  <div> {leg.start_address} </div>
                  <p/>
                  </div>
                  :null
                }

                {
                  leg.steps.map(function(step,index){
                    return(
                      <div key={index} dangerouslySetInnerHTML={{__html: step.html_instructions}}/>
                    )
                  })
                }
                <p/>
                <div> <b>{leg.end_location_name} - {routeTime.format(routeConstants.TIME_FORMAT)}</b>
                {
                    _hasDescription(self.props.waypoints, index)
                    ? <span> {' - ' + _hasDescription(self.props.waypoints, index)}</span>
                  : null
                }
                </div>
                <div> {leg.end_address} </div>
                <p/>
              </div>
            )
          })
        }
        </div>

      </div>
    )
  }

})

import { waypointsSelector } from '../../selectors'

var mapStateToProps = function(state, ownProps){
  var route;
  var routeStartTime;
  if(ownProps.routeType==routeConstants.PM_ROUTE_TYPE){
    route = state.directions.eveningRoute;
    routeStartTime = state.directions.eveningStartTime;
  }else{
    route = state.directions.morningRoute;
    routeStartTime = state.directions.morningStartTime;
  }
  return {
    waypoints: waypointsSelector(state, ownProps),
    vehicle: state.vehicles.data[state.directions.v_id],
    consumers: state.consumers.data,
    route : route,
    routeStartTime: routeStartTime,
    maxConsumerRouteTime: state.settings.maxConsumerRouteTime,
    vehicleWaitTime: routeConstants.VEHICLE_WAIT_TIME_SECONDS
  }
}
module.exports = connect(mapStateToProps)(PrintableRoute)
