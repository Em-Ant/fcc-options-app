'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/mapActions')

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
  handleSubmit: function() {
    var filters = {
      noNeeds: this.refs.noNeeds.checked,
      needsWave: this.refs.needsWave.checked,
      behavioralIssues: this.refs.behavioralIssues.checked,
      needsTwoSeats: this.refs.needsTwoSeats.checked,
      hasSeizures: this.refs.hasSeizures.checked,
      hasWheelchair: this.refs.hasWheelchair.checked,
      hasMedications: this.refs.hasMedications.checked
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
                        <input ref="noNeeds" type="checkbox" defaultChecked={this.props.filters.noNeeds}/>No Needs
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input ref="hasWheelchair" type="checkbox" defaultChecked={this.props.filters.hasWheelchair}/>Wheelchair
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input ref="needsWave" type="checkbox" defaultChecked={this.props.filters.needsWave}/>Needs Wave
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input ref="hasSeizures" type="checkbox" defaultChecked={this.props.filters.hasSeizures}/>Seizures
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input ref="needsTwoSeats" type="checkbox" defaultChecked={this.props.filters.needsTwoSeats}/>Two Seats
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="checkbox">
                      <label>
                        <input ref="behavioralIssues" type="checkbox" defaultChecked={this.props.filters.behavioralIssues}/>Behavioral Issues
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input ref="hasMedications" type="checkbox" defaultChecked={this.props.filters.hasMedications}/>Medications
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
                <button type="button" className="btn btn-default" onClick={this.setAll.bind(this, true)}>Select All</button>
                <button type="button" className="btn btn-default" onClick={this.setAll.bind(this, false)}>Unselect All</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Submit</button>
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
    saveFilters: function(filters) {
      dispatch(actions.saveFilters(filters))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterControls);
