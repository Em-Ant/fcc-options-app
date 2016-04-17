'use strict'

var React = require('react');
var Alert = require('./alertModal.jsx');
var UserForm = require('./userFormComponent.jsx');

var Users = React.createClass({
  /*
  componentDidMount: function () {
    if(this.props.consumersNeedToBeFetched) {
      this.props.loadConsumers();
    }
    if(this.props.vehiclesNeedToBeFetched) {
      this.props.loadVehicles();
    }
  },*/
  getDefaultProps: function() {
    return {
      displayForm: true,
      userIds: [1,2],
      users : {
        '1': {email:'test@test.com', role: 'user'},
        '2': {email: 'admin@test.com', role: 'admin'}
      }
    }
  },
  render: function() {

    var modalBody = 'test';/*this.props.deleteId !== undefined ?
    "Are You sure You want to delete Consumer '"
      + this.props.consumers[this.props.deleteId].name + "' ?"
      : "";*/
    return (
      <div className="content-wrapper">
        <Alert modalId="consumer-delete-alert" modalTitle="Confirm Deletion..."
          modalBody={modalBody}
          handleConfirm={null}
        />
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Users</h3>
                  <span className="pull-right">
                    <button className="btn btn-success" onClick={null}>
                      Add New User
                    </button>
                  </span>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>e-mail</th>
                        <th>Role</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.userIds.map(function(id, index) {
                        var user = this.props.users[id];
                        return (
                          <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="text-center">
                              <button className="btn btn-sm btn-default in-table"
                                title="Edit Role" type="button"
                                onClick={null}>
                                <i className="fa fa-wrench"></i>
                              </button>
                              <button className="btn btn-sm btn-default in-table"
                                title="Reset Password" type="button"
                                onClick={null}>
                                <i className="fa fa-key"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-default in-table"
                                title="Delete"  data-toggle="modal"
                                data-target="#consumer-delete-alert" type="button"
                                onClick={null}>
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
            <UserForm
              verb={this.props.editId !== undefined ? "Edit": "Add"}
              buttonHandles={
                this.props.editId !== undefined ?
                this.props.handleEditConsumer :
                this.props.handleAddConsumer}
              defaults={
                this.props.editId !== undefined ?
                this.props.consumers[this.props.editId] :
                {}}
              user={{email: 'test@test.com', role: 'user'}}
              editId={this.props.editId}
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

module.exports = Users;
