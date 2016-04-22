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
        var consumerId=marker.consumerId;
        return(
          <li key={consumerId} className="item">
            <div className="cluster-infowindow-marker">
              <img
                src={marker.getIcon()}
                onClick={self.props.markerClick.bind(null, consumerId )}
                className="clickable"/>
           </div>
            <div className="product-info">
            <ConsumerMarkerInfo consumerId={consumerId} store={self.props.store}/>
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

module.exports = ClusterInfo;
