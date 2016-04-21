'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var ConsumerMarkerInfo = require('./consumerMarkerInfo.jsx');
var ClusterInfo = React.createClass({
  render: function() {
    var self = this;
    return (
        <div>
          <div className="box-body">
            <ul className="products-list product-list-in-box">
      {this.props.cluster.markers.map(function(marker, index){
        var c_id = marker.consumerId;
        var consumer = self.props.consumers[c_id];
        var assignedVehicleId = self.props.consumersToVehiclesMap[c_id];
        var assignedVehicle = self.props.vehicles[assignedVehicleId];
        return(
          <li key={c_id} className="item">
            <div className="cluster-infowindow-marker">
              <img
                src={marker.getIcon()}
                onClick={self.props.markerClick.bind(null, marker.consumerId )}
                className="clickable"/>
           </div>
            <div className="product-info">
            <ConsumerMarkerInfo  consumer = {consumer} assignedVehicle = {assignedVehicle}/>
            </div>
          </li>
          )
      })}

          </ul>
        </div>
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
module.exports = ClusterInfo;
