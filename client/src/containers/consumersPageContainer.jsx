var connect = require('react-redux').connect;
var Consumers = require('../components/consumersPage/consumersPageComponent.jsx');
var actions = require('../actions/consumerActions.js');

var ModelActions = require('../actions/modelActions.js');
var models = require('../constants/models.js');
var actions = new ModelActions(models.CONSUMERS);
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
      dispatch(actions.fetch());
    },
    loadVehicles: function () {
      dispatch(vehicleActions.fetch());
    },
    handleEditConsumer : function(updatedConsumer) {
      dispatch(actions.update(updatedConsumer))
    },
    handleAddConsumer : function(newConsumer) {
      dispatch(actions.create(newConsumer))
    },
    setEditMode: function (id) {
      dispatch(actions.setEditMode(id))
    },
    resetEditMode: function () {
      dispatch(actions.closeForm())
    },
    deleteConsumer: function(id) {
      dispatch(actions.delete(id))
    },
    setAddMode: function() {
      dispatch(actions.setAddMode())
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Consumers);
