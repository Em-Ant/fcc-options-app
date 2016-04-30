'use strict'

var React = require('react');
var connect = require('react-redux').connect;


var VehiclePanel = require('./vehiclePanel.jsx')
var UnassignedConsumerPanel = require('./unassignedConsumerPanel.jsx')
var Directions = require('../directions/directions.jsx')
var MapPage = require('./mapMain.jsx')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var PrintDiv = require('./printReport.jsx')

var v_actions = new ModelActions(models.VEHICLES);
var s_actions = new ModelActions(models.SETTINGS);
var c_actions = new ModelActions(models.CONSUMERS);

// When the map is rendered, we are sure that all needed data
// are properly loaded so we can handle them in 'componentDidMount'

var MapWrapper = React.createClass({
  componentDidMount: function () {
    if(this.props.consumersNeedToBeFetched)
      this.props.loadConsumers();
    if(this.props.vehiclesNeedToBeFetched)
      this.props.loadVehicles();
    if(this.props.settingsNeedToBeFetched)
      this.props.loadSettings();
  },
    render: function() {

    return (
      !this.props.dataLoaded?
        <div id="map-loader">
          <i className="fa fa-refresh fa-spin"></i> Loading data...
        </div>
      :
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-3">

            {this.props.displayDirections?
              <Directions/>:
              <VehiclePanel/>
              }

            </div>
            <div className="col-md-7 col-sm-7 col-xs-7">
              <div className="box box-widget map-height">
              <MapPage></MapPage>
              <PrintDiv/>
              </div>
            </div>
            <div className="col-md-2 col-sm-2 col-xs-2">
              <UnassignedConsumerPanel />
            </div>
          </div>
        </section>
      </div>
      )
    }
});

var mapStateToProps = function(state){
  return {
    consumersNeedToBeFetched: state.consumers.needToBeFetched,
    vehiclesNeedToBeFetched: state.vehicles.needToBeFetched,
    settingsNeedToBeFetched: state.settings.needToBeFetched,
    dataLoaded : ((state.consumers.loaded
      && state.vehicles.loaded) && state.settings.optionsIncAddress),
    displayDirections: state.mapPage.displayDirections
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
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

var MapWrapperContainer = connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
module.exports = MapWrapperContainer;
