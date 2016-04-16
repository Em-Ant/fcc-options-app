'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');
var Message = require('./message.jsx');


/*

*/
var AlertModal = React.createClass({
  handleSubmit: function(e) {
    console.log('submit');
    e.preventDefault();
    var pwd_1 = this.state.pwd1
    var pwd_2 = this.state.pwd2;
    var pwd_old = this.state.pwdOld;
    if(!(pwd_1 && pwd_2 && pwd_old)) {
      this.setState({message: {type: 'error', msg: 'Fields cannot be empty'}})
      return
    }
    var self = this;
    this.setState({loading: true})
    Ajax.post('api/user/password',
      {password: pwd_1, confirmPassword: pwd_2, oldPassword: pwd_old },
      function(err, data){
        if (err) {
          self.setState({
            message: {type: 'error', msg: err.responseJSON.msg},
            loading: undefined
          });
          return
        }
        self.setState({
          message: {type: 'success', msg: 'Password Changed !'},
          pwd1:"",
          pwd2:"",
          pwdOld: "",
          loading: undefined
        })
      });
  },
  reset: function () {
    this.setState({pwd1: "", pwd2: "", pwdOld: "", message: undefined})
  },
  getInitialState: function () {
    return {pwd1: "", pwd2: "", pwdOld: ""};
  },
  handleChange: function(event) {
    if(!this.state.loading) {
      switch (event.target.id) {
        case "pwd_1" :
          this.setState({pwd1: event.target.value, message: undefined});
          break;
        case "pwd_2" :
          this.setState({pwd2: event.target.value, message: undefined});
          break;
        case "pwd_old" :
          this.setState({pwdOld: event.target.value, message: undefined});
          break;
        default:
          return
      }
    }
  },
  render: function () {
    var modalClass = "modal fade";
    return (
      <div className={modalClass} id={this.props.modalId} tabIndex="-1"
        role="dialog" aria-labelledby={this.props.modalId + '-label'}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={this.reset}
                aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id={this.props.modalId + '-label'}>
                {this.state.loading ?
                  <i className="fa fa-spin fa-circle-o-notch"></i>: null} Change Password</h4>
            </div>
            {
              this.state.message ?
              <Message  message={this.state.message}></Message>
              : null
            }
            <form className="form-horizontal" onSubmit={this.handleSubmit} >
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="pwd_old" className="col-sm-3 control-label">Old Password</label>
                  <div className="col-sm-9">
                    <input
                      disabled={(this.state.loading ? ' disabled' : '')}
                      type="password"
                      className={"form-control" + (this.state.loading ? ' disabled' : '')}
                      value={this.state.pwdOld}
                      id="pwd_old" placeholder="Old Password"
                      ref="pwd_old"
                      onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd_1" className="col-sm-3 control-label">New Password</label>
                  <div className="col-sm-9">
                    <input
                      disabled={(this.state.loading ? ' disabled' : '')}
                      type="password"
                      className={"form-control" + (this.state.loading ? ' disabled' : '')}
                      value={this.state.pwd1}
                      id="pwd_1"
                      placeholder="New Password"
                      ref="pwd_1"
                      onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd_2" className="col-sm-3 control-label">Confirm New Password</label>
                  <div className="col-sm-9">
                    <input
                      disabled={(this.state.loading ? ' disabled' : '')}
                      type="password"
                      className={"form-control" + (this.state.loading ? ' disabled' : '')}
                      value={this.state.pwd2}
                      id="pwd_2"
                      placeholder="Confirm New Password"
                      ref="pwd_2"
                      onChange={this.handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className={"btn btn-default" + (this.state.loading ? ' disabled' : '')}
                    data-dismiss="modal" onClick={this.reset}>Close</button>
                  <button
                    type="submit"
                    className={"btn btn-primary" + (this.state.loading ? ' disabled' : '')}>
                    Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      )
    }
});

module.exports = AlertModal;
