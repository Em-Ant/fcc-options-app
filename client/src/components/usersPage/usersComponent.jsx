'use strict'

var React = require('react');
var Alert = require('../alertModal.jsx');
var UserForm = require('./userFormComponent.jsx');
var connect = require('react-redux').connect;
var actions = require('../../actions/userActions');

var Users = React.createClass({
  componentDidMount: function () {
    if(this.props.usersNeedToBeFetched) {
      this.props.loadUsers();
    }
  },
  getInitialState: function() {
    return {confirm: function(){}}
  },
  handleDelete: function(id) {

    this.setState({
      uid: id,
      modalBody : `Are you sure you want to Delete user "${this.props.users[id].email}" ?`,
      confirm: this.props.onDelete
    })
  },

  handleReset: function (id) {
    this.setState({
      uid: id,
      modalBody : `Are you sure you want to Reset Password
        for user "${this.props.users[id].email}" ?`,
      confirm: this.props.onReset
    })
  },
  render: function() {


    return (
      <div className="content-wrapper">
        <Alert modalId="user-alert" modalTitle="Confirm..."
          modalBody={this.state.modalBody}
          handleConfirm={this.state.confirm.bind(null, this.state.uid)}
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
                                title="Reset Password" type="button" data-toggle="modal"
                                data-target="#user-alert"
                                onClick={this.handleReset.bind(null, user._id)}>
                                <i className="fa fa-key"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-default in-table"
                                title="Delete"  data-toggle="modal"
                                data-target="#user-alert" type="button"
                                onClick={this.handleDelete.bind(null, user._id)}>
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

  // remove current logged in user
  var userIds = state.users.ids.slice();
  var index = userIds.indexOf(state.auth._id);
  if(index !== -1){
    userIds.splice(index,1);
  }
  return {
    usersNeedToBeFetched: state.users.needToBeFetched,
    usersIds: userIds,
    users: state.users.data,
    loadingUsers: state.usersPage.loadingUsers,
    displayForm: state.usersPage.displayForm
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
    },
    onDelete: function (id) {
      dispatch(actions.deleteUser(id));
    },
    onReset: function (id) {
      dispatch(actions.resetPassword(id));
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Users);
