'use strict'

var React = require('react');
var connect = require('react-redux').connect;

const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;

var DirectionsBody = React.createClass({

  render:function(){
    var route = this.props.route;
    return(
      <div>
      {
        route.legs.map(function(leg, index){
          var routeSegment = index + 1;
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
      <div><b>Total Duration (w/out stops and traffic) </b></div>
      <div>{Math.ceil(route.totalDuration/MINUTES_IN_HOUR)} minutes</div>

      <div><b>Max Passenger Duration (w/out stops and traffic) </b></div>
      <div>{Math.ceil(route.maxPassengerDuration/MINUTES_IN_HOUR)} minutes</div>

      <div><b>Total Distance</b> </div>
      <div>{Math.ceil(route.totalDistance*MILES_IN_METER)} miles</div>
      </div>
    )
  }
})

var mapStateToProps = function(state, ownProps){
  var routeIndex=0;
  if(ownProps.routeType=="PM"){
    routeIndex=1;
  }else{
    routeIndex=0;
  }
  return {
    route : state.directions.routes[routeIndex]
  }
}
module.exports = connect(mapStateToProps)(DirectionsBody)
