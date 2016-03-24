'use strict'

var React = require('react');

var Ajax = require('../../js/ajax-functions.js');

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
    this.setState({
      addRoute: !this.state.addRoute
    });
  },
  getInitialState: function() {
    return ({
      "routes":[]
    });
  },
  componentDidMount: function() {
    Ajax.get('/api/route/', function(err, data){
      if(err) {
        // TODO      
      }
      
      this.setState({
        routes: data
      })
    }.bind(this));
  },
  render: function() {
    return (
      <div className="content-wrapper">

        <section className="content-header">
          <h1>
            Routes
          </h1>
        </section>

        <section className="content">

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location Served</th>
              </tr>
            </thead>
            <tbody>
              {this.state.routes.map(function(route, index) {
                return (
                  <tr key={index}>
                    <td>{route.name}</td>
                    <td>{route.locationServed}</td>
                  </tr>
                );
              })
}
            </tbody>
          </table>
        </section>

      </div>

    )
  }
});
module.exports = Routes;
