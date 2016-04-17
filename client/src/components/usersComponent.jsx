'use strict'

var React = require('react');
var Alert = require('./alertModal.jsx');
var UserForm = require('./userFormComponent.jsx');
var connect = require('react-redux').connect;
var actions = require('../actions/userActions');

var Users = React.createClass({
  componentDidMount: function () {
    if(this.props.usersNeedToBeFetched) {
      this.props.loadUsers();
    }
  },
  render: function() {

    var modalBody = 'test';/*this.props.deleteId !== undefined ?
    "Are You sure You want to delete Consumer '"
      + this.props.consumers[this.props.deleteId].name + "' ?"
      : "";*/
    return (
      <div className="content-wrapper">
        <Alert modalId="user-alert" modalTitle="Confirm Deletion..."
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
                    <button
                      className="btn btn-success"
                      onClick={this.props.setAddMode}
                    >
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
                      {this.props.usersIds.map(function(id, index) {
                        var user = this.props.users[id];
                        return (
                          <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="text-center">
                              <button className="btn btn-sm btn-default in-table"
                                title="Edit Role" type="button"
                                onClick={this.props.setEditMode.bind(null, user._id)}>
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
                {this.props.loadingUsers ?
                <div className="overlay">
                  <i className="fa fa-refresh fa-spin"></i>
                </div>
                : null }
              </div>
            </div>
          </div>
          {this.props.displayForm ?
            <UserForm
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
    usersNeedToBeFetched: state.users.needToBeFetched,
    usersIds: state.users.ids,
    users: state.users.data,
    loadingUsers: state.usersPage.loadingUsers,
    displayForm: state.usersPage.displayForm
    /*
    loadingConsumers: state.consumersForm.loadingConsumers,
    editId: state.consumersForm.editId,
    formLoading : state.consumersForm.updatingConsumers,
    deleteId: state.consumersForm.deleteId,
    displayForm: state.consumersForm.displayForm*/
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    loadUsers: function () {
      dispatch(actions.loadUsers());
    },
    setAddMode: function() {
      dispatch(actions.setAddMode());
    },
    setEditMode: function(id) {
      dispatch(actions.setEditMode(id));
    } /*,
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
    }*/
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Users);
