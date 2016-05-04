'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link
var VehicleForm= require('./vehicleFormComponent.jsx');

var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var actions = new ModelActions(models.VEHICLES);

var Vehicles = React.createClass({
  componentDidMount: function() {
    if(this.props.needToBeFetched)
      this.props.fetchVehicles()
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
  incrPage : function (e) {
    e.preventDefault();
    if (this.props.currPage < this.props.pages) {
      this.props.setPage(this.props.currPage + 1)
    }
  },
  decrPage : function (e) {
    e.preventDefault();
    if (this.props.currPage > 1) {
      this.props.setPage(this.props.currPage - 1);
    }
  },
  render: function(){
return (
  <div className="content-wrapper">
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Vehicles </h3>
                <span className="pull-right">
                  <button className="btn btn-success" onClick={this.handleAddButton}>
                    Add New Vehicle
                  </button>
                </span>
            </div>
            <div className="box-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Seats</th>
                    <th>Wheelchairs</th>
                    <th>Foldable Seats</th>
                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.vehiclesIds.map(function(id, index) {
                    var vehicle = this.props.vehicles[id];
                    return (
                      <tr key={index}>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.seats}</td>
                        <td>{vehicle.wheelchairs}</td>
                        <td>{vehicle.flexSeats}</td>
                        <td className="text-center">
                            <Link className="btn btn-sm btn-default in-table"
                              title="Configure Route"
                              to={"/vehicleRoute/" + vehicle._id}>
                              <i className="fa fa-road" aria-hidden="true"></i>
                            </Link>
                            <button className="btn btn-sm btn-default in-table"
                              title="Edit" type="button"
                              onClick={this.handleEditButton.bind(null, vehicle._id)} >
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-default in-table"
                              title="Delete"  data-toggle="modal"
                              data-target="#myModal" type="button"
                              onClick={this.handleDeleteButton.bind(null, vehicle._id)}>
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
          <nav>
            <ul className="pager">
              <li><a onClick={this.decrPage} href="#prev-page">Prev</a></li>
              <li><span>{this.props.currPage} / {this.props.pages}</span></li>
              <li ><a onClick={this.incrPage} href="#next-page">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
        {
          this.props.displayForm?
          <VehicleForm/>:null

        }
    </section> < /div>

    )
  }
});

import {paginateAndSort} from '../../selectors'

const getIds = (state) => state.vehicles.ids
const getData = (state) => state.vehicles.data
const getPage = (state) => state.vehiclesPage.page
const getItemsPerPage = (state) => state.vehiclesPage.itemsPerPage

const [pagAndSort, pages] = paginateAndSort(getIds, getData, getPage, getItemsPerPage)

var mapStateToProps = function(state){
return{
    needToBeFetched: state.vehicles.needToBeFetched,
    vehicles:state.vehicles.data,
    vehiclesIds:pagAndSort(state),
    pages: pages(state),
    currPage : state.vehiclesPage.page,
    isLoading:state.vehiclesPage.isLoading,
    displayForm:state.vehiclesPage.form.display
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    fetchVehicles: function () {
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
    },
    setPage: function(page) {
      dispatch(actions.setPage(page))
    }
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Vehicles);
