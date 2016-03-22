'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');

var Login = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  handleSubmit: function(e) {
    e.preventDefault();

    Ajax.post('/api/login', this.state, function(err, user){
      if (err) {
        this.setState({
          message: err.responseJSON.msg
        });
      } else {
        this.setState({
          message: "Welcome " + user
        });
        this.props.history.push('/main');
      }
    }.bind(this));
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  getInitialState: function() {
    return ({email: '', password: ''});
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
        <p className="clementine-text">Login</p>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label >Email address</label>
              <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleEmailChange}></input>
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
            </div>
            <div className="row">
              <button type="submit" className="btn btn-default">Login</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
});
module.exports.Login = Login;
