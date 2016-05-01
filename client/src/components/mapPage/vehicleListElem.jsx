var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;
var vehicleUtils = require('../../utils/vehicleUtils');
var BusBoxBody = require('./busBoxBody.jsx');

/**
* Props that have to be passed from parent :
*   vehicleId - id of the related vehicle
*   parentId - DOM id of the parent element, needed by bootstrap
*/

var VehicleListElement = React.createClass({
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
        <tr>
          <td>
            <a href="#" data-toggle="active-bus" onClick={this.props.toggleActive.bind(null, this.props.vehicleId)}>
              {vehicle.name}
            </a>
          </td>
          <td className="text-right">
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
          </td>
        </tr>
    )
  }
})

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    vehicles: state.vehicles.data,
    consumers: state.consumers.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    toggleActive: function(vehicleId) {
      dispatch(actions.vehicleBoxClick(vehicleId))
    },
  }
}

var VLElemC = connect(mapStateToProps, mapDispatchToProps)(VehicleListElement);

module.exports = VLElemC;
