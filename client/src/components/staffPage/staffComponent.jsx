'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var ModelActions = require('../../actions/modelActions');
const STAFF = "STAFF";
var actions = new ModelActions(STAFF);
//var StaffForm = require('./staffFormComponent.jsx');

var Staff = React.createClass({
  componentDidMount: function() {
    if(this.props.needToBeFetched)
      this.props.fetch();
  },
  handleEditButton:function(id){
    this.props.onEditButtonClick(id);
  },
  handleDeleteButton:function(id){
    this.props.onDeleteButtonClick(id);
  },
  handleAddButton:function(){
    this.props.onAddButtonClick();
  },
  render: function(){
return (
  <div className="content-wrapper">
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Staff</h3>
                <span className="pull-right">
                  <button className="btn btn-success" onClick={this.handleAddButton}>
                    Add New Staff
                  </button>
                </span>
            </div>
            <div className="box-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roles</th>
                    <th>Medication Certified?</th>
                    <th>Notes</th>
                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.staffIds.map(function(id, index) {
                    var staff = this.props.staff[id];
                    return (
                      <tr key={index}>
                        <td>{staff.name}</td>
                        <td>{staff.roles.join(', ')}</td>
                        <td>{staff.medCertified?"Yes":"No"}</td>
                        <td>{staff.notes}</td>
                        <td className="text-center">
                            <button className="btn btn-sm btn-default in-table"
                              title="Edit" type="button"
                              onClick={this.handleEditButton.bind(null, staff._id)} >
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-default in-table"
                              title="Delete"  data-toggle="modal"
                              data-target="#myModal" type="button"
                              onClick={this.handleDeleteButton.bind(null, staff._id)}>
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

            {this.props.isLoading ?
            <div className="overlay">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
            : null }
          </div>
        </div>
      </div>
        {
        //  this.props.displayForm?
          //<StaffForm/>:null
        }
    </section> < /div>

    )
  }
});

var mapStateToProps = function(state){
return{
    needToBeFetched: state.staff.needToBeFetched,
    staff:state.staff.data,
    staffIds:state.staff.ids,
    isLoading:state.staff.isLoading,
    displayForm:state.staffPage.form.display
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    fetch: function () {
      dispatch(actions.fetch());
    },
    onDeleteButtonClick:function(id){
      dispatch(actions.delete(id));
    },
    onEditButtonClick:function(id){
      dispatch(actions.setEditMode(id));
    },
    onAddButtonClick:function(id){
      dispatch(actions.setAddMode());
    }

  }
}

module.exports =connect(mapStateToProps,mapDispatchToProps)(Staff);;
