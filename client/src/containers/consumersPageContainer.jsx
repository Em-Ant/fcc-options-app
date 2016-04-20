var connect = require('react-redux').connect;
var Consumers = require('../components/consumersPage/consumersPageComponent.jsx');
var actions = require('../actions/consumerActions.js');

var ModelActions = require('../actions/modelActions.js');
var models = require('../constants/models.js');
var vehicleActions = new ModelActions(models.VEHICLES);

var mapStateToProps = function(state){

  return {
    vehiclesNeedToBeFetched: state.vehicles.needToBeFetched,
    consumersNeedToBeFetched: state.consumers.needToBeFetched,
    consumerIds: state.consumers.ids,
    consumers: state.consumers.data,
    loadingConsumers: state.consumersForm.loadingConsumers,
    editId: state.consumersForm.editId,
    formLoading : state.consumersForm.updatingConsumers,
    deleteId: state.consumersForm.deleteId,
    displayForm: state.consumersForm.displayForm,
    errorMsg: state.consumersForm.errorMsg
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    loadConsumers: function () {
      dispatch(actions.loadConsumers());
    },
    loadVehicles: function () {
      dispatch(vehicleActions.fetch());
    },
    handleEditConsumer : function(updatedConsumer) {
      dispatch(actions.editConsumer(updatedConsumer))
    },
    handleAddConsumer : function(newConsumer) {
      dispatch(actions.addConsumer(newConsumer))
    },
    setEditMode: function (id) {
      dispatch(actions.setEditMode(id))
    },
    resetEditMode: function () {
      dispatch(actions.resetEditMode())
    },
    setDeleteIndex: function(id) {
      dispatch(actions.setDeleteId(id))
    },
    deleteConsumer: function() {
      dispatch(actions.deleteConsumer())
    },
    setAddMode: function() {
      dispatch(actions.setAddMode())
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Consumers);
