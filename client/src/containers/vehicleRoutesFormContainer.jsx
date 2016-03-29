var connect = require('react-redux').connect;
var VehicleRoutesForm = require('../components/vehicleRoutesForm.jsx');
var actions = require('../actions/vehicleRoutesActions.js');
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state) {
  return {form: state.vehicleRoutes.form}
}
var mapDispatchToProps = function(dispatch) {
  //maps the onAddVehicleRoute property of VehicleRoutesForm to a function that calls dispatch
  return {
    onAddVehicleRoute: function(vehicleRoute) {
      //addVehicleRoute is a function that creates an action for the dispatcher to use
      dispatch(actions.create(vehicleRoute));
    },
    onEditVehicleRoute: function(vehicleRoute) {
      //addVehicleRoute is a function that creates an action for the dispatcher to use
      dispatch(actions.update(vehicleRoute));
    }

  }
}

var VehicleRoutesFormContainer = connect(mapStateToProps, mapDispatchToProps)(VehicleRoutesForm);

module.exports = VehicleRoutesFormContainer;
