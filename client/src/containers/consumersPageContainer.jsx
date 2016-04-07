var connect = require('react-redux').connect;
var Consumers = require('../components/consumersPage/consumersPageComponent.jsx');
var actions = require('../actions/consumerActions.js');

var mapStateToProps = function(state){

  return {
    consumersNeedToBeFetched: state.consumers.needToBeFetched,
    consumerIds: state.consumers.ids,
    consumers: state.consumers.data,
    loadingConsumers: state.consumersForm.loadingConsumers,
    editId: state.consumersForm.editId,
    formLoading : state.consumersForm.updatingConsumers,
    deleteId: state.consumersForm.deleteId,
    displayForm: state.consumersForm.displayForm
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    loadConsumers: function () {
      dispatch(actions.loadConsumers());
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
