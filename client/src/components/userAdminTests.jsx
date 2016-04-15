'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');

var NewUser= React.createClass({
  getInitialState: function() {
    return {users:[]};
  },
  componentDidMount: function() {
    var self = this;
    Ajax.get('api/user/', function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
      self.setState({users: data});
    })
  },
  submitCreate: function(e) {
    e.preventDefault();
    var email = this.refs.email.value.trim();
    console.log(email);
    Ajax.post('api/user/', {email: email}, function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
    })
  },
  submitChangePassword : function(e) {
    e.preventDefault();
    var newPwd = this.refs.pwd.value.trim();
    var confirm = this.refs.confirm.value.trim();
    console.log(newPwd, confirm);
    Ajax.post('api/user/password',
     {password: newPwd, confirmPassword: confirm}, function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
    })
  },
  submitDelete: function (e) {
    e.preventDefault();
    var id = this.refs.del_id.value.trim();
    console.log(id);
    Ajax.delete('api/user/' + id,
     {}, function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
    })
  },
  submitRole: function (e) {
    e.preventDefault();
    var id = this.refs.role_id.value.trim();
    var role = this.refs.role.value.trim();
    console.log(id, role);
    Ajax.post('api/user/' + id,
     {role: role}, function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
    })
  },
  render: function() {
    console.log('render');
    return (
      <div>
        <h4>Admin</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>email</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map(function(user, index) {
                return (
                <tr key={index}>
                  <td>{user._id}&nbsp;</td>
                  <td>{user.email}&nbsp;</td>
                  <td>{user.role}&nbsp;</td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
        <form onSubmit={this.submitCreate}>
          <label htmlFor="create">Create an User</label>
          <input id="create" placeholder="email" ref='email'></input>
          <button type="submit">SUBMIT</button>
        </form>
        <form onSubmit={this.submitDelete}>
          <label htmlFor="delete">Delete an User</label>
          <input id="delete" placeholder="id" ref='del_id'></input>
          <button type="submit">SUBMIT</button>
        </form>
        <form onSubmit={this.submitRole}>
          <label htmlFor="role_id">Set User Role</label>
          <input id="role_id" placeholder="id" ref='role_id'></input>
          <input id="role" placeholder="role" ref='role'></input>
          <button type="submit">SUBMIT</button>
        </form>
        <h4>Normal User and Admin</h4>
        <form onSubmit={this.submitChangePassword}>
          <label htmlFor="password">Change Password</label>
          <input id="password" placeholder="new password" ref='pwd'></input>
          <label htmlFor="confirm">Retype Password</label>
          <input id="confirm" placeholder="new password" ref='confirm'></input>
          <button type="submit">SUBMIT</button>
        </form>
      </div>

    )
  }
});
module.exports = NewUser;
