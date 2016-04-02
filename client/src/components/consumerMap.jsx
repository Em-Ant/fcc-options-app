'use strict'

var React = require('react');
import {
  Gmaps,
  Google,
  Marker,
  InfoWindow,
  Geocoder,
  Circle
} from 'react-gmaps';

var coords = {
  lat: 45.329296,
  lng: -93.697551
};

var ConsumerMap = React.createClass({
  getInitialState: function() {
    return {markers: []}
  },
  onMapCreated(map) {
  //  map.setOptions({disableDefaultUI: true});
    var geocoder = new google.maps.Geocoder();
    var address = '16820 197th Ave NW,Big Lake, MN 55309, USA';
    //load options inc
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      console.log(status, results);
      var markers = this.state.markers;
      var newMrk = {};
      newMrk.lat = results[0].geometry.location.lat();
      newMrk.lng = results[0].geometry.location.lng();
      newMrk.name = 'Options Inc. facility';
      markers.push(newMrk);
      console.log(markers);
      this.setState({markers: markers});
    }.bind(this))

    var _self = this;
    //load consumers
    this.state.vehicles.forEach(function(vehicle){
        vehicle.consumers.forEach(function(consumer){
          geocoder.geocode({
            'address': consumer.address
          }, function(results, status) {
            console.log("adding consumer marker");
            var markers = _self.state.markers;
            var newMrk = {};
            newMrk.lat = results[0].geometry.location.lat();
            newMrk.lng = results[0].geometry.location.lng();
            newMrk.name = consumer.name;
            markers.push(newMrk);
            console.log(markers);
            _self.setState({markers: markers});
          })
        });
    })

  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },
  getInitialState: function() {
    return {
      markers:[],
      vehicles:[
        {
          name:'Bus 1',
          markerColor:'yellow',
          consumers: [
            {
              name: "Thomas",
              address:"301 Donna Ct,Big Lake, MN 55309, USA"
            }, {
              name: "Percy",
              address:"321 Washington Ave,Big Lake, MN 55309, USA"
            }, {
              name: "James",
              address:"14901 204th Ave NW,Big Lake, MN 55330, USA"
            }
          ]
        },

          {
            name: 'Bus 2',
            markerColor:'blue',
            consumers: [
              {
                name: "Thomas",
                address:"20083 January St,Big Lake, MN 55309, USA"
              }, {
                name: "Percy",
                address:"17270 US Highway 10 NW,Big Lake, MN 55309, USA"
              }, {
                name: "James",
                address:"15818 201st Ave NW,Big Lake, MN 55330, USA"
              }
            ]
          },

      ],

    }
  },
  render() {

    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-3">
              {
                this.state.vehicles.map(function(vehicle, index){
                    return (
                    <div>
                      <h1>{vehicle.name}</h1>
                        {
                          vehicle.consumers.map(function(consumer, index){
                            return(
                              <div>

                                  <h3>{consumer.name}</h3>
                                  <div>{consumer.address}</div>

                              </div>
                            )
                          })
                        }

                    </div>
                  )
                })
              }
            </div>
            <div className="col-xs-9">
              <Gmaps height={'600px'} lat={coords.lat} lng={coords.lng} zoom={12} loadingMessage={'Be happy'} params={{
                v: '3.exp'
              }} onMapCreated={this.onMapCreated}>
                {this.state.markers.map(function(m) {
                  return (<Marker lat={m.lat} lng={m.lng} draggable={false} clickable={true} onClick={function() {
                    console.log('marker click')
                  }}/>)
                })}

              </Gmaps>
            </div>
          </div>
        </section>
      </div>

    );
  }

});
module.exports = ConsumerMap;
