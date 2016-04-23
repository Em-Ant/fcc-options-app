'use strict'

var React = require('react');
var SettingsForm = require("../settingsFormComponent.jsx");

var ControlSidebar = React.createClass({
  render: function() {
    return (
      <div>
        <aside className="control-sidebar control-sidebar-dark">

          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li className="active">
              <a href="#control-sidebar-settings-tab" data-toggle="tab">
                <i className="fa fa-gears"></i>
              </a>
            </li>
          </ul>

          <div className="tab-content">

            <div className="tab-pane active" id="control-sidebar-settings-tab">
              <SettingsForm/>
            </div>
          </div>
        </aside>
        <div className="control-sidebar-bg"></div>
      </div>

    )
  }
});
module.exports = ControlSidebar;
