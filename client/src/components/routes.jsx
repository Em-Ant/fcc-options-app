'use strict'

var React = require('react');

var Ajax = require('../../js/ajax-functions.js');

var Routes = React.createClass({

  handleAddRouteButton: function(e) {
    //Toggle Add Route Button
    this.setState({
      addRoute: !this.state.addRoute
    });
  },
  getInitialState: function() {
    return ({"routes": []});
  },
  componentDidMount: function() {
    Ajax.get('/api/route/', function(err, data) {
      if (err) {
        // TODO
      }
      this.setState({routes: data})
    }.bind(this));
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
          {this.state.routes.map(function(route, index) {
            return (
              <div key={index} className= "col-md-3" > <div className="box box-success">
              <div className="box-header with-border">
                <h3 className="box-title"><div className="route-header">{route.name} - {route.locationServed} <div className="tools"><i className="fa fa-edit"></i> <i className="fa fa-trash"></i></div></div></h3>
              </div>
              <div className="box-body">
              <div>{route.vehicle}</div>
              <div>Consumers</div>
              {route.consumers.map(function(consumer, index){
                  return (
                      <div key={index}>
                           {consumer.name}
                         </div>)
              })
             }

              </div>
            </div>
            </div>

            );
          })
        }
        </div>
    </section> < /div>

    )
  }
});
module.exports = Routes;
