'use strict'

var React = require('react');
var VehicleFormContainer = require('../containers/vehicleFormContainer.jsx');

var Vehicles = React.createClass({
  componentDidMount: function() {
    if(this.props.needToBeFetched)
      this.props.fetchVehicles()
  },
  handleEditButton:function(id){
    this.props.onEditButtonClick(id);
  },
  handleDeleteButton:function(id){
    this.props.onDeleteButtonClick(id);
  },
  handleAddButton:function(){
    this.props.onAddButtonClick();
  },
  render: function(){
return (
  <div className="content-wrapper">
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Vehicles </h3>
                <span className="pull-right">
                  <button className="btn btn-success" onClick={this.handleAddButton}>
                    Add New Vehicle
                  </button>
                </span>
            </div>
            <div className="box-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Seats</th>
                    <th>Wheelchairs</th>
                    <th>Foldable Seats</th>
                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.vehiclesIds.map(function(id, index) {
                    var vehicle = this.props.vehicles[id];
                    return (
                      <tr key={index}>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.seats}</td>
                        <td>{vehicle.wheelchairs}</td>
                        <td>{vehicle.flexSeats}</td>
                        <td className="text-center">
                            <button className="btn btn-sm btn-default in-table"
                              title="Edit" type="button"
                              onClick={this.handleEditButton.bind(null, vehicle._id)} >
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-default in-table"
                              title="Delete"  data-toggle="modal"
                              data-target="#myModal" type="button"
                              onClick={this.handleDeleteButton.bind(null, vehicle._id)}>
                              <i className="fa fa-trash-o"></i>
                            </button>
                        </td>
                      </tr>
                      );
                    }.bind(this))
                  }
                </tbody>
              </table>
            </div>

            {this.props.isLoading ?
            <div className="overlay">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
            : null }
          </div>
        </div>
      </div>
        {
          // Form to add, edit, and delete a Vehicle Route
          this.props.displayForm?
          <VehicleFormContainer/>:null

        }
    </section> < /div>

    )
  }
});
module.exports = Vehicles;
