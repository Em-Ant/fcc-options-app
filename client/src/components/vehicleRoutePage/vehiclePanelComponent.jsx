'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var RouteBody = require('./routeBodyComponent.jsx')
var actions = require('../../actions/vehicleRouteActions')

var vehicleUtils = require('../../utils/vehicleUtils');

var VehiclePanelComponent = React.createClass({
  optimizeRoute: function (v_id) {
    this.props.optimizeRoute(v_id, this.refs.optimizeMode.value);
  },
  render: function() {
    var vehicle = this.props.vehicle
    vehicle = vehicleUtils.setVehicleCapacity(vehicle, this.props.consumers);
    console.log(vehicle);
    var availWheels = vehicle.occupiedWheelchairs < vehicle.wheelchairs
      ? 'avail-color'
      : 'unavail-color';
    var availSeats = vehicle.occupiedSeats < vehicle.seats
      ? 'avail-color'
      : 'unavail-color';
    var availFlexSeats = vehicle.occupiedFlexSeats < vehicle.flexSeats
      ? 'avail-color'
      : 'unavail-color';
    var durationBg = vehicle.maxPassengerDuration < this.props.maxPassengerDuration
      ? 'avail-color'
      : 'unavail-color';
    return (
          <div className="box box-widget map-height bus-box">
              <div className="box-header with-border" >
                  <h4 className="box-title">
                     {vehicle.name} Route
                  </h4>
                <div className="pull-right">
                {vehicle.optimized ?
                  <span
                    className="cust-label optimized"
                    title="Route optimized / mode">
                    <i className="fa fa-rocket"></i>&nbsp;{vehicle.optimized}
                  </span> : null}
                  {vehicle.maxPassengerDuration ?
                    <span
                      className={"cust-label " + durationBg}
                      title="Max Passenger Duration">
                     <i className="fa fa-clock-o"></i>(AM)&nbsp;{vehicle.maxPassengerDuration} mins
                    </span> : null}
                  {vehicle.needsMedications ?
                    <span
                      className="cust-label med"
                      title="Med Cert. staff needed">
                      <i className="fa fa-medkit"></i>
                    </span> : null}
                  <span
                    className={'cust-label ' + availSeats}
                    title="Seats">
                    <i className="fa fa-male"></i>&nbsp;
                    {vehicle.occupiedSeats}/{vehicle.seats}
                  </span>
                  {vehicle.flexSeats
                    ? <span
                        className={'cust-label ' + availFlexSeats}
                        title="Flex seats: 2 Seats / 1 Wheelchair">
                      <i className="fa fa-exchange"></i>&nbsp;
                    {vehicle.occupiedFlexSeats}/{vehicle.flexSeats}
                  </span>: null}
                  {vehicle.wheelchairs
                    ? <span
                        className={'cust-label ' + availWheels}
                        title="Wheelchairs">
                      <i className="fa fa-wheelchair"></i>&nbsp;
                    {vehicle.occupiedWheelchairs}/{vehicle.wheelchairs}
                  </span>: null}
                </div>
              </div>
              <div className="box-body" >
                <RouteBody vehicleId={vehicle._id}/>
              </div>
              <div className="box-footer">
                <form className="form-inline" style={{display: 'inline-block'}}>
                  <label>
                    Optimizer Mode: &nbsp;
                    <select
                      defaultValue={this.props.vehicle.optimized || 'auto'} className="form-control opt-select" ref="optimizeMode">
                      <option value="auto" title="Automatic Optimizer (Requires many Google API calls)">Auto &#xf071;</option>
                      <option value="first" title="Consumer in pos #1 is picked first">First Consumer</option>
                      {
                        //<option value="furthest" title="Furthest Consumer from Options, Inc. is picked first">Furthest Consumer</option>
                      }
                    </select>
                  </label>
                </form>
                <div className="btn-group pull-right">
                  <button
                    className="btn btn-default btn-sm"
                    onClick={this.optimizeRoute.bind(null, this.props.vehicleId)}
                    >Optimize Route</button>
                  <button
                    className="btn btn-default btn-sm"
                    onClick={this.props.onDirectionsClick.bind(
                      null,this.props.vehicleId)}
                    >Get Directions</button>
                </div>
              </div>
              {this.props.isLoading
                ? <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                  </div>
                : null}
          </div>
      )
    }
});

var mapStateToProps = function(state, ownProps) {
  return {
    maxPassengerDuration : state.settings.maxConsumerRouteTime,
    vehicle: state.vehicles.data[ownProps.vehicleId],
    consumers: state.consumers.data,
    isLoading: state.vehicleRoutePage.vehicleLoading || state.vehicleRoutePage.directionsLoading
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    optimizeRoute: function(v_id, mode) {
      dispatch(actions.optimizeRoute(v_id, mode));
    },
    onDirectionsClick: function(v_id) {
      dispatch(actions.displayDirections(v_id))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehiclePanelComponent);
