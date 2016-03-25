'use strict'

var React = require('react');

var Ajax = require('../../js/ajax-functions.js');
var ConsumerForm = require('./consumer_form.jsx');

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
  handleAddConsumer: function(newConsumer) {

    var self = this;
    Ajax.post('/api/consumer/', newConsumer, function(err, data) {
      if(err) {
        return;
      }

      Ajax.get('/api/consumer/', function(err, data){
        if(err) {
          // TODO
        }

        self.setState({
          consumers: data
        })
      })
    })
  },
  getInitialState: function() {
    return ({
      "consumers":[]
    });
  },
  componentDidMount: function() {
    Ajax.get('/api/consumer/', function(err, data){
      if(err) {
        // TODO
      }

      this.setState({
        consumers: data
      })
    }.bind(this));
  },
  handleEdit: function(id) {
    Ajax.get('/api/consumer/' + id ,function(err, consumer) {
      if (err) {
        // Do something to handle error...
        return;
      }
      
      console.log(consumer);
    } )
  },
  render: function() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Consumers</h3>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Issues</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.consumers.map(function(consumer, index) {
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
                            <td>
                            <button className="btn btn-sm" onClick={this.handleEdit.bind(this, consumer._id)} >Edit</button>
                            </td>
                          </tr>
                          );
                        }.bind(this))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ConsumerForm buttonHandles = {this.handleAddConsumer}/>

        </section>
      </div>

    )
  }
});
module.exports = Consumers;
