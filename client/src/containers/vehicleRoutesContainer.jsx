var connect = require('react-redux').connect;
var Routes = require('../components/routes.jsx');
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state){
  //gets the routes of the app state and maps it to the vehicleRoutes property of the VehicleRoutes Component
  return{
    vehicleRoutes:state.vehicleRoutes
  }
}

var RoutesContainer = connect(mapStateToProps)(Routes);

module.exports = RoutesContainer;
