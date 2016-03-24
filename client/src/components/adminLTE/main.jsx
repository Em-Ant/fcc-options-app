'use strict'

var Link = require('react-router').Link

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../../actions.js');
var Header = require('./Header.jsx');
var Sidebar = require('./Sidebar.jsx');
var Footer = require('./Footer.jsx');
var ControlSidebar = require('./ControlSidebar.jsx');

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var Main = React.createClass({

  render: function() {
    return (
      <div className="wrapper">
        <Header/>
        <Sidebar/>

        <div className="content-wrapper">

          <section className="content-header">
            <h1>
              Page Header
              <small>Optional description</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard"></i>
                  Level</a>
              </li>
              <li className="active">Here</li>
            </ol>
          </section>

          <section className="content"></section>

        </div>

        <Footer/>
        <ControlSidebar/>

      </div>
    )
  }
});

function mapProps(state) {
  return {
    user: state.get('user') || {
      username : 'Guest'
    },
    clicks: state.get('clicks')
  }
}

module.exports.Main = Main;
module.exports.MainContainer = connect(mapProps, actionCreators)(Main);
