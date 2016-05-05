'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Message = require('../message.jsx');
var printStyle = require('raw!../mapPage/printStyle_css')

const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;

var DirectionsBody = React.createClass({

  print: function() {
    var w=window.open("about:blank", 'win');
    w.document.write('<!DOCTYPE html><html><head>');
    w.document.write('<title>Options, Inc. | Vehicles Report</title>');
    w.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>')
    w.document.write('<style type="text/css">');
    w.document.write(printStyle);
    w.document.write('</style></head><body>');
    w.document.write(document.getElementById(this.props.routeType + "-report").innerHTML);
    w.document.write('</body></html>')
    setTimeout(function(){w.stop()}, 1000); // fix perpetual loading on firefox
    //w.print();
    //w.close();
  },
  render:function(){
    var self = this;
    var route = this.props.route;
    var maxPassengerDuration = Math.ceil(route.maxPassengerDuration/MINUTES_IN_HOUR);
    return(
      <div>
      <div><button className="btn btn-default" onClick={this.print}> <i className="fa fa-print"></i> Print </button></div>
      <div id={this.props.routeType + "-report"}>
        <div><b>ROUTE {this.props.routeType}</b></div>
        <div><b>THIS ROUTE HAS MEDS</b></div>
        <div><b>Passengers</b></div>
        {
          self.props.vehicle.consumers.map(function(consumerId){
            return(
              <div key={consumerId}>{self.props.consumers[consumerId].name}</div>
            )
          })
        }
        <div><b>Max Passenger Duration (w/out stops and traffic) </b></div>
        <div>{maxPassengerDuration} minutes</div>
        {maxPassengerDuration > this.props.maxConsumerRouteTime?
          <Message message={{type:"info", msg:"The max passenger duration is greater than the maximum route time setting"}}/>
          :null
        }
        <div><b>Total Duration (w/out stops and traffic) </b></div>
        <div>{Math.ceil(route.totalDuration/MINUTES_IN_HOUR)} minutes</div>

        <div><b>Total Distance</b> </div>
        <div>{Math.ceil(route.totalDistance*MILES_IN_METER)} miles</div>
        {
          route.legs.map(function(leg, index){
            return(
              <div key={index}>
                <div> <b>{leg.start_location_name}</b></div>
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
                  <div> <b>{leg.end_location_name}</b></div>
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
module.exports = connect(mapStateToProps)(DirectionsBody)
