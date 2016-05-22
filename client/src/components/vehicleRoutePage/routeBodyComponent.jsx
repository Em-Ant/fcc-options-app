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
          var waypts = self.props.waypoints.slice();
          var startWpt = waypts.splice(startSortPosition, 1);
          waypts.splice(endSortPosition, 0, startWpt[0]);
          var vData = disassembleWaypts(waypts);
          self.props.onConsumerReorder(self.props.vehicle, vData);
          $( "#sortable-" + self.props.vehicle._id ).sortable('cancel');
        }
      },
      start: function(event, ui) {
        startSortPosition = ui.item.index();
      }
    });
    $( "#sortable-" + self.props.vehicle._id ).disableSelection();
  },
  delWpt: function(ind) {
    var waypoints = this.props.vehicle.additionalWpts.slice();
    var wptToBeRemoved = this.props.waypoints[ind].index;
    waypoints.splice(wptToBeRemoved,1);
    waypoints.forEach((w,i) => {w.index = i});
    this.props.delWpt(this.props.vehicle._id, waypoints);
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
      {this.props.waypoints.length?
        <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Stop</th>
              <th>Name</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody id={"sortable-" + this.props.vehicle._id} ref={"tbody"}>
            {
              this.props.waypoints.map((w, index) => {
                return (
                  <ConsumerInfoBox
                    delWpt={this.delWpt}
                    waypoint={w}
                    key={'wpt_' + index}
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

var assembleWaypts = require('../../../../app/utils/waypointsUtils').assembleWaypts;
var disassembleWaypts = require('../../../../app/utils/waypointsUtils').disassembleWaypts;


import { createSelector } from 'reselect'

const getCData = (state) => state.consumers.data
const getVehicle = (state, props) => state.vehicles.data[props.vehicleId]
var assembleWayptsSelector = createSelector (
  [getVehicle, getCData],
  assembleWaypts
)

var mapStateToProps = function(state, ownProps) {
  return {
    waypoints: assembleWayptsSelector(state, ownProps),
    vehicle: state.vehicles.data[ownProps.vehicleId]
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    delWpt: function(v_id, newWpts) {
      dispatch(actions.editWpts(v_id, newWpts))
    },
    onConsumerReorder: function(vehicle, startConsumerPosition, endConsumerPosition) {
      dispatch(actions.reorderConsumer(vehicle, startConsumerPosition, endConsumerPosition))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RouteBodyComponent);
