var connect = require('react-redux').connect;
var VehicleForm = require('../components/vehicleFormComponent.jsx');
var actions = require('../actions/vehicleActions.js');
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state) {
  return {form: state.vehiclesPage.form}
}
var mapDispatchToProps = function(dispatch) {
  return {
    onAddVehicle: function(vehicle) {
      dispatch(actions.create(vehicle));
    },
    onEditVehicle: function(vehicle) {
      dispatch(actions.update(vehicle));
    },
    onCloseForm:function(){
      dispatch(actions.closeForm());
    }

  }
}

var VehicleFormContainer = connect(mapStateToProps, mapDispatchToProps)(VehicleForm);

module.exports = VehicleFormContainer;
