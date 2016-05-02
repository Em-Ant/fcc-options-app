var connect = require('react-redux').connect;
var Consumers = require('../components/consumersPage/consumersPageComponent.jsx');

var ModelActions = require('../actions/modelActions.js');
var models = require('../constants/models.js');
var actions = new ModelActions(models.CONSUMERS);
var vehicleActions = new ModelActions(models.VEHICLES);

import {paginateAndSort, getPages} from '../selectors'

const getIds = (state) => state.consumers.ids
const getData = (state) => state.consumers.data
const getPage = (state) => state.consumersForm.page
const getItemsPerPage = (state) => state.consumersForm.itemsPerPage

const pagAndSort = paginateAndSort(getIds, getData, getPage, getItemsPerPage)
const pages = getPages(getIds, getItemsPerPage)

var mapStateToProps = function(state){
  return {
    vehiclesNeedToBeFetched: state.vehicles.needToBeFetched,
    consumersNeedToBeFetched: state.consumers.needToBeFetched,
    consumerIds: pagAndSort(state),
    currPage : state.consumersForm.page,
    pages : pages(state),
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
    },
    setPage: function(page) {
      dispatch(actions.setPage(page))
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Consumers);
