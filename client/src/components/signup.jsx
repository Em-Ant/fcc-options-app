'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');
var Signup = React.createClass({
  getInitialState: function() {
    return {displayName: '', email: '', password: '', confirmPassword: ''}
  },
  handleSubmit: function(e) {
    e.preventDefault();
    Ajax.post('/api/signup', this.state, function(err, data) {
      if (err) {
        return this.setState(Object.assign({}, this.state, {message: err.responseJSON.msg}));
      }
      this.setState(Object.assign({}, this.state, {message: "You signed up successfully.  Please login."}));
    }.bind(this))
  },
  handleDisplayNameChange: function(e) {
    this.setState({displayName: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleConfirmPasswordChange: function(e) {
    this.setState({confirmPassword: e.target.value});
  },
  render: function() {
    return (
      <div className = "container text-center" >
        {this.state.message
          ? <div className="alert alert-info" role="alert">{this.state.message}</div>
          : null}
        <div className="login">
          <img src="img/logo.png" />
          <br />
          <p className="clementine-text">Signup</p>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email} onChange={this.handleEmailChange}></input>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.handlePasswordChange}></input>
                </div>
                <div className="form-group">
                  <label >Confirm Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}></input>
                </div>
                <div className="row">
                  <button type="submit" className="btn btn-default">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports.Signup = Signup;
