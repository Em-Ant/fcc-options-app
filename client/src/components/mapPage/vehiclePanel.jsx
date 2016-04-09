var React = require('react');
var connect = require('react-redux').connect;
var CollapsibleBusBox = require('./collapsibleBusBox.jsx');

/**
* TODO Let collapsibleBusBox get consumers and vwhicle info from reducer
* and handle foldable seats.
*/

var VehiclePanel = React.createClass({
  componentDidMount: function () {
    if(this.props.activeVehicleId) {

      // Open the active Collapsible box
      $('#vp-'+this.props.activeVehicleId).collapse('show');
    }
  },
  render : function() {
    return (
      <div className="box box-widget cust-height">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
              <button
                className="btn btn-default disabled"
                title='Get Optimal Route'
              >
                <i className="fa fa-cogs"></i>
              </button>
          </div>
        </div>
        <div className="box-body">
          <div className="box-group" id="vehicle-accrd" role="tablist" aria-multiselectable="true">
          {
            this.props.vehiclesIds.map(function(id, index) {
              var vehicle = this.props.vehicles[id];
              return (
                <CollapsibleBusBox
                  name={vehicle.name}
                  onBoardIds={vehicle.consumers}
                  vehicleId={id}
                  consumers={this.props.consumers}
                  totalWheelchairs={vehicle.maxFixedWheelchairs}
                  totalSeats={vehicle.maxFixedSeats}
                  parentId={'vehicle-accrd'}
                  key={index}
                  remove={this.props.remove}
                />
              )
            }.bind(this))
          }
          </div>
        </div>
        {this.props.loading ?
        <div className="overlay">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
        : null }
      </div>
    )
  }
});

var mapStateToProps = function(state){
  return{
    vehiclesIds: state.vehicles.ids,
    vehicles: state.vehicles.data,
    consumers: state.consumers.data,
    loading: state.mapPage.markerLoading,
    activeVehicleId: state.mapPage.activeVehicleId
  }
}
var mapDispatchToProps = function(dispatch) {
  return {

  }
}

var VehiclePanelContainer = connect(mapStateToProps, mapDispatchToProps)(VehiclePanel);
module.exports = VehiclePanelContainer;
