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
  handleAddConsumer: function(e) {

    // This function needs validation
    e.preventDefault();
    var newConsumer = {};
    newConsumer.name = this.refs.name.value;
    newConsumer.address = this.refs.address.value;
    newConsumer.phone = this.refs.phone.value;
    newConsumer.sex = this.refs.sex.value;

    newConsumer.needsWave = this.refs.wave.checked;
    newConsumer.hasSeizures = this.refs.seiz.checked;
    newConsumer.hasWeelchair = this.refs.wheel.checked;
    newConsumer.needsTwoSeats = this.refs.twoSeats.checked;
    newConsumer.hasMedications = this.refs.med.checked;
    newConsumer.cannotSitNearOppositeSex = this.refs.behavior.checked;

    this.refs.name.value = '';
    this.refs.address.value = '';
    this.refs.phone.value = '';
    this.refs.sex.value = '';

    $('input').iCheck('uncheck');


    console.log(this.refs.wave)
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
          <div className="row">
            <div className="col-lg-6">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Add a Consumer</h3>
                </div>

                <form className="form-horizontal" onSubmit={this.handleAddConsumer}>
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="c_name" placeholder="Name" ref="name"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_sex" className="col-sm-2 control-label">Sex</label>
                      <div className="col-sm-10">
                        <select className="form-control select2" style={{'width': '100%'}}  id="c_sex" ref="sex">
                          <option defaultValue value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_address" className="col-sm-2 control-label">Address</label>
                      <div className="col-sm-10">
                        <input type="text" id="c_phone" className="form-control" id="c_address" placeholder="Address" ref="address"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_phone" className="col-sm-2 control-label">Phone</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="c_phone" placeholder="Phone" ref="phone"/>
                      </div>
                    </div>


                    <div className="form-group">
                      <label htmlFor="c_wheel" className="col-sm-2 control-label">Weelchair</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_wheel" className="minimal" ref="wheel"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_twoseat" className="col-sm-2 control-label">Two Seats</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_twoseat" className="minimal" ref="twoSeats"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_wave" className="col-sm-2 control-label">Needs Wave</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_wave" className="minimal" ref="wave"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_behavior" className="col-sm-2 control-label">Behavioral Issues</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_behavior" className="minimal" ref="behavior"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_seiz" className="col-sm-2 control-label">Seizures</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_seiz" className="minimal" ref="seiz"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_med" className="col-sm-2 control-label">Medications</label>
                      <div className="col-sm-10">
                        <input type="checkbox" id="c_med" className="minimal" ref="med"/>
                      </div>
                    </div>

                  </div>
                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>

                </form>

                </div>
              </div>
            </div>

        </section>
      </div>

    )
  }
});
module.exports = Consumers;
