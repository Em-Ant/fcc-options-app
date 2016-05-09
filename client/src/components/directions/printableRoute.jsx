
var React = require('react');
var connect = require('react-redux').connect;
var _addFlags = require('../../utils/addConsumerFlags');

const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;



var PrintableRoute = React.createClass({
  render:function(){
    var self = this;
    var route = this.props.route;
    var maxPassengerDuration = Math.ceil(route.maxPassengerDuration/MINUTES_IN_HOUR);
    var consumers =  self.props.vehicle.consumers;
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
            return(
              <div key={index}>
                <div> <h3>{leg.start_location_name}</h3></div>
                <div> {leg.start_address} </div>
                <p/>
                {
                  leg.steps.map(function(step,index){
                    return(
                      <div key={index} dangerouslySetInnerHTML={{__html: step.html_instructions}}/>
                    )
                  })
                }
                <p/>
                {index==route.legs.length-1?
                  <div>
                  <div> <h3>{leg.end_location_name}</h3></div>
                  <div> {leg.end_address} </div>
                  <p/>
                  </div>
                  :null
                }
              </div>
            )
          })
        }
        </div>

      </div>
    )
  }

})

var mapStateToProps = function(state, ownProps){
  var route;
  if(ownProps.routeType=="PM"){
    route = state.directions.eveningRoute;
  }else{
    route = state.directions.morningRoute;
  }
  return {
    vehicle: state.vehicles.data[state.directions.v_id],
    consumers: state.consumers.data,
    route : route,
    maxConsumerRouteTime: state.settings.maxConsumerRouteTime
  }
}
module.exports = connect(mapStateToProps)(PrintableRoute)
