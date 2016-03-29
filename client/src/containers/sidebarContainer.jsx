var connect = require('react-redux').connect;
var Sidebar = require('../components/adminLTE/sidebar.jsx');
var clickLink = require('../actions/actions.js').clickLink;
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state, ownProps){

  //gets the the currentPage of the app state and map it to the activeLink property of Sidebar
  return{
    activeLink: ownProps.router.location.pathname
  }
}
var SidebarContainer = connect(mapStateToProps)(Sidebar);

module.exports = SidebarContainer;
