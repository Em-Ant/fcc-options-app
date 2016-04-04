var connect = require('react-redux').connect;
var SettingsFormComponent = require('../components/settingsFormComponent.jsx');
var actions = require('../actions/settingsFormActions.js');
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
    }
  }
}

var SettingsFormContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsFormComponent);

module.exports = SettingsFormContainer;
