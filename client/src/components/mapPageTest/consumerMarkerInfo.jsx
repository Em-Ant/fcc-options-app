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

// var mapStateToProps = function(state, ownProps){
//   // TODO get everything from redux state
//   return {
//     consumer: ownProps.consumer,
//     flags: ownProps.flags,
//     assignedVehicle: ownProps.assignedVehicle
//   }
// }
// module.exports = connect(mapStateToProps)(ConsumerMarkerInfo);
module.exports = ConsumerMarkerInfo;
