var connect = require('react-redux').connect;
var Vehicles = require('../components/vehiclesComponent.jsx');
var actions = require('../actions/vehicleActions.js');
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state){
return{
    needToBeFetched: state.vehicles.needToBeFetched,
    vehicles:state.vehicles.data,
    vehiclesIds:state.vehicles.ids,
    isLoading:state.vehiclesPage.isLoading,
    displayForm:state.vehiclesPage.form.display
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    fetchVehicles: function () {
      dispatch(actions.fetch());
    },
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

var VehicleRoutesContainer = connect(mapStateToProps,mapDispatchToProps)(Vehicles);

module.exports = VehicleRoutesContainer;
