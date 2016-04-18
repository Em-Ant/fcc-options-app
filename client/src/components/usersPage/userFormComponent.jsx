'use strict'

var React = require('react');
var Message = require('../message.jsx');
var connect = require('react-redux').connect;
var actions = require('../../actions/userActions');

if (process.env.NODE_ENV !== 'production') require('dotenv').load();
var DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'default';

var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    if (!this.props.editId ) {
      this.props.onAddUser(this.state.user);
    } else {
      this.props.onEditUserRole(this.state.user);
    }
  },
  componentWillMount: function () {
    this.setState({user: this.props.user});
  },
  componentDidMount: function() {
  $(".select2").select2()
    .on('change', this.handleFormChange);
    $("#u_role").select2('val',this.props.user.role);

  },
  componentWillReceiveProps: function(nextProps) {

    if (nextProps.user && !nextProps.isLoading) {
      $("#u_role").select2('val', nextProps.user.role);
      this.setState({user: nextProps.user})
    }
    if(!this.props.message && nextProps.message) {
      this.setState({msg: nextProps.message.msg})
    }
  },
  getInitialState: function () {
    return {user: {email: '', role: 'user'}}
  },
  handleFormChange: function (e) {
    switch (e.target.id) {
      case 'u_mail' :
        if(!this.props.editId) {
          var user = this.state.user;
          user.email = e.target.value;
          this.setState({user: user, msg: undefined});
        }
        break;
      case 'u_role' :
        var user = this.state.user;
        user.role = e.target.value;
        this.setState({user: user, msg: undefined});
        break;
      default:
        return
    }

  },
  render: function() {
    var verb = this.props.editId ? 'Edit' : 'Add';
    var boxClass = verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{verb + " a User"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  onClick={this.props.onCloseForm} >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.state.msg
              ? <Message message={{msg: this.state.msg, type: 'error'}}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="u_mail" className="col-sm-2 control-label">e-mail</label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="u_mail"
                      placeholder="email"
                      value={this.state.user.email}
                      onChange={this.handleFormChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="u_role" className="col-sm-2 control-label">Role</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control select2"
                      id="u_role"
                      value={this.state.user.role}
                      onChange={this.handleFormChange}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
                {!this.props.editId ?
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <p>{`Default Password : '${DEFAULT_PASSWORD}'`}</p>
                    </div>
                  </div> : null}
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
          {this.props.isLoading
            ? <div className="overlay">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            : null}
        </div>
      </div>
    </div>
    )
  }
});
var mapStateToProps = function(state){

  return {
    editId: state.usersPage.editId,
    user: state.usersPage.editId ?
      Object.assign({}, state.users.data[state.usersPage.editId])
      : {role: 'user'},
    isLoading: state.usersPage.updatingUsers,
    message: state.usersPage.message
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
    onEditUserRole: function(user) {
      dispatch(actions.editUserRole(user));
    },
    onAddUser : function(user) {
      dispatch(actions.addUser(user));
    },
    onCloseForm: function() {
      dispatch(actions.resetEditMode())
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(UserForm);
