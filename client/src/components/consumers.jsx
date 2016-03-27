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
  handleEditConsumer: function(consumer) {
    var self = this;
    Ajax.put('/api/consumer/' + consumer._id, consumer, function(err) {
      if(err) {
        return;
      }

      Ajax.get('/api/consumer/', function(err, data){
        if(err) {
          // TODO
        }
        data.sort(function(a,b){
          return a.name.localeCompare(b.name);
        })
        self.setState({
          consumers: data,
          editMode: false,
          consumerToEdit: {}
        })
      })
    })
  },
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
        data.sort(function(a,b){
          return a.name.localeCompare(b.name);
        })
        self.setState({
          consumers: data
        })
      })
    })
  },
  getInitialState: function() {
    return ({
      "consumers":[],
      "consumerToEdit" : {},
      "editMode": false
    });
  },
  resetEditMode : function() {
    this.setState({consumerToEdit: {}, editMode: false});
  },
  componentDidMount: function() {
    Ajax.get('/api/consumer/', function(err, data){
      if(err) {
        // TODO
      }
      data.sort(function(a,b){
        return a.name.localeCompare(b.name);
      })
      this.setState({
        consumers: data
      })
    }.bind(this));
  },
  handleEditBtn: function(index) {
    this.setState({consumerToEdit: this.state.consumers[index], editMode: true});
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
                        <th className="text-center">Actions</th>
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
                              {consumer.hasWheelchair ? <span className="label label-primary">Wheelchair</span> : null}
                              {consumer.hasSeizures ? <span className="label label-danger">Seizures</span> : null}
                              {consumer.hasMedications ? <span className="label label-warning">Medications</span> : null}
                              {consumer.needsTwoSeats ? <span className="label label-default">Two Seats</span> : null}
                              {consumer.needsWave ? <span className="label label-info">Needs Wave</span> : null}
                              {consumer.cannotSitNearOppositeSex ? <span className="label label-success">Behavioral Issues</span> : null}
                            </td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-default in-table"
                                  title="Edit" type="button"
                                  onClick={this.handleEditBtn.bind(this, index)} >
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-default disabled in-table"
                                  title="Delete"  data-toggle="modal"
                                  data-target="#myModal" type="button">
                                  <i className="fa fa-trash-o"></i>
                                </button>
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
          <ConsumerForm
            verb={this.state.editMode ? "Edit": "Add"}
            buttonHandles={this.state.editMode ? this.handleEditConsumer : this.handleAddConsumer}
            defaults={this.state.consumerToEdit}
            resetFn={this.resetEditMode}/>

        </section>
      </div>

    )
  }
});
module.exports = Consumers;
