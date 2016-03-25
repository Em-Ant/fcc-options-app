/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Consumer = require('./models/consumer.js');
var User = require('./models/users.js');
var Route = require('./models/routes.js');

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
* CONSUMERS
*
* model:
    name: {type: String, required: true},
    sex: {type: String, required: true, enum:['male', 'female']},
    address: {type: String, required: true},
    phone: String,

    // Details flags
    needsWave: Boolean,
    cannotSitNearOppositeSex: Boolean,
    needsTwoSeats: Boolean,
    hasSeizures: Boolean,
    hasWeelchair: Boolean,
    hasMedications: Boolean
*/

Consumer.find({}).remove(function() {
  Consumer.create({
    name: 'John D.',
    sex: 'male',
    address: '123, Main Road, NYC',
    phone: '333-444555',
    // Details flags
    needsWave: true,
    hasWeelchair: true,
  }, {
    name: 'Ashley B.',
    sex: 'female',
    address: '231, Secondary Street, NYC',
    phone: '222-444555',
    hasSeizures: true,
    hasMedications: true
  }, {
    name: 'Henry F.',
    sex: 'male',
    address: '456, Wide Avenue, NYC',
    phone: '222-111989',
    needsTwoSeats: true,
    cannotSitNearOppositeSex: true,
    hasMedications: true
  }, function() {
    console.log('finished populating consumers');
  });
});


/**
* ROUTES
*
* model:
    name: {type: String, required: true},
    locationServed: {type: String}
*/

Route.find({}).remove(function() {
  Route.create({
    name: 'Route A',
    locationServed: 'Elk River'
  }, {
    name: 'Route B',
    locationServed: 'St. Cloud'
  }, {
    name: 'Route D',
    locationServed: 'Monti/Otseg'
  }, function() {
    console.log('finished populating routes');
  });
});
