/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Settings = require('./models/settings.js');
var Consumer = require('./models/consumer.js');
var User = require('./models/users.js');
var Vehicle = require('./models/vehicle.js');
var Directions = require('./models/directions.js');
var async = require('async');

async.series([
  function(callback) {
    seedSettings(function() {
      callback();
    });
  },
  function(callback) {
    seedConsumers(function() {
      callback();
    });
  },
  function(callback) {
    seedVehicles(function() {
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
var consumerSeed = require('./consumers');
consumerSeed.push(function() {
    done()
    console.log('finished populating consumers');
  }
)

function seedConsumers(done) {
  Consumer.find({}).remove(function() {
    Consumer.create.apply(Consumer, seedConsumers);
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


var vehicleSeed = require('./vehicles');
vehicleSeed.push(function() {
  done();
  console.log('finished populating vehicles');
  }
)
function seedVehicles(done) {
  Vehicle.find({}).remove(function() {
    // Consumers pre-population can be done here...
    Vehicle.create.apply(Vehicle,vehicleSeed);
  });
}


/**
 * SETTINGS
 */
function seedSettings(done) {
  Settings.find({}).remove(function() {
    Settings.create({
      optionsIncAddress: '16820 197th Ave NW, Big Lake, MN 55309',
      optionsIncCoords: {
        lat: 45.3292957,
        lng: -93.69755090000001
      },
      maxPassengersPerVehicle: 14,
      maxConsumerRouteTime: 90,
      routeStopWaitTime: 3
    }, function() {
      console.log('finished populating settings');
      done();
    });
  });
}

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
