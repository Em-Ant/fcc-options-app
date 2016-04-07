'use strict'

var React = require('react');
var MapPage = require('./mapMain.jsx')
var connect = require('react-redux').connect;
var c_actions = require('../../actions/consumerActions');
var v_actions = require('../../actions/vehicleActions');
var s_actions = require('../../actions/settingsActions');


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
      var body = this.props.dataLoaded
        ? <MapPage/>
      : (<div id="map-loader">
          <i className="fa fa-refresh fa-spin"></i> Loading data...
        </div> )

    return (
      <div className="content-wrapper">
        <section className="content">
          {body}
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
    dataLoaded : ((state.consumers.lastUpdated
      && state.vehicles.lastUpdated) && state.settings.optionsIncAddress)
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    loadConsumers: function() {
      dispatch(c_actions.loadConsumers());
    },
    loadVehicles : function() {
      dispatch(v_actions.fetch());
    },
    loadSettings: function() {
      dispatch(s_actions.load())
    }
  }
}

var MapWrapperContainer = connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
module.exports = MapWrapperContainer;
