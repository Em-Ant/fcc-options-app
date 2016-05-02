var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;
var vehicleUtils = require('../../utils/vehicleUtils');
var BusBoxBody = require('./busBoxBody.jsx');

/**
* Props that have to be passed from parent :
*   vehicleId - id of the related vehicle
*/

var CollapsibleBusBox = React.createClass({
  render: function() {

    var vehicle = this.props.vehicles[this.props.vehicleId];
    vehicle = vehicleUtils.setVehicleCapacity(vehicle, this.props.consumers);

    var activeClass = this.props.activeVehicleId === this.props.vehicleId
      ? ' box-primary box-solid' : ' box-default';
    var availWheels = vehicle.occupiedWheelchairs < vehicle.wheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = vehicle.occupiedSeats < vehicle.seats ?
      'avail-color' : 'unavail-color';
    var availFlexSeats = vehicle.occupiedFlexSeats < vehicle.flexSeats ?
      'avail-color' : 'unavail-color';

    return (
      <div className={" bus-box box " + activeClass} >
        <div className="box-header with-border vpanel" >
          <a
            href="#"
            data-toggle="active-vehicle"
            onClick={this.props.toggleActive.bind(null, this.props.vehicleId)}
            >
            <h4 className="box-title">
              {vehicle.name}
            </h4>
          </a>
          <div className="pull-right">
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
        <div className="box-body vpanel" >
          <BusBoxBody vehicle={vehicle}/>
        </div>
        <div className="box-footer vpanel">
          <div className="btn-group pull-right">
            <button
              className="btn btn-default btn-sm"
              onClick={this.props.optimizeRoute.bind(null, this.props.activeVehicleId)}
              >Optimize Route</button>
            <button
              className="btn btn-default btn-sm"
              onClick={this.props.onDirectionsClick.bind(
                null,this.props.activeVehicleId)}
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
})

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    vehicles: state.vehicles.data,
    consumers: state.consumers.data,
    isLoading: state.mapPage.vehicleLoading
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    optimizeRoute: function(v_id) {
      dispatch(actions.optimizeRoute(v_id));
    },
    onDirectionsClick: function(v_id) {
      if (v_id) {
        dispatch(actions.displayDirections(v_id))
      }
    },
    toggleActive: function(vehicleId) {
      dispatch(actions.vehicleBoxClick(vehicleId))
    },
  }
}

var CBBContainer = connect(mapStateToProps, mapDispatchToProps)(CollapsibleBusBox);

module.exports = CBBContainer;
