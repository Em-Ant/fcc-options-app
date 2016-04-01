var connect = require('react-redux').connect;
var Consumers = require('../components/consumers.jsx');
var actions = require('../actions/consumerActions.js');

var mapStateToProps = function(state){

  return {
    consumersNeedToBeFetched: state.consumersPage.consumersNeedToBeFetched,
    consumers: state.consumersPage.consumers,
    loadingConsumers: state.consumersPage.loadingConsumers,
    editIndex: state.consumersPage.editIndex,
    formLoading : state.consumersPage.updatingConsumers,
    deleteIndex: state.consumersPage.deleteIndex,
    displayForm: state.consumersPage.displayForm
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    loadConsumers: function () {
      dispatch(actions.loadConsumers());
    },
    handleEditConsumer : function(newConsumer, index) {
      dispatch(actions.editConsumer(newConsumer, index))
    },
    handleAddConsumer : function(newConsumer) {
      dispatch(actions.addConsumer(newConsumer))
    },
    setEditMode: function (index) {
      dispatch(actions.setEditMode(index))
    },
    resetEditMode: function () {
      dispatch(actions.resetEditMode())
    },
    setDeleteIndex: function(index) {
      dispatch(actions.setDeleteIndex(index))
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
