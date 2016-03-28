'use strict'

var React = require('react');
var VehicleRoutesFormContainer = require('../containers/vehicleRoutesFormContainer.jsx');

var Routes = React.createClass({
  getDefaultProps:function(){
    return {
      vehicleRoutes:[]
    }
  },
  render: function(){
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
            </div>

            );
          })
        }
        </div>

        <VehicleRoutesFormContainer/>
    </section> < /div>

    )
  }
});
module.exports = Routes;
