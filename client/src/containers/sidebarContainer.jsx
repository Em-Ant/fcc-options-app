var connect = require('react-redux').connect;
var Sidebar = require('../components/adminLTE/sidebar.jsx');
var clickLink = require('../actions.js').clickLink;
/*
Redux aware container that connects dispatch functions and app state to component properties
*/
var mapStateToProps = function(state){
  //gets the the currentPage of the app state and map it to the activeLink property of Sidebar
  return{
    activeLink:state.currentPage
  }
}
var mapDispatchToProps = function(dispatch){
  //maps the onLinkClick property of Sidebar to a funciton that calls dipatch
  return{
    onLinkClick:function(urlPathName){
      //clickLink is a function that creates an action for the dispatcher to use
      dispatch(clickLink(urlPathName));
    }
  }
}
var SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

module.exports = SidebarContainer;
