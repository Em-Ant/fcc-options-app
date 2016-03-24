'use strict'

var React = require('react');

var Ajax = require('../../js/ajax-functions.js');

var Consumers = React.createClass({
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
    Ajax.get('/api/consumer/', function(err, data){
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
            Consumers
          </h1>
        </section>

        <section className="content">

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              {this.state.routes.map(function(consumer, index) {
                return (
                  <tr key={index}>
                    <td>{consumer.name}</td>
                    <td>{consumer.sex}</td>
                    <td>{consumer.address}</td>
                    <td>{consumer.phone}</td>
                    <td>
                      {consumer.hasWeelchair ? <span className="label label-primary">Weelchair</span> : null}
                      {consumer.hasSeizures ? <span className="label label-danger">Seizures</span> : null}
                      {consumer.hasMedications ? <span className="label label-warning">Medications</span> : null}
                      {consumer.needsTwoSeats ? <span className="label label-default">Two Seats</span> : null}
                      {consumer.needsWave ? <span className="label label-info">Needs Wave</span> : null}
                      {consumer.cannotSitNearOppositeSex ? <span className="label label-success">Behavioral Issues</span> : null}
                    </td>
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
module.exports = Consumers;
