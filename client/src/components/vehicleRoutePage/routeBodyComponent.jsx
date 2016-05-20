var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/vehicleRouteActions')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var vActions = new ModelActions(models.VEHICLES);
var connect = require('react-redux').connect;

var RouteBodyComponent = React.createClass({
  componentDidMount:function(){
    var self = this;
    var startSortPosition;
    $( "#sortable-" + self.props.vehicle._id ).sortable({
      axis: "y",
      cursor: "move",
      stop: function( event, ui ) {
        var endSortPosition = ui.item.index();
        if(startSortPosition != endSortPosition){
          self.props.onConsumerReorder(self.props.vehicle,startSortPosition, endSortPosition);
        }
      },
      start: function(event, ui) {
        startSortPosition = ui.item.index();
      }
    });
    $( "#sortable-" + self.props.vehicle._id ).disableSelection();
  },
  render: function() {
    return (
    <div>
      <div className="row">
        <div className="col-xs-6">
          <div className="checkbox">
              {this.props.vehicle.driver?
              <i className="fa fa-check" aria-hidden="true"></i>
              :<i className="fa fa-times" aria-hidden="true"></i>
              }
              &nbsp;Driver
          </div>
        </div>
        <div className="col-xs-6">
          <div className="checkbox">
              {this.props.vehicle.rider?
              <i className="fa fa-check" aria-hidden="true"></i>
              :<i className="fa fa-times" aria-hidden="true"></i>
              }
              &nbsp;Rider
          </div>
        </div>
      </div>
      {this.props.vehicle.consumers.length?
        <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Stop</th>
              <th>Name</th>
              <th>Needs</th>
            </tr>
          </thead>
          <tbody id={"sortable-" + this.props.vehicle._id} ref={"tbody"}>
            {
              this.props.vehicle.consumers.map(function(c_id, index) {
                return (
                  <ConsumerInfoBox
                    consumerId={c_id}
                    key={c_id + index}
                    index={index}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>:
      "Vehicle has no consumers"
      }
      </div>
    )
  }
})

import { createSelector } from 'reselect'

const getCData = (state) => state.consumers.data
const getVehicle = (state, props) => state.vehicles.data[props.vehicleId]
var assembleWaypts = createSelector (
  [getCData, getVehicle],
  function(cData, vehicle) {
  var waypoints = [];
  var addWpts = vehicle.additionalWpts.slice();
  var wptHead = addWpts[0];
  vehicle.consumers.forEach(function(c, ind) {
    while (wptHead && (wptHead.beforeConsumer == ind )) {
      waypoints.push(wptHead);
      addWpts.shift();
      wptHead = addWpts[0];
    }
    waypoints.push(cData[c]);
  })
  waypoints = waypoints.concat(addWpts);
  console.log('routeBodyComponent-waypoints', waypoints) //DEBUG
  return waypoints;
});


var mapStateToProps = function(state, ownProps) {
  return {
    waypoints: assembleWaypts(state, ownProps),
    vehicle: state.vehicles.data[ownProps.vehicleId]
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    onConsumerReorder: function(vehicle, startConsumerPosition, endConsumerPosition) {
      dispatch(actions.reorderConsumer(vehicle, startConsumerPosition, endConsumerPosition))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RouteBodyComponent);
