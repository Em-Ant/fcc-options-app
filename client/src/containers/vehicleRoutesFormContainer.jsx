var connect = require('react-redux').connect;
var VehicleRoutesForm = require('../components/vehicleRoutesForm.jsx');
var addVehicleRoute = require('../actions/vehicleRoutesActions.js').addVehicleRoute;
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
// var mapStateToProps = function(state){
//   //gets the routes of the app state and maps it to the vehicleRoutes property of the VehicleRoutes Component
//   return{
//     vehicleRoutes:state.vehicleRoutes
//   }
// }
var mapDispatchToProps = function(dispatch){
  //maps the onAddVehicleRoute property of VehicleRoutesForm to a function that calls dispatch
  return{
    onAddVehicleRoute:function(vehicleRoute){
      //addVehicleRoute is a function that creates an action for the dispatcher to use
      dispatch(addVehicleRoute(vehicleRoute));
    }
  }
}

var VehicleRoutesFormContainer = connect(null, mapDispatchToProps)(VehicleRoutesForm);

module.exports = VehicleRoutesFormContainer;
