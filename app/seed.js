/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Settings = require('./models/settings.js');
var Consumer = require('./models/consumer.js');
var User = require('./models/users.js');
var Route = require('./models/routes.js');
var Vehicle = require('./models/vehicle.js');
var Directions = require('./models/directions.js');
var async = require('async');


var consumer1 = new Consumer({
  name: 'John D.',
  sex: 'male',
  address: "301 Donna Ct, Big Lake, MN 55309, USA",
  position : {lat: 45.3289021, lng: -93.73277439999998},
  phone: '333-444555',
  // Details flags
  needsWave: true,
  notes: "He is really a good guy !"
});

var consumer2 = new Consumer({
  name: "Gordon F.",
  sex: "male",
  address: "20083 January St,Big Lake, MN 55309, USA",
  position: {lat: 45.3323147, lng: -93.6875397},
  phone: '222-111987',
  hasWheelchair: true
});

var vehicle1 = new Vehicle({
  name: 'Van 1',
  seats: 12,
});

var vehicle2 = new Vehicle({
  name: 'Bus 1',
  seats: 8,
  flexSeats: 4,
  wheelchairs: 3
});

vehicle1.consumers.push(consumer1);
vehicle2.consumers.push(consumer2);

async.series([
    function(callback){
      seedConsumers(function(){
          callback();
      });
    },
    function(callback){
      seedVehicles(function(){
          callback();
      });
    }
]);
/**
* CONSUMERS
*
* model:
    name: {type: String, required: true},
    sex: {type: String, required: true, enum:['male', 'female']},
    address: {type: String, required: true},
    phone: String,

    // Details flags
    needsWave: Boolean,
    behavioralIssues: Boolean,
    needsTwoSeats: Boolean,
    hasSeizures: Boolean,
    hasWheelchair: Boolean,
    hasMedications: Boolean
*/
function seedConsumers(done){
  Consumer.find({}).remove(function() {
    consumer1.save();
    consumer2.save();
    Consumer.create({
      name: 'Ashley B.',
      sex: 'female',
      address: "321 Washington Ave, Big Lake, MN 55309, USA",
      position: {lat: 45.3414832, lng: -93.7440694},
      phone: '222-444555',
      hasSeizures: true,
      hasMedications: true
    }, {
      name: 'Henry F.',
      sex: 'male',
      address: "14901 204th Ave NW,Big Lake, MN 55330, USA",
      position: {lat: 45.3418199, lng: -93.77724039999998},
      phone: '222-111989',
      needsTwoSeats: true,
      behavioralIssues: true,
      hasMedications: true,
    }, {
      name: "Edward S.",
      sex: "male",
      address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA",
      position: {lat: 45.3330214, lng: -93.7109542},
    }, {
      name: "Mary J.",
      address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
      position: {lat:45.33412389999999, lng: -93.67073979999998},
      sex: "female",
      hasWheelchair: true
    },{
      name: "Emily J.",
      address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
      position: {lat:45.33412389999999, lng: -93.67073979999998},
      sex: "female",
      needsTwoSeats: true
    },{
      name: "Clarabel J.",
      address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
      position: {lat:45.33412389999999, lng: -93.67073979999998},
      sex: "female",
      needsTwoSeats: true
    },{
      name: "Annie J.",
      address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
      position: {lat:45.33412389999999, lng: -93.67073979999998},
      sex: "female",
      needsTwoSeats: true
  },{
      name: "Harold H.",
      address: "328 27th Ave N, St. Cloud, MN 56303, USA",
      position: {lat:45.559487, lng: -94.190274},
      sex: "male",
      hasWheelchair: true
    },{
      name: "Rosie H.",
      address: "328 27th Ave N, St. Cloud, MN 56303, USA",
      position: {lat:45.559487, lng: -94.190274},
      sex: "female"
    },{
      name: "Toby H.",
      address: "328 27th Ave N, St. Cloud, MN 56303, USA",
      position: {lat:45.559487, lng: -94.190274},
      sex: "male",
      hasWheelchair: true
    },{
      name: "Percy H.",
      address: "328 27th Ave N, St. Cloud, MN 56303, USA",
      position: {lat:45.559487, lng: -94.190274},
      sex: "male",
      behavioralIssues: true
    }, function() {
      done()
      console.log('finished populating consumers');
    });
  });
}

/**
* VEHICLES
*
* model:
  name: {type: String, required: true},
  seats: {type:Number, required:true},
  flexSeats: {type:Number, default:0},
  wheelchairs: {type:Number, default: 0},
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }]
*/
function seedVehicles(done){
  Vehicle.find({}).remove(function() {
    vehicle1.save();
    vehicle2.save();
    Vehicle.create({
      name: 'Van 2',
      seats: 12,
    },{
      name: 'Van 3',
      seats: 12,
    }, {
      name: 'Van 4',
      seats: 12,
    }, {
      name: 'Van 5',
      seats: 12,
    }, {
      name: 'Van 6',
      seats: 12,
    }, {
      name: 'Van 7',
      seats: 12,
    }, {
      name: 'Van 8',
      seats: 8,
    }, {
      name: 'Van 9',
      seats: 12,
    }, {
      name: 'Van 10',
      seats: 7,
    }, {
      name: 'Van 11',
      seats: 12,
    }, {
      name: 'Van 12',
      seats: 7,
    }, {
      name: 'Van 13',
      seats: 12,
    }, {
      name: 'Van 14',
      seats: 7,
    }, {
      name: 'Van 15',
      seats: 12,
    }, {
      name: 'Van 16',
      seats: 12,
    }, {
      name: 'Van 17',
      seats: 7,
    }, {
      name: 'Van 18',
      seats: 7,
    }, {
      name: 'Van 19',
      seats: 12,
    }, {
      name: 'Van 20',
      seats: 12,
    }, {
      name: 'Van 21',
      seats: 12,
    }, {
      name: 'Van 22',
      seats: 12,
    }, {
      name: 'Van 23',
      seats: 12,
    }, {
      name: 'Bus 2',
      seats: 10,
      flexSeats:2,
      wheelchairs: 2
    },{
      name: 'Bus 3',
      seats: 8,
      flexSeats:2,
      wheelchairs: 4
    },{
      name: 'Bus 4',
      seats: 8,
      flexSeats: 2,
      wheelchairs: 4
    },{
      name: 'Bus 5',
      seats: 8,
      wheelchairs: 5
    },{
      name: 'Bus 6',
      seats: 8,
      wheelchairs: 4
    },{
      name: 'Bus 7',
      seats: 8,
      flexSeats: 4,
      wheelchairs: 3
    }, function() {
      done();
      console.log('finished populating vehicles');
    });
  });
}


/**
 * SETTINGS
 */

Settings.find({}).remove(function() {
  Settings.create({
    optionsIncAddress: '16820 197th Ave NW, Big Lake, MN 55309',
    optionsIncCoords:{
      lat:45.3292957,
      lng:-93.69755090000001
    },
    maxPassengersPerVehicle: 14,
    maxConsumerRouteTime: 90
  }, function() {
    console.log('finished populating settings');
  });
});

/**
 * USERS
 */

User.find({}).remove(function() {
  User.create({
    email: 'test@test.com',
    password: '12345',
    role: 'user'
  }, {
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }, {
    email: 'a@a.com',
    password: 'asdf',
    role: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});

/**
* Directions
*
*/
Directions.find({}).remove(function() {
  console.log('finished populating directions');
});
