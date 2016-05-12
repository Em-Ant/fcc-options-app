'use strict'

var React = require('react');
var ConsumerMarkerInfo = require('./consumerMarkerInfo.jsx');
var ClusterInfo = React.createClass({
  render: function() {
    var self = this;
    return (
      <div>
        <div className="box-body">
          <ul className="products-list product-list-in-box">
            {this.props.cluster.markers.map(function(marker, index) {
              var consumerId = marker.consumerId;
              return (
                <li key={consumerId} className="item">

                  <div className="cluster-infowindow-marker">
                    <h3 dangerouslySetInnerHTML={{
                      __html: marker.getIcon().tag
                    }} style={{color:marker.getIcon().fillColor
                      }}onClick={self.props.markerClick.bind(null, consumerId)} className="info-window-marker clickable"/>
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
