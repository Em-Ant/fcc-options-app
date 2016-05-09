'use strict'

var React = require('react');

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
  componentDidUpdate: function(prevProps) {
    if(prevProps.currPage > this.props.pages) {
      this.props.setPage(this.props.pages);
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
  incrPage : function (e) {
    e.preventDefault();
    if (this.props.currPage < this.props.pages) {
      this.props.setPage(this.props.currPage + 1)
    }
  },
  decrPage : function (e) {
    e.preventDefault();
    if (this.props.currPage > 1) {
      this.props.setPage(this.props.currPage - 1);
    }
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
                  <form className="box-head-form">
                    <div className="form-group">
                      <label>
                        <input
                          type="radio"
                          name="filter_type"
                          id="c_name_radio"
                          value="name"
                          onChange={this.props.setFilterType}
                          checked={this.props.filterType === "name"}/>
                          &nbsp;name
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="filter_type"
                          id="c_address_radio"
                          value="address"
                          onChange={this.props.setFilterType}
                          cheched={this.props.filterType === "address"}/>
                          &nbsp;address
                      </label>
                      <label>
                        <input id="namefilter"type="text"
                          onChange={this.props.setFilterString}
                          value={this.props.textFilter}
                          ref="filter" placeholder="filter">
                        </input>
                      </label>
                      <label>
                        <input type="checkbox"
                          name="male"
                          checked={this.props.needsFilter.male}
                          onChange={this.props.filterChecks}/> M
                      </label>
                      <label>
                        <input type="checkbox"
                          name="female"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.female}
                          /> F
                      </label>
                      <label>
                        <input type="checkbox"
                          name="hasWheelchair"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.hasWheelchair}
                          /> <i className="fa fa-wheelchair"></i>
                      </label>
                      <label>
                        <input type="checkbox"
                          name="hasMedications"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.hasMedications}
                          /> <i className="fa fa-medkit"></i>
                      </label>
                      <label>
                        <input type="checkbox"
                          name="hasSeizures"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.hasSeizures}
                          /> SZ
                      </label>
                      <label>
                        <input type="checkbox"
                          name="needsTwoSeats"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.needsTwoSeats}
                          /> 2S
                      </label>
                      <label>
                        <input type="checkbox"
                          name="needsWave"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.needsWave}
                          /> <i className="fa fa-phone"></i>
                      </label>
                      <label>
                        <input type="checkbox"
                          name="behavioralIssues"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.behavioralIssues}
                          /> BI
                      </label>
                      <label>
                        <input type="checkbox"
                          name="noNeeds"
                          onChange={this.props.filterChecks}
                          checked={this.props.needsFilter.noNeeds}
                          /> No Needs
                      </label>
                      <span className="items-count">
                        <strong>
                           - {this.props.filteredNItems} Consumers found
                        </strong>
                      </span>
                    </div>

                  </form>

                  <span className="pull-right">
                    <button className="btn btn-success" onClick={this.props.setAddMode}>
                      Add New Consumer
                    </button>&nbsp;
                    <a href="/api/report/consumers"  className="btn btn-default" >
                      <i className="fa fa-file-excel-o"></i>&nbsp;Export to Excel
                    </a>
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
              <nav>
                <ul className="pager">
                  <li onClick={this.decrPage}><a href="#" data-toggle="pager" >Prev</a></li>
                  <li><span>{this.props.currPage} / {this.props.pages}</span></li>
                  <li onClick={this.incrPage}><a href="#" data-toggle="pager" >Next</a></li>
                </ul>
              </nav>
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
