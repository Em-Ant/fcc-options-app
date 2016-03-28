'use strict'

var React = require('react');
var Ajax = require('../../js/ajax-functions.js');

var ConsumerForm = React.createClass({

  componentWillReceiveProps : function(nextProps) {

    /*
    This is a Hack to allow uncontrolled forms to update when receiving
    default value props. See https://facebook.github.io/react/docs/forms.html
    and https://github.com/facebook/react/issues/461
    I had to use jquery, don't know if it's the best way to do it,
    or if it's a good 'React' solution
    */

    // handle component from Plugins
    $(".select2").val(nextProps.defaults.sex).trigger("change");

    $('input').iCheck('uncheck');

    if(nextProps.defaults.hasWheelchair) $('#c_wheel').iCheck('check');
    if(nextProps.defaults.hasSeizures) $('#c_seiz').iCheck('check');
    if(nextProps.defaults.hasMedications) $('#c_med').iCheck('check');
    if(nextProps.defaults.needsWave) $('#c_wave').iCheck('check');
    if(nextProps.defaults.needsTwoSeats) $('#c_twoseat').iCheck('check');
    if(nextProps.defaults.cannotSitNearOppositeSex) $('#c_behavior').iCheck('check');

    // Handle inputs
    $('#c_name').val(nextProps.defaults.name);
    $('#c_address').val(nextProps.defaults.address);
    $('#c_phone').val(nextProps.defaults.phone);
  },
  handleSubmit: function(e) {

    // This function needs validation
    e.preventDefault();
    var newConsumer = {};
    newConsumer._id = this.props.defaults._id;

    newConsumer.name = this.refs.name.value;
    newConsumer.address = this.refs.address.value;
    newConsumer.phone = this.refs.phone.value;
    newConsumer.sex = this.refs.sex.value;

    newConsumer.needsWave = this.refs.wave.checked;
    newConsumer.hasSeizures = this.refs.seiz.checked;
    newConsumer.hasWheelchair = this.refs.wheel.checked;
    newConsumer.needsTwoSeats = this.refs.twoSeats.checked;
    newConsumer.hasMedications = this.refs.med.checked;
    newConsumer.cannotSitNearOppositeSex = this.refs.behavior.checked;

    this.refs.name.value = '';
    this.refs.address.value = '';
    this.refs.phone.value = '';
    this.refs.sex.value = '';

    $('input').iCheck('uncheck');

    this.props.buttonHandles(newConsumer, this.props.editIndex)
  },
  render: function() {
    var boxClass = this.props.verb === "Edit" ? "box box-warning" : "box box-info";
    return (
          <div className="row">
            <div className="col-lg-6">
              <div className={boxClass}>
                <div className="box-header with-border">
                  <h3 className="box-title">{this.props.verb} a Consumer</h3>
                </div>

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control"
                          id="c_name" placeholder="Name" ref="name" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_sex" className="col-sm-2 control-label">Sex</label>
                      <div className="col-sm-10">
                        <select className="form-control select2"
                          style={{'width': '100%'}}  id="c_sex" ref="sex">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_address" className="col-sm-2 control-label">Address</label>
                      <div className="col-sm-10">
                        <input type="text" id="c_phone" className="form-control"
                          id="c_address" placeholder="Address" ref="address"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_phone" className="col-sm-2 control-label">Phone</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="c_phone"
                          placeholder="Phone" ref="phone"/>
                      </div>
                    </div>


                    <div className="form-group">
                      <label htmlFor="c_wheel" className="col-sm-2 control-label">
                        Wheelchair</label>
                      <div className="col-sm-4">
                        <input type="checkbox" id="c_wheel" className="minimal"
                          ref="wheel" />
                      </div>
                      <label htmlFor="c_twoseat" className="col-sm-3 control-label">Two Seats</label>
                      <div className="col-sm-3">
                        <input type="checkbox" id="c_twoseat" className="minimal" ref="twoSeats"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_wave" className="col-sm-2 control-label">Needs Wave</label>
                      <div className="col-sm-4">
                        <input type="checkbox" id="c_wave" className="minimal" ref="wave"/>
                      </div>
                      <label htmlFor="c_behavior" className="col-sm-3 control-label">Behavioral Issues</label>
                      <div className="col-sm-3">
                        <input type="checkbox" id="c_behavior" className="minimal" ref="behavior"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c_seiz" className="col-sm-2 control-label">Seizures</label>
                      <div className="col-sm-4">
                        <input type="checkbox" id="c_seiz" className="minimal" ref="seiz"/>
                      </div>
                      <label htmlFor="c_med" className="col-sm-3 control-label">Medications</label>
                      <div className="col-sm-3">
                        <input type="checkbox" id="c_med" className="minimal" ref="med"/>
                      </div>
                    </div>

                  </div>
                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                      <button className="btn btn-default margin-left"
                        onClick={this.props.resetFn} type="button">
                        {this.props.verb === 'Edit' ? 'Cancel' : 'Reset'}
                      </button>
                  </div>

                </form>

                </div>
              </div>
            </div>
    )
  }
});
module.exports = ConsumerForm;
