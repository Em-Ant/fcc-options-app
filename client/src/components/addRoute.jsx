'use strict'

var React = require('react');
// var Ajax = require('../../js/ajax-functions.js');

var AddRoute = React.createClass({
  //
  //   contextTypes: {
  //     router: React.PropTypes.object.isRequired
  //   },
  //
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.refs);
    var formData = {
      name: this.refs.name.value,
      vehicleCapacity: this.refs.vehicleCapacity.value,
      vehicleName: this.refs.vehicleName.value,
      vehicleCapacity: this.refs.vehicleCapacity.value
    };
    console.log(formData);
    console.log(this.refs.consumer);
    // Ajax.post('/api/route', this.state, function(err, user){
    //   if (err) {
    //     this.setState({
    //       message: err.responseJSON.msg
    //     });
    //   }else{
    //       this.setState({
    //         message: "Welcome " + user
    //       });
    //     // if (location.state && location.state.nextPathname) {
    //     //   this.context.router.replace(location.state.nextPathname)
    //     // }
    //     // else {
    //     //   console.log(this.context);
    //     //   this.context.router.replace('/main')
    //     // }
    //   }
    // }.bind(this));
  },
  getInitialState: function(e) {
    return {
      consumers: ['', '']
    };
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >Name</label>
            <input ref="name" name="name" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Vehicle Capacity</label>
            <input ref="vehicleCapacity" name="vehicleCapacity" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Vehicle Name</label>
            <input ref="vehicleName" name="vehicleName" type="text" className="form-control"/>
          </div>
          {this.state.consumers.map(function(consumer, index) {
            //make consumerIndex start with 1 instead of 0;
            var consumerIndex = index + 1;
            return (
              <div key={consumerIndex} className="form-group">
                <label>Consumer {consumerIndex}</label>
                <input ref="consumer" name={"consumer" + consumerIndex} type="text" className="form-control"/>
              </div>
            )
          })}
          <button type="submit" className="btn btn-default">Submit</button>

        </form>
      </div>

    )
  }
});
module.exports = AddRoute;
