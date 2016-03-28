'use strict'

var React = require('react');
var VehicleRoutesFormContainer = require('../containers/vehicleRoutesFormContainer.jsx');

var VehicleRoutes = React.createClass({
  getDefaultProps:function(){
    return {
      vehicleRoutes:[]
    }
  },
  render: function(){
    //TODO this should go somewhere else?
  var itemsPerRow = 4;
return (
  <div className="content-wrapper">

    <section className="content-header">
      <h1>
        Routes
      </h1>
    </section>

    <section className="content">
        <div className="row">
          {this.props.vehicleRoutes.map(function(route, index) {
            // workaround to end a row properly.  This allows the next item to wrap properly.
            // TODO:  maybe there's a better way to do this?
            // TODO:  doesn't work
             var rowEnd;
             if(index%itemsPerRow == itemsPerRow-1){
                 rowEnd = <div className="clearfix"></div>
             }
            return (
              <div key={index} className= "col-md-3" > <div className="box box-success">
              <div className="box-header with-border">
                <h3 className="box-title"><div className="route-header">{route.name} - {route.locationServed} <div className="tools"><i className="fa fa-edit"></i> <i className="fa fa-trash"></i></div></div></h3>
              </div>
              <div className="box-body">
              <div>{route.vehicle}</div>
              <div>Consumers</div>
              {route.consumers?route.consumers.map(function(consumer, index){

                  return (
                      <div key={index}>
                           {consumer.name}
                         </div>)
              }):null
             }

              </div>
            </div>

            {rowEnd}
            </div>

            );

          })
        }
        </div>
        {
          // Form to add, edit, and delete a Vehicle Route
        }
        <VehicleRoutesFormContainer/>
    </section> < /div>

    )
  }
});
module.exports = VehicleRoutes;
