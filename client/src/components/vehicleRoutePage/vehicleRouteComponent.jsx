'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var VehiclePanel = require('./vehiclePanelComponent.jsx')
var MapComponent = require('./mapComponent.jsx')
var Directions = require('../directions/directions.jsx')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');

var m_actions = require('../../actions/mapActions.js');
var v_actions = new ModelActions(models.VEHICLES);
var s_actions = new ModelActions(models.SETTINGS);
var c_actions = new ModelActions(models.CONSUMERS);

var LoadingComponent = React.createClass({
  render:function(){
    return(
    <div className="content-wrapper">
      <section className="content">
        <div id="map-loader">
          <i className="fa fa-refresh fa-spin"></i> Loading data...
        </div>
      </section>
    </div>
    )
  }
})

var VehicleRouteComponent = React.createClass({
   componentDidMount: function () {
    if(this.props.assignedVehicleId!=this.props.params.vehicleId){
      this.props.setActiveVehicleId(this.props.params.vehicleId)
    }
    if(this.props.consumersNeedToBeFetched)
      this.props.loadConsumers();
    if(this.props.vehiclesNeedToBeFetched)
      this.props.loadVehicles();
    if(this.props.settingsNeedToBeFetched)
      this.props.loadSettings();
   },
    render: function() {
    var vehicle = this.props.vehicle;
    if(!vehicle){
      return <div></div>
    }
    return (
      !this.props.dataLoaded?
      <LoadingComponent/>
      :
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-5 col-sm-5 col-xs-5">
              {this.props.displayDirections?
                <Directions/>:
                <VehiclePanel vehicleId={vehicle._id}/>
                }
            </div>
            <div className="col-md-7 col-sm-7 col-xs-7">
              <MapComponent vehicleId={vehicle._id}/>
            </div>
          </div>
        </section>
      </div>
      )
    }
});

var mapStateToProps = function(state, ownProps){
  return {
    vehicle:state.vehicles.data[ownProps.params.vehicleId],
    consumersNeedToBeFetched: state.consumers.needToBeFetched,
    vehiclesNeedToBeFetched: state.vehicles.needToBeFetched,
    settingsNeedToBeFetched: state.settings.needToBeFetched,
    dataLoaded : (state.consumers.loaded
      && state.vehicles.loaded && state.settings.optionsIncAddress),
    displayDirections: state.mapPage.displayDirections,
    activeVehicleId:state.mapPage.activeVehicleId
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    setActiveVehicleId: function(vehicleId) {
      dispatch(m_actions.setActiveVehicleId(vehicleId));
    },
    loadConsumers: function() {
      dispatch(c_actions.fetch());
    },
    loadVehicles : function() {
      dispatch(v_actions.fetch());
    },
    loadSettings: function() {
      dispatch(s_actions.fetch())
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehicleRouteComponent);
