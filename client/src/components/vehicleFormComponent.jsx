'use strict'

var React = require('react');
var Message = require('./message.jsx');

var VehicleForm = React.createClass({
  setPropsToState: function(item) {
    this.setState({item: item});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.form.verb == "Add") {
      this.props.onAddVehicle(this.state.item);
    } else if (this.props.form.verb == "Edit") {
      this.props.onEditVehicle(this.state.item);
    }
  },
  handleNameChange: function(e) {
    var itemState = Object.assign({}, this.state.item, {name: e.target.value})
    this.setState({item: itemState});
  },
  handleFixedSeatsChange: function(e) {
    var itemState = Object.assign({}, this.state.item, {maxFixedSeats: e.target.value})
    this.setState({item: itemState});
  },
  handleFoldableSeatsChange: function(e) {
    var itemState = Object.assign({}, this.state.item, {maxFoldableSeatsForWheelchairs: e.target.value})
    this.setState({item: itemState});
  },
  handleWheelchairCapacityChange: function(e) {
    var itemState = Object.assign({}, this.state.item, {maxFixedWheelchairs: e.target.value})
    this.setState({item: itemState});
  },
  getInitialState: function() {
    return {item: {}};
  },
  componentDidMount: function() {
    if (this.props.form) {
      this.setPropsToState(this.props.form.item);
    }
  },
  componentWillReceiveProps: function(nextProps) {
    /*
    Transfer the editable form field properties to the state
    */
    if (nextProps.form) {
      this.setPropsToState(nextProps.form.item);
    }
  },
  render: function() {
    var boxClass = this.props.form.verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.form.verb + " a Route"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.onCloseForm} data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.props.form.message
              ? <Message message={this.props.form.message}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_name" placeholder="Name" value={this.state.item.name} onChange={this.handleNameChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_fixed_seats" className="col-sm-2 control-label">Fixed Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_fixed_seats" placeholder="Fixed Seats" value={this.state.item.maxFixedSeats} onChange={this.handleFixedSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_foldable_seats" className="col-sm-2 control-label">Foldable Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_foldable_seats" placeholder="Foldable Seats" value={this.state.item.maxFoldableSeatsForWheelchairs} onChange={this.handleFoldableSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_wheelchairs" className="col-sm-2 control-label">Wheelchair Capacity</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_wheelchairs" placeholder="Wheelchair Capacity" value={this.state.item.maxFixedWheelchairs} onChange={this.handleWheelchairCapacityChange}/>
                  </div>
                </div>
              </div>
              {this.props.form.isLoading ?
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
