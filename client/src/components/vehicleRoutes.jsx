'use strict'

var React = require('react');
var VehicleRoutesFormContainer = require('../containers/vehicleRoutesFormContainer.jsx');

var VehicleRoutes = React.createClass({
  handleEditButton:function(id, e){
    this.props.onEditButtonClick(id);
  },
  handleDeleteButton:function(id, e){
    this.props.onDeleteButtonClick(id);
  },
  getDefaultProps:function(){
    return {
      vehicleRoutes:{
        items:[]
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
              <h3 className="box-title">Routes</h3>
            </div>
            <div className="box-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location Served</th>
                    <th>Vehicle</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.vehicleRoutes.items.map(function(route, index) {
                    return (
                      <tr key={index}>
                        <td>{route.name}</td>
                        <td>{route.locationServed}</td>
                        <td>{route.vehicle}</td>
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
        }
        <VehicleRoutesFormContainer/>
    </section> < /div>

    )
  }
});
module.exports = VehicleRoutes;
