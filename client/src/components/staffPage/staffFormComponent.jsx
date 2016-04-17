'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var ModelActions = require('../../actions/modelActions');
const STAFF = "STAFF";
var actions = new ModelActions(STAFF);

var Message = require('../message.jsx');

var StaffForm = React.createClass({
  setStaffToEdit: function(staff) {
    this.setState({staff: staff});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.verb == "Add") {
      this.props.onAdd(this.state.staff);
    } else if (this.props.verb == "Edit") {
      this.props.onEdit(this.state.staff);
    }
  },
  handleNameChange: function(e) {
    var staffState = Object.assign({}, this.state.staff, {name: e.target.value})
    this.setState({staff: staffState});
  },
  handleRoleClick: function(e) {
    var role = e.target.value;
    var roles = this.state.staff.roles.slice();
    var index = roles.indexOf(role);
    if( index !== -1){
      roles.splice(index, 1);
    }else {
     roles.push(role);
    }
   var staffState = Object.assign({}, this.state.staff, {roles: roles})
   this.setState({staff: staffState});
  },
  handleNotesChange: function(e) {
    var staffState = Object.assign({}, this.state.staff, {notes: e.target.value})
    this.setState({staff: staffState});
  },
  handleMedCertifiedChange: function(e) {
    var staffState = Object.assign({}, this.state.staff, {medCertified: e.target.value})
    this.setState({staff: staffState});
  },
  handleWheelchairCapacityChange: function(e) {
    var staffState = Object.assign({}, this.state.staff, {wheelchairs: e.target.value})
    this.setState({staff: staffState});
  },
  getInitialState: function() {
    return {staff: {
      roles:[],
      medCertified:false
    }};
  },
  componentDidMount: function() {
    if (this.props.staff && !this.props.isLoading) {
      this.setVehicleToEdit(this.props.staff);
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.staff && !nextProps.isLoading) {
      this.setVehicleToEdit(nextProps.staff);
    }
  },
  render: function() {
    var boxClass = this.props.verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.verb + " a Route"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.onCloseForm} data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.props.message
              ? <Message message={this.props.message}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_name" placeholder="Name" value={this.state.staff.name} onChange={this.handleNameChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_roles" className="col-sm-2 control-label">Roles</label>
                    <div className="col-sm-10">
                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox1" value="driver" checked={this.state.staff.roles.indexOf("driver")!==-1} onClick={this.handleRoleClick}/> Driver
                      </label>
                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox2" value="rider" checked={this.state.staff.roles.indexOf("rider")!==-1} onClick={this.handleRoleClick}/> Rider
                      </label>
                    </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_med_certified" className="col-sm-2 control-label">Medication Certified?</label>
                    <div className="col-sm-10">
                      <select className="form-control" value={this.state.staff.medCertified} onChange={this.handleMedCertifiedChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_notes" className="col-sm-2 control-label">Notes</label>
                  <div className="col-sm-10">
                      <textarea className="form-control" id="c_notes"
                        placeholder="Notes" value={this.state.staff.notes} onChange={this.handleNotesChange}/>  </div>
                </div>
              </div>
              {this.props.isLoading
                ? <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                  </div>
                : null}
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Submit</button>

              </div>

            </form>

          </div>
        </div>
      </div>
    )
  }
});

var mapStateToProps = function(state) {
  //if editing, get staff to edit
  var staff;
  var editId = state.staffPage.form.editId;
  if (editId) {
    staff = state.staff.data[editId];
  }
  return Object.assign({}, state.staffPage.form, {staff: staff});
}
var mapDispatchToProps = function(dispatch) {
  return {
    onAdd: function(obj) {
      dispatch(actions.create(obj));
    },
    onEdit: function(obj) {
      dispatch(actions.update(obj));
    },
    onCloseForm: function() {
      dispatch(actions.closeForm());
    }

  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StaffForm);
