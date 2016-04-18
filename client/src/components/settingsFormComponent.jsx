'use strict'

var React = require('react');
var Link = require('react-router').Link
var connect = require('react-redux').connect;
var Message = require('./message.jsx');
var ModelActions = require('../actions/modelActions.js');
var models = require('../constants/models.js');
var actions = new ModelActions(models.SETTINGS);

var Settings = React.createClass({
  componentDidMount: function() {
    if(this.props.settings.needToBeFetched) {
      this.props.loadSettings();
    }
    this.setPropsToState(this.props);
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.settings && !nextProps.form.isLoading) {
      this.setPropsToState(nextProps);
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.form);
  },
  handleAddressChange: function(e) {
    var form = Object.assign({}, this.state.form, {optionsIncAddress: e.target.value});
    this.setState({form: form})
  },
  handleMaxPassengersChange: function(e) {
    var form = Object.assign({}, this.state.form, {maxPassengersPerVehicle: e.target.value});
    this.setState({form: form})
  },
  handleMaxRouteTimeChange: function(e) {
    var form = Object.assign({}, this.state.form, {maxConsumerRouteTime: e.target.value});
    this.setState({form: form})
  },
  getInitialState: function() {
    return ({form: {}})
  },
  setPropsToState: function(props) {
    var form = Object.assign({}, props.settings, props.form);
    this.setState({form: form});
  },
  getInitialState:function(){
    return{
      form:{}
    }
  },
  render: function() {
    return (

      <form onSubmit={this.handleSubmit}>
        <h3 className="control-sidebar-heading">Global Settings</h3>
        <div className="form-group">
          {
            this.state.form.message?
              <Message message={this.state.form.message}/>:
              null
          }
          <label className="control-sidebar-subheading">
            Options Inc Address
          </label>
          <input type="text" className="form-control" value={this.state.form.optionsIncAddress} onChange={this.handleAddressChange}/>

          <label className="control-sidebar-subheading">
            Max passengers per vehicle
          </label>
          <input type="number" className="form-control" value={this.state.form.maxPassengersPerVehicle} onChange={this.handleMaxPassengersChange}/>

          <label className="control-sidebar-subheading">
            Max route time (minutes)
          </label>
          <input type="number" className="form-control" value={this.state.form.maxConsumerRouteTime} onChange={this.handleMaxRouteTimeChange}/>
          <p/>
          <button type="submit" disabled={this.props.form.isLoading} className={this.props.form.isLoading
            ? "btn btn-success disabled"
            : "btn btn-success"}>Submit</button>
        </div>
      </form>

    )
  }
});

/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state) {
  return {
    form:state.settingsForm,
    settings:state.settings
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    onSubmit:function(settings){
      dispatch(actions.update(settings));
    },
    loadSettings: function() {
      dispatch(actions.fetch());
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Settings);
