'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');

var NewUser= React.createClass({
  submit: function(e) {
    e.preventDefault();
    var email = this.refs.email.value;
    console.log(email);
    Ajax.post('api/user/', {email: email}, function(err, data){
      if(err) return console.log('err', err.responseJSON.msg);
      console.log('success', data);
    })
  },
  render: function() {
    console.log('render');
    return (
      <form onSubmit={this.submit}>
        <input placeholder="email" ref='email'></input>
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
});
module.exports = NewUser;
