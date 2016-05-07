'use strict'

var React = require('react');
var connect = require('react-redux').connect;

var VehicleFilterCol = React.createClass({
  render: function() {
    return (
      <div className="col-sm-4">
        {this.props.vehicles.map(function(vehicle) {
          return (
            <div key={vehicle._id} className="checkbox">
              <label>
                <input type="checkbox"/>{vehicle.name}
              </label>
            </div>
          )
        })}
      </div>
    )
  }
})

var FilterControls = React.createClass({

  render: function() {
    var self = this;
    // group vehicles in 3 columns
    var total = this.props.vehiclesIds.length;
    var dividend = total/3;
    var vehicleCols = this.props.vehiclesIds.reduce(function(rows, vehicleId, index) {
      var vehicle = self.props.vehicles[vehicleId];
      if(index < dividend){
        rows[0].push(vehicle);
      }else if(index < dividend*2){
        rows[1].push(vehicle);
      }else{
        rows[2].push(vehicle);
      }
      return rows;
    }, [[],[],[]])
    return (
      <div>
        <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">
          <i className="fa fa-filter"></i>&nbsp;Filter
        </button>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Consumer Filters</h4>
              </div>
              <div className="modal-body">
                <label label-default="">Consumers</label>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Wheelchair
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Needs Wave
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Seizures
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Two Seats
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Behavioral Issues
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>Medications
                      </label>
                    </div>

                  </div>
                </div>

                <label label-default="">Vehicles</label>
                <div className="row">
                  {vehicleCols.map(function(vehicles, index) {
                    return (<VehicleFilterCol key={index} vehicles={vehicles}/>)
                  })
                }
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Select All</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Unselect All</button>
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var mapStateToProps = function(state) {
  return {vehicles: state.vehicles.data, vehiclesIds: state.vehicles.ids}
}

module.exports = connect(mapStateToProps)(FilterControls);
