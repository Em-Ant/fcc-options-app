'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/consumerActions');

var Ajax = require('../../js/ajax-functions.js');
var ConsumerForm = require('./consumerForm.jsx');
var Alert = require('./alertModal.jsx');

var Consumers = React.createClass({
  componentDidMount: function () {
    if(this.props.consumersNeedToBeFetched)
      this.props.loadConsumers();
  },
  render: function() {

    var modalBody = this.props.deleteIndex !== undefined ?
    "Are You sure You want to delete Consumer '"
      + this.props.consumers[this.props.deleteIndex].name + "' ?"
      : "";
    return (
      <div className="content-wrapper">
        <Alert modalId="consumer-delete-alert" modalTitle="Confirm Deletion..."
          modalBody={modalBody}
          handleConfirm={this.props.deleteConsumer}
        />
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Consumers</h3>
                  <span className="pull-right">
                    <button className="btn btn-success" onClick={this.props.setAddMode}>
                      Add New Consumer
                    </button>
                  </span>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Issues</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.consumers.map(function(consumer, index) {
                        return (
                          <tr key={index}>
                            <td>{consumer.name}</td>
                            <td>{consumer.sex}</td>
                            <td>{consumer.address}</td>
                            <td>{consumer.phone}</td>
                            <td>
                              {consumer.hasWheelchair ? <span className="label label-primary">Wheelchair</span> : null}
                              {consumer.hasSeizures ? <span className="label label-danger">Seizures</span> : null}
                              {consumer.hasMedications ? <span className="label label-warning">Medications</span> : null}
                              {consumer.needsTwoSeats ? <span className="label label-default">Two Seats</span> : null}
                              {consumer.needsWave ? <span className="label label-info">Needs Wave</span> : null}
                              {consumer.cannotSitNearOppositeSex ? <span className="label label-success">Behavioral Issues</span> : null}
                            </td>
                            <td className="text-center">

                                <button className="btn btn-sm btn-default in-table"
                                  title="Edit" type="button"
                                  onClick={this.props.setEditMode.bind(null, index)}>
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-default in-table"
                                  title="Delete"  data-toggle="modal"
                                  data-target="#consumer-delete-alert" type="button"
                                  onClick={this.props.setDeleteIndex.bind(null, index)}>
                                  <i className="fa fa-trash-o"></i>
                                </button>

                            </td>
                          </tr>
                          );
                        }.bind(this))
                      }
                    </tbody>
                  </table>
                </div>
                {this.props.loadingConsumers ?
                <div className="overlay">
                  <i className="fa fa-refresh fa-spin"></i>
                </div>
                : null }
              </div>
            </div>
          </div>
          {this.props.displayForm ?
            <ConsumerForm
              verb={this.props.editIndex !== undefined ? "Edit": "Add"}
              buttonHandles={
                this.props.editIndex !== undefined ?
                this.props.handleEditConsumer :
                this.props.handleAddConsumer}
              defaults={
                this.props.editIndex !== undefined ?
                this.props.consumers[this.props.editIndex] :
                {}}
              editIndex={this.props.editIndex}
              loading={this.props.formLoading}
              onClose={this.props.resetEditMode}
            />
            : null
        }

        </section>
      </div>

    )
  }
});

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

module.exports.Consumers = Consumers;
module.exports.ConsumersContainer = connect(mapStateToProps, mapDispatchToProps)(Consumers);
