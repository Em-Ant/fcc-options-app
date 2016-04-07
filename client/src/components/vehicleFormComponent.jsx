'use strict'

var React = require('react');
var Message = require('./message.jsx');

var VehicleForm = React.createClass({
  setPropsToState: function(vehicle) {
    this.setState({vehicle: vehicle});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.verb == "Add") {
      this.props.onAddVehicle(this.state.vehicle);
    } else if (this.props.verb == "Edit") {
      this.props.onEditVehicle(this.state.vehicle);
    }
  },
  handleNameChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {name: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleFixedSeatsChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {maxFixedSeats: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleFoldableSeatsChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {maxFoldableSeatsForWheelchairs: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleWheelchairCapacityChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {maxFixedWheelchairs: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  getInitialState: function() {
    return {vehicle: {}};
  },
  componentDidMount: function() {
      this.setPropsToState(this.props.vehicle);
  },
  componentWillReceiveProps: function(nextProps) {
    /*
    Transfer the editable form field properties to the state
    */
      this.setPropsToState(nextProps.vehicle);
  },
  render: function() {
    var boxClass = this.props.verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.verb + " a Route"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.onCloseForm} data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.props.message
              ? <Message message={this.props.message}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_name" placeholder="Name" value={this.state.vehicle.name} onChange={this.handleNameChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_fixed_seats" className="col-sm-2 control-label">Fixed Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_fixed_seats" placeholder="Fixed Seats" value={this.state.vehicle.maxFixedSeats} onChange={this.handleFixedSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_foldable_seats" className="col-sm-2 control-label">Foldable Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_foldable_seats" placeholder="Foldable Seats" value={this.state.vehicle.maxFoldableSeatsForWheelchairs} onChange={this.handleFoldableSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_wheelchairs" className="col-sm-2 control-label">Wheelchair Capacity</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_wheelchairs" placeholder="Wheelchair Capacity" value={this.state.vehicle.maxFixedWheelchairs} onChange={this.handleWheelchairCapacityChange}/>
                  </div>
                </div>
              </div>
              {this.props.isLoading ?
              <div className="overlay">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
              : null }
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
module.exports = VehicleForm;
