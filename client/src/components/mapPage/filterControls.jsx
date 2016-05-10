'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/mapFilterActions')

var FilterControls = React.createClass({
  vehicleCheckboxes:[],
  handleSubmit: function() {
    var excludedVehicleIds = this.vehicleCheckboxes.reduce(function(prev, cur){
      if(!cur.checked){
        prev.push(cur.value)
      }
      return prev;
    }, [])
    var filters = {
      noNeeds: this.refs.noNeeds.checked,
      needsWave: this.refs.needsWave.checked,
      behavioralIssues: this.refs.behavioralIssues.checked,
      needsTwoSeats: this.refs.needsTwoSeats.checked,
      hasSeizures: this.refs.hasSeizures.checked,
      hasWheelchair: this.refs.hasWheelchair.checked,
      hasMedications: this.refs.hasMedications.checked,
      vehicleUnassigned:this.refs.vehicleUnassigned.checked,
      vehicleIds: vehicleIds
    }
    this.props.saveFilters(filters);
  },
  setAll: function(boolean) {
      this.refs.noNeeds.checked = boolean;
      this.refs.needsWave.checked = boolean;
      this.refs.behavioralIssues.checked = boolean;
      this.refs.needsTwoSeats.checked = boolean;
      this.refs.hasSeizures.checked = boolean;
      this.refs.hasWheelchair.checked = boolean;
      this.refs.hasMedications.checked = boolean;
      this.refs.vehicleUnassigned.checked = boolean;
      this.vehicleCheckboxes.forEach(function(vehicleCheckbox){
        vehicleCheckbox.checked = boolean
      })
  },
  addVehicleCheckbox:function(input){
    var index = this.vehicleCheckboxes.findIndex(function(vehicleCheckbox){
      return input.value==vehicleCheckbox.value
    });
    if(index == -1){
      this.vehicleCheckboxes.push(input);
    }
  },
  getInitialState:function(){
    return {
    }
  },
  render: function() {
    var self = this;
    // group vehicles in 3 columns
    var total = this.props.vehiclesIds.length;
    var dividend = total / 3;
    var vehicleCols = this.props.vehiclesIds.reduce(function(rows, vehicleId, index) {
      var vehicle = self.props.vehicles[vehicleId];
      if (index < dividend) {
        rows[0].push(vehicle);
      } else if (index < dividend * 2) {
        rows[1].push(vehicle);
      } else {
        rows[2].push(vehicle);
      }
      return rows;
    }, [
      [], [], []
    ])
    return (
      <div>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Consumer Filters</h4>
              </div>
              <div className="modal-body">

                <label label-default="">Consumers Needs</label>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.noNeeds} onChange={this.props.filterChange.bind(this, "noNeeds")}/>No Needs
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.hasWheelchair} onChange={this.props.filterChange.bind(this, "hasWheelchair")}/>Wheelchair
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input  type="checkbox" checked={this.props.filters.needsWave} onChange={this.props.filterChange.bind(this, "needsWave")}/>Needs Wave
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input  type="checkbox" checked={this.props.filters.hasSeizures} onChange={this.props.filterChange.bind(this, "hasSeizures")}/>Seizures
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.needsTwoSeats} onChange={this.props.filterChange.bind(this, "needsTwoSeats")}/>Two Seats
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.behavioralIssues} onChange={this.props.filterChange.bind(this, "behavioralIssues")}/>Behavioral Issues
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.hasMedications} onChange={this.props.filterChange.bind(this, "hasMedications")}/>Medications
                      </label>
                    </div>

                  </div>
                </div>

                <label label-default="">Assigned to Vehicle</label>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={this.props.filters.vehicleUnassigned} onChange={this.props.filterChange.bind(this, "vehicleUnassigned")}/>Not Assigned
                  </label>
                </div>
                <div className="row">
                  {vehicleCols.map(function(vehicles, index) {
                    return (
                        <div key={index} ref ="vehicleCheckboxes" className="col-sm-4">
                          {vehicles.map(function(vehicle) {
                            return (
                              <div key={vehicle._id} className="checkbox">
                                <label>
                                  <input type="checkbox" checked={self.props.filters.vehicleIds.indexOf(vehicle._id) !==-1} onChange={self.props.filterVehicleChange.bind(this, vehicle._id)}/>{vehicle.name}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                    )
                  })
}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.setAll.bind(this, true)}>Select All</button>
                <button type="button" className="btn btn-default" onClick={this.setAll.bind(this, false)}>Unselect All</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

import {sortAlphabetically} from '../../selectors'
var mapStateToProps = function(state) {
  return {
    vehicles: state.vehicles.data,
    vehiclesIds: sortAlphabetically(state.vehicles),
    filters:state.mapFilters
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    filterChange: function(filterName, e) {
      dispatch(actions.updateFilter(filterName, e.target.checked))
    },
    filterVehicleChange: function(vehicleId, e) {

      dispatch(actions.updateVehicleFilter(vehicleId, e.target.checked))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterControls);
