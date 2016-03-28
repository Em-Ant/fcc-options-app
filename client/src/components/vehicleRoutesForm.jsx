'use strict'

var React = require('react');
var VehicleRoutesForm = require('./vehicleRoutesForm.jsx');

var VehicleRoutesForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var vehicleRoute = {
      name: this.refs.name.value,
      locationServed: this.refs.locationServed.value,
      vehicle: this.refs.vehicle.value
    };
    this.props.onAddVehicleRoute(vehicleRoute);
  },
  getInitialState: function() {
    return ({message: null});
  },
  render: function() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">Add a Route</h3>
            </div>
            {this.props.message
              ? <div className="alert alert-info" role="alert">{this.props.message}</div>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_name" placeholder="Name" ref="name"/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_location_served" className="col-sm-2 control-label">Location Served</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_location_served" placeholder="Location Served" ref="locationServed"/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_vehicle" className="col-sm-2 control-label">Vehicle</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_vehicle" placeholder="Vehicle" ref="vehicle"/>
                  </div>
                </div>

              </div>
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Submit</button>

              </div>

            </form>

          </div>
        </div>
      </div>
    )
  }
});
module.exports = VehicleRoutesForm;
// <button className="btn btn-default margin-left"
//   onClick={this.props.resetFn} type="button">
//   {this.props.verb === 'Edit' ? 'Cancel' : 'Reset'}
// </button>
