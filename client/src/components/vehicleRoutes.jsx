'use strict'

var React = require('react');
var VehicleRoutesFormContainer = require('../containers/vehicleRoutesFormContainer.jsx');

var VehicleRoutes = React.createClass({
  handleEditButton:function(id){
    this.props.onEditButtonClick(id);
  },
  handleDeleteButton:function(id){
    this.props.onDeleteButtonClick(id);
  },
  handleAddButton:function(){
    this.props.onAddButtonClick();
  },
  getDefaultProps:function(){
    return {
      vehicleRoutes:{
        items:[],
        form:{
          display:false
        }
      }
    }
  },
  render: function(){

return (
  <div className="content-wrapper">
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Routes </h3>
                <span className="pull-right">
                  <button className="btn btn-success" onClick={this.handleAddButton}>
                    Add New Route
                  </button>
                </span>
            </div>
            <div className="box-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location Served</th>

                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.vehicleRoutes.items.map(function(route, index) {
                    return (
                      <tr key={index}>
                        <td>{route.name}</td>
                        <td>{route.locationServed}</td>
                        <td className="text-center">
                            <button className="btn btn-sm btn-default in-table"
                              title="Edit" type="button"
                              onClick={this.handleEditButton.bind(null, route._id)} >
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-default in-table"
                              title="Delete"  data-toggle="modal"
                              data-target="#myModal" type="button"
                              onClick={this.handleDeleteButton.bind(null, route._id)}>
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
          </div>
        </div>
      </div>
        {
          // Form to add, edit, and delete a Vehicle Route
          this.props.vehicleRoutes.form.display?
          <VehicleRoutesFormContainer/>:null

        }
    </section> < /div>

    )
  }
});
module.exports = VehicleRoutes;
