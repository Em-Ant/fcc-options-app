'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');

var AddRoute = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = {
      name: this.refs.name.value,
      locationServed: this.refs.locationServed.value
    };
    
    Ajax.post('/api/route', formData, function(err, user){
      if (err) {
        this.setState({
          message: err.responseJSON.msg
        });
      }else{
          this.setState({
            message: "Route successfully added"
          });
          //clear form
          this.refs.name.value = "";
          this.refs.locationServed.value = "";
      }
    }.bind(this));
  },
  getInitialState:function(){
    return({
    });
  },
  render: function() {
    return (
      <div className="container">      
      {this.state.message
        ? <div className="alert alert-info" role="alert">{this.state.message}</div>
        : null}
        <form onSubmit={this.handleSubmit}>
          <h1>Add a Route</h1>
          <div className="form-group">
            <label >Name</label>
            <input ref="name" name="name" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label >Location Served</label>
            <input ref="locationServed" name="locationServed" type="text" className="form-control"/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>

        </form>
      </div>

    )
  }
});
module.exports = AddRoute;
