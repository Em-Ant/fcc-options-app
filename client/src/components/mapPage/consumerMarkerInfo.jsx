'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var addFlags = require('../../utils/addConsumerFlags');
var ConsumerMarkerInfo = React.createClass({

  render: function() {
    var flags = addFlags(this.props.consumer);
    return (
      <div>
      <div>{this.props.consumer.name}</div>
      <div>{this.props.consumer.address}</div>
      {flags.needs?
        <div>Needs :<span dangerouslySetInnerHTML={{__html:flags.flagsString}}></span></div>
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

var mapStateToProps = function(state, ownProps){
  var assignedVehicleId = state.vehicles.consumersToVehiclesMap[ownProps.consumerId];
  return {
    consumer: state.consumers.data[ownProps.consumerId],
    flags:addFlags(state.consumers.data[ownProps.consumerId]),
    assignedVehicle: state.vehicles.data[assignedVehicleId]
  }
}
module.exports = connect(mapStateToProps)(ConsumerMarkerInfo);
