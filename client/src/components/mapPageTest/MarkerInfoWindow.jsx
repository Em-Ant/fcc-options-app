'use strict'

var React = require('react');
//TODO get props from redux
var MarkerInfoWindow = React.createClass({
  render: function() {
    return (
      <div>
      <div>{this.props.consumer.name}</div>
      <div>{this.props.consumer.address}</div>
      {this.props.flags.needs?
        <div>Needs :<span dangerouslySetInnerHTML={{__html:this.props.flags.flagsString}}></span></div>
        :null
      }
      {this.props.assignedVehicle?
        <div>Vehicle: {this.props.assignedVehicle.name}</div>
        :null
      }
      </div>
    )
  }
});
module.exports = MarkerInfoWindow;
