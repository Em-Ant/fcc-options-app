'use strict'

var React = require('react');

var AddRoute = require('./addRoute.jsx');
// var Ajax = require('../../js/ajax-functions.js');

var Routes = React.createClass({
  //
  //   contextTypes: {
  //     router: React.PropTypes.object.isRequired
  //   },
  //
  // handleSubmit: function(e) {
  //   e.preventDefault();
  //
  //   Ajax.post('/api/login', this.state, function(err, user){
  //     if (err) {
  //       this.setState({
  //         message: err.responseJSON.msg
  //       });
  //     }else{
  //         this.setState({
  //           message: "Welcome " + user
  //         });
  //       // if (location.state && location.state.nextPathname) {
  //       //   this.context.router.replace(location.state.nextPathname)
  //       // }
  //       // else {
  //       //   console.log(this.context);
  //       //   this.context.router.replace('/main')
  //       // }
  //     }
  //   }.bind(this));
  // },
  // handleEmailChange: function(e) {
  //   this.setState({email: e.target.value});
  // },
  // handlePasswordChange: function(e) {
  //   this.setState({password: e.target.value});
  // },
  // getInitialState: function() {
  //   return ({email: '', password: ''});
  // },
  handleAddRouteButton: function(e) {
    //Toggle Add Route Button
    this.setState({addRoute: !this.state.addRoute});
  },
  getInitialState: function() {
    return ({addRoute: false});
  },
  render: function() {
    return (
      <div className="container">
        <button className="btn btn-primary" onClick={this.handleAddRouteButton}>Add Route</button>
        <button className="btn btn-info" onClick={this.handleAddRouteButton}>Edit Route</button>

      {this.state.addRoute?<AddRoute/>:null}
      </div>

    )
  }
});
module.exports= Routes;
