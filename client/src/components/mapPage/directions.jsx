'use strict'

var React = require('react');
var connect = require('react-redux').connect;

const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;

var Directions = React.createClass({
  render: function() {
    var totalDuration = 0;
    var totalDistance = 0;
    return (
        <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Directions</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool">
                  <i className="fa fa-print"></i>
                </button>
                <button type="button" className="btn btn-box-tool">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="box-body" style={{display: "block"}}>
        {
          this.props.legs.map(function(leg, index){
            var routeSegment = index + 1;
            totalDuration += leg.duration.value;
            totalDistance += leg.distance.value;
            return(
              <div key={index}>
                <div> <b>Route Segment: {routeSegment}</b></div>
                <div> {leg.start_address} to </div>
                <div> {leg.end_address} </div>
                {
                  leg.steps.map(function(step,index){
                    return(
                      <div key={index} dangerouslySetInnerHTML={{__html: step.instructions}}/>
                    )
                  })
                }
                <div> Leg Distance: {leg.distance.text}</div>
                <div> Leg Duration: {leg.duration.text}</div>
                <p/>
              </div>
            )
          })
        }
        <div><b>Total Duration (w/out stops and traffic) </b></div>
        <div>{Math.ceil(totalDuration/MINUTES_IN_HOUR)} minutes</div>

        <div><b>Total Distance</b> </div>
        <div>{Math.ceil(totalDistance*MILES_IN_METER)} miles</div>
        </div>
      </div>
    )
  }

})

var mapStateToProps = function(state){
  return {
    legs : state.directions.routes[0].legs
  }
}

module.exports = connect(mapStateToProps)(Directions);
