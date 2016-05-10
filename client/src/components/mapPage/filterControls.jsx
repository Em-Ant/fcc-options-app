'use strict'

var React = require('react');
var connect = require('react-redux').connect;

var FilterControls = React.createClass({
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
                <div className="box box-success box-solid">
                  <div className="box-header with-border">
                    <h3 className="box-title">Consumers Needs</h3>
                  </div>
                  <div className="box-body">
                    <button type="button" className="btn btn-default btn-xs" onClick={this.props.setAllNeedsFilters.bind(this, true)}>Select All</button>
                    <button type="button" className="btn btn-default btn-xs" onClick={this.props.setAllNeedsFilters.bind(this, false)}>Unselect All</button>
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
                            <input type="checkbox" checked={this.props.filters.needsWave} onChange={this.props.filterChange.bind(this, "needsWave")}/>Needs Wave
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" checked={this.props.filters.hasSeizures} onChange={this.props.filterChange.bind(this, "hasSeizures")}/>Seizures
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

                  </div>
                </div>

                <div className="box box-success box-solid">
                  <div className="box-header with-border">
                    <h3 className="box-title">Assigned to Vehicle</h3>
                  </div>
                  <div className="box-body">
                    <button type="button" className="btn btn-default btn-xs" onClick={this.props.setAllVehicleFilters.bind(this, this.props.vehiclesIds, true)}>Select All</button>
                    <button type="button" className="btn btn-default btn-xs" onClick={this.props.setAllVehicleFilters.bind(this, this.props.vehiclesIds, false)}>Unselect All</button>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.filters.vehicleUnassigned} onChange={this.props.filterChange.bind(this, "vehicleUnassigned")}/>Not Assigned
                      </label>
                    </div>
                    <div className="row">
                      {vehicleCols.map(function(vehicles, index) {
                        return (
                          <div key={index} ref="vehicleCheckboxes" className="col-sm-4">
                            {vehicles.map(function(vehicle) {
                              return (
                                <div key={vehicle._id} className="checkbox">
                                  <label>
                                    <input type="checkbox" checked={self.props.filters.vehicleIds.indexOf(vehicle._id) !== -1} onChange={self.props.filterVehicleChange.bind(this, vehicle._id)}/>{vehicle.name}
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

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

import {sortAlphabetically} from '../../selectors'
var actionTypes = require('../../constants/actionTypes/mapFilterActionTypes.js');
var mapStateToProps = function(state) {
  return {
    vehicles: state.vehicles.data,
    vehiclesIds: sortAlphabetically(state.vehicles),
    filters: state.mapFilters
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    filterChange: function(filterName, e) {
      dispatch({type: actionTypes.FILTER_UPDATE, filterName: filterName, value: e.target.checked})
    },
    filterVehicleChange: function(vehicleId, e) {
      dispatch({type: actionTypes.FILTER_VEHICLE_UPDATE, vehicleId: vehicleId, value: e.target.checked})
    },
    setAllVehicleFilters: function(vehicleIds, value){
      dispatch({type: actionTypes.FILTER_SET_ALL_VEHICLES, vehicleIds:vehicleIds, value: value})
    },
    setAllNeedsFilters: function(value) {
      dispatch({type: actionTypes.FILTER_SET_ALL_NEEDS, value: value})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterControls);
