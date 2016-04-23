'use strict'

var React = require('react');
var connect = require('react-redux').connect;

var ConsumerForm = require('./consumerForm.jsx');
var Alert = require('../alertModal.jsx');

var Consumers = React.createClass({
  componentDidMount: function () {
    if(this.props.consumersNeedToBeFetched) {
      this.props.loadConsumers();
    }
    if(this.props.vehiclesNeedToBeFetched) {
      this.props.loadVehicles();
    }
  },
  getInitialState: function() {
    return {};
  },
  setDeleteIndex: function(id) {
    this.setState({deleteId: id});
  },
  deleteConsumer: function() {
    this.props.deleteConsumer(this.state.deleteId);
    this.setState({deleteId: undefined});
  },
  render: function() {

    var modalBody = this.state.deleteId !== undefined ?
    "Are You sure You want to delete Consumer '"
      + this.props.consumers[this.state.deleteId].name + "' ?"
      : "";
    return (
      <div className="content-wrapper">
        <Alert modalId="consumer-delete-alert" modalTitle="Confirm Deletion..."
          modalBody={modalBody}
          handleConfirm={this.deleteConsumer}
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
                        <th>Needs</th>
                        <th>Notes</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.consumerIds.map(function(id, index) {
                        var consumer = this.props.consumers[id];
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
                              {consumer.behavioralIssues ? <span className="label label-success">Behavioral Issues</span> : null}
                            </td>
                            <td>{consumer.notes}</td>
                            <td className="text-center">

                                <button className="btn btn-sm btn-default in-table"
                                  title="Edit" type="button"
                                  onClick={this.props.setEditMode.bind(null, consumer._id)}>
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-default in-table"
                                  title="Delete"  data-toggle="modal"
                                  data-target="#consumer-delete-alert" type="button"
                                  onClick={this.setDeleteIndex.bind(null, consumer._id)}>
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
              verb={this.props.editId !== undefined ? "Edit": "Add"}
              buttonHandles={
                this.props.editId !== undefined ?
                this.props.handleEditConsumer :
                this.props.handleAddConsumer}
              defaults={
                this.props.editId !== undefined ?
                this.props.consumers[this.props.editId] :
                {}}
              editId={this.props.editId}
              loading={this.props.formLoading}
              onClose={this.props.resetEditMode}
              msg={this.props.errorMsg}
            />
            : null
        }

        </section>
      </div>

    )
  }
});

module.exports = Consumers;
