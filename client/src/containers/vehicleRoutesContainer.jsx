var connect = require('react-redux').connect;
var VehicleRoutes = require('../components/vehicleRoutes.jsx');
var actions = require('../actions/vehicleRoutesActions.js');
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state){
  //gets the routes of the app state and maps it to the vehicleRoutes property of the VehicleRoutes Component
  return{
    vehicleRoutes:state.vehicleRoutes
  }
}

var mapDispatchToProps = function(dispatch){
  //maps the onAddVehicleRoute property of VehicleRoutesForm to a function that calls dispatch
  return{
    onDeleteButtonClick:function(id){
      dispatch(actions.destroy(id));
    },
    onEditButtonClick:function(id){
      dispatch(actions.setEditMode(id));
    },
    onAddButtonClick:function(id){
      dispatch(actions.setAddMode());
    }

  }
}

var VehicleRoutesContainer = connect(mapStateToProps,mapDispatchToProps)(VehicleRoutes);

module.exports = VehicleRoutesContainer;
