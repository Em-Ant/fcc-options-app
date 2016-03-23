/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Consumer = require('./models/consumer.js');

console.log('Populating DB...\n');

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
* We can populate other collections in a similar way
* ...
*
* We can populate users too, if needed
*

User.find({}).remove(function() {
  User.create({
    ...
  }, function() {
    console.log('finished populating users');
  });
});

*/
