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
  position: {
    lat: 45.3289021,
    lng: -93.73277439999998
  },
  phone: '333-444555',
  // Details flags
  needsWave: true,
  notes: "He is really a good guy !"
});

var consumer2 = new Consumer({
  name: "Gordon F.",
  sex: "male",
  address: "20083 January St,Big Lake, MN 55309, USA",
  position: {
    lat: 45.3323147,
    lng: -93.6875397
  },
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
function seedConsumers(done) {
  Consumer.find({}).remove(function() {
    consumer1.save();
    consumer2.save();
    Consumer.create({
        name: 'Ashley B.',
        sex: 'female',
        address: "321 Washington Ave, Big Lake, MN 55309, USA",
        position: {
          lat: 45.3414832,
          lng: -93.7440694
        },
        phone: '222-444555',
        hasSeizures: true,
        hasMedications: true
      }, {
        name: 'Henry F.',
        sex: 'male',
        address: "14901 204th Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.3418199,
          lng: -93.77724039999998
        },
        phone: '222-111989',
        needsTwoSeats: true,
        behavioralIssues: true,
        hasMedications: true,
      }, {
        name: "Edward S.",
        sex: "male",
        address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA",
        position: {
          lat: 45.3330214,
          lng: -93.7109542
        },
      }, {
        name: "Mary J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        hasWheelchair: true
      }, {
        name: "Emily J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Clarabel J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Annie J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Harold H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        hasWheelchair: true
      }, {
        name: "Rosie H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "female"
      }, {
        name: "Toby H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        hasWheelchair: true
      }, {
        name: "Percy H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        behavioralIssues: true
      }, {
        "name": "Dann Stansbury",
        "sex": "male",
        "address": "13595 Joseph Ave Becker, MN 55308",
        "position": {
          "lat": 45.411449,
          "lng": -93.879198
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Luvenia Litt",
        "sex": "female",
        "address": "10108 14th Ave Becker, MN 55308",
        "position": {
          "lat": 45.421914,
          "lng": -93.881143
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Charleen Verner",
        "sex": "female",
        "address": "4455 Eakern Cir NE Monticello, MN 55362",
        "position": {
          "lat": 45.279632,
          "lng": -93.797766
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rashida Eckman",
        "sex": "female",
        "address": "912 W River St Monticello, MN 55362",
        "position": {
          "lat": 45.31061,
          "lng": -93.806008
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Ryann Mccutchen",
        "sex": "male",
        "address": "7385 Jason Ave NE Monticello, MN 55362",
        "position": {
          "lat": 45.257395,
          "lng": -93.722943
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nancey Lavalley",
        "sex": "female",
        "address": "2625 County Road 37 NE Monticello, MN 55362",
        "position": {
          "lat": 45.258893,
          "lng": -93.829202
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Carmelina Gandy",
        "sex": "female",
        "address": "19040 180th Ave NW Big Lake Twp, MN 55309",
        "position": {
          "lat": 45.297881,
          "lng": -93.752692
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Tommy Prewett",
        "sex": "male",
        "address": "9591 Mill Trail Ln Monticello, MN 55362",
        "position": {
          "lat": 45.289705,
          "lng": -93.755623
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Charlie Jolly",
        "sex": "male",
        "address": "1479 127th St NE Monticello Twp, MN 55362",
        "position": {
          "lat": 45.327141,
          "lng": -93.857299
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Luciana Murakami",
        "sex": "female",
        "address": "906 80th St NE Monticello, MN 55362",
        "position": {
          "lat": 45.271511,
          "lng": -93.87505
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Shaniqua Raven",
        "sex": "female",
        "address": "2625 County Road 37 NE Monticello, MN 55362",
        "position": {
          "lat": 45.258893,
          "lng": -93.829202
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Star Oren",
        "sex": "male",
        "address": "449 E Broadway St Monticello, MN 55362",
        "position": {
          "lat": 45.303989,
          "lng": -93.788017
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Abdul Sontag",
        "sex": "male",
        "address": "104 Mississippi Dr Monticello, MN 55362",
        "position": {
          "lat": 45.297269,
          "lng": -93.772426
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Curtis Guevara",
        "sex": "male",
        "address": "8768 Moorhouse Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.442917,
          "lng": -93.995085
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Iraida Niven",
        "sex": "female",
        "address": "7860 Trappers Ridge Dr Clear Lake, MN 55319",
        "position": {
          "lat": 45.454339,
          "lng": -93.993477
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Charlena Glorioso",
        "sex": "female",
        "address": "795 Isabella Ave Clearwater, MN 55320",
        "position": {
          "lat": 45.405391,
          "lng": -94.053757
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Jeniffer Elias",
        "sex": "female",
        "address": "650 Juliet Ave Clearwater, MN 55320",
        "position": {
          "lat": 45.401565,
          "lng": -94.052331
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Burl Conklin",
        "sex": "male",
        "address": "650 8th St Clearwater, MN 55320",
        "position": {
          "lat": 45.404635,
          "lng": -94.052421
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Chau Robards",
        "sex": "female",
        "address": "22092 Fairfax Rd Clearwater, MN 55320",
        "position": {
          "lat": 45.443121,
          "lng": -94.117866
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Obdulia Christian",
        "sex": "female",
        "address": "4881 64th St SE Haven Twp, MN 56304",
        "position": {
          "lat": 45.476602,
          "lng": -94.059688
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Lanette Griffiths",
        "sex": "male",
        "address": "15778 Griffith Ave NW Clearwater Twp, MN 55320",
        "position": {
          "lat": 45.380871,
          "lng": -94.019298
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Adah Dreier",
        "sex": "male",
        "address": "610 8th St Clearwater, MN 55320",
        "position": {
          "lat": 45.404706,
          "lng": -94.053352
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Jeanice Kaczmarski",
        "sex": "female",
        "address": "7602 Church St Clear Lake, MN 55319",
        "position": {
          "lat": 45.445355,
          "lng": -94.000283
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Maren Hanneman",
        "sex": "male",
        "address": "14977 31st St Clear Lake, MN 55319",
        "position": {
          "lat": 45.523887,
          "lng": -93.851573
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Cassondra Bliss",
        "sex": "female",
        "address": "11249 42nd St SE Palmer Twp, MN 55319",
        "position": {
          "lat": 45.503447,
          "lng": -93.929826
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Melissa Montalto",
        "sex": "female",
        "address": "11695 42nd St SE Clear Lake, MN 55319",
        "position": {
          "lat": 45.510809,
          "lng": -93.921991
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Alfredo Nottage",
        "sex": "male",
        "address": "11269 42nd St SE Palmer Twp, MN 55319",
        "position": {
          "lat": 45.503644,
          "lng": -93.929298
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nena Horowitz",
        "sex": "female",
        "address": "4565 109th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.502841,
          "lng": -93.940773
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Dirk Councill",
        "sex": "male",
        "address": "11577 59th Ct Clear Lake, MN 55319",
        "position": {
          "lat": 45.48442,
          "lng": -93.920825
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nilda Bernardo",
        "sex": "female",
        "address": "4292 115th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.507125,
          "lng": -93.914048
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Jammie Ussery",
        "sex": "female",
        "address": "5176 114th Ave Palmer Twp, MN 55319",
        "position": {
          "lat": 45.494487,
          "lng": -93.926196
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Elida Addy",
        "sex": "female",
        "address": "4379 109th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.50585,
          "lng": -93.938817
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Felica Melgoza",
        "sex": "female",
        "address": "1643 120th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.546207,
          "lng": -93.914034
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Carina Cornwall",
        "sex": "female",
        "address": "5362 114th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.492196,
          "lng": -93.929575
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Sondra Trevarthen",
        "sex": "female",
        "address": "5131 99th Ave Palmer Twp, MN 55319",
        "position": {
          "lat": 45.495286,
          "lng": -93.948957
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Diann Wigington",
        "sex": "female",
        "address": "9701 57th St SE Clear Lake, MN 55319",
        "position": {
          "lat": 45.486724,
          "lng": -93.961149
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Hank Bake",
        "sex": "male",
        "address": "931 Cedar Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.24096,
          "lng": -94.017163
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Kenton Baisden",
        "sex": "male",
        "address": "940 Cedar Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.24114,
          "lng": -94.015234
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Maryjo Hanlin",
        "sex": "female",
        "address": "6554 80th St NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.267165,
          "lng": -94.025711
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Qiana Hoch",
        "sex": "female",
        "address": "103 Oak Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.230803,
          "lng": -94.002274
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Vanesa Guild",
        "sex": "female",
        "address": "8189 Griffith Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.270451,
          "lng": -94.023227
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Leisha Durante",
        "sex": "female",
        "address": "12374 Aetna Ave NE Monticello, MN 55362",
        "position": {
          "lat": 45.332016,
          "lng": -93.87983
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Iona Switalski",
        "sex": "female",
        "address": "615 Sunset St Buffalo, MN 55313",
        "position": {
          "lat": 45.184298,
          "lng": -93.865482
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Alysha Villanveva",
        "sex": "female",
        "address": "5425 Braddock Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.229484,
          "lng": -93.869494
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Garth Frederick",
        "sex": "male",
        "address": "1001 6th Ave NW Buffalo, MN 55313",
        "position": {
          "lat": 45.182281,
          "lng": -93.889166
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Dick Heil",
        "sex": "male",
        "address": "1722 3rd Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.19889,
          "lng": -93.866451
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rosanna Rogowski",
        "sex": "female",
        "address": "613 Nordic Ln Buffalo, MN 55313",
        "position": {
          "lat": 45.186137,
          "lng": -93.865315
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Rhoda Gadison",
        "sex": "female",
        "address": "10021 105th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.303432,
          "lng": -94.096443
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Irwin Noriega",
        "sex": "male",
        "address": "11270 Hollister Ave NW Corinna Twp, MN 55358",
        "position": {
          "lat": 45.315303,
          "lng": -94.036
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rachel Gribble",
        "sex": "female",
        "address": "6632 102nd St NW Corinna Twp, MN 55358",
        "position": {
          "lat": 45.301686,
          "lng": -94.027534
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Kenna Schoening",
        "sex": "female",
        "address": "3156 Abert Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.196537,
          "lng": -93.885307
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Lowell Sever",
        "sex": "male",
        "address": "9026 Bishop Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.282735,
          "lng": -93.921855
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Corliss Priolo",
        "sex": "male",
        "address": "8346 Irvine Ave NW Annandale, MN 55302",
        "position": {
          "lat": 45.273371,
          "lng": -94.075201
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Margrett Villalvazo",
        "sex": "female",
        "address": "7247 120th St NW Corinna Twp, MN 55302",
        "position": {
          "lat": 45.325484,
          "lng": -94.039955
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Lydia Friedel",
        "sex": "female",
        "address": "1300 Woods Cir Buffalo, MN 55313",
        "position": {
          "lat": 45.1888,
          "lng": -93.868475
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Demetrice Starbuck",
        "sex": "female",
        "address": "806 GRIFFING PARK Rd Buffalo, MN 55313",
        "position": {
          "lat": 45.187284,
          "lng": -93.861661
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Chloe Gorecki",
        "sex": "female",
        "address": "5227 Highway 25 N Buffalo, MN 55313",
        "position": {
          "lat": 45.227123,
          "lng": -93.84723
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Eliza Troutt",
        "sex": "female",
        "address": "8223 Griffith Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.270768,
          "lng": -94.021458
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Jame Mcgehee",
        "sex": "male",
        "address": "10788 Gulden Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.308547,
          "lng": -94.030946
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Darcey Doner",
        "sex": "female",
        "address": "11776 Kramer Ave NW Annandale, MN 55302",
        "position": {
          "lat": 45.323415,
          "lng": -94.114981
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Amira Pattee",
        "sex": "female",
        "address": "8611 County Road 39 NW Annandale, MN 55302",
        "position": {
          "lat": 45.287716,
          "lng": -94.069146
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Renato B.",
        "address": "1723 Tipton Cir, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3082054,
          "lng": -93.5872909
        }
      }, {
        "name": "Jayson W.",
        "address": "17676 Johnson St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.2938954,
          "lng": -93.52729409999999
        }
      }, {
        "name": "Rico H.",
        "address": "20776 Wilson St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3481363,
          "lng": -93.5460638
        }
      }, {
        "name": "Geoffrey M.",
        "address": "20776 Wilson St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3481363,
          "lng": -93.5460638
        }
      }, {
        "name": "Karoline S.",
        "address": "20776 Wilson St NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3481363,
          "lng": -93.5460638
        }
      }, {
        "name": "Carri J.",
        "address": "13882 191st Ave NW,Elk River, MN 55330",
        "sex": "female",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3206175,
          "lng": -93.5327964
        }
      }, {
        "name": "Maynard W.",
        "address": "9771 226th Ave NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3802909,
          "lng": -93.514675
        }
      }, {
        "name": "Wilton Q.",
        "address": "19069 Dodge St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3160219,
          "lng": -93.5567267
        }
      }, {
        "name": "Hue M.",
        "address": "19069 Dodge St NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3160219,
          "lng": -93.5567267
        }
      }, {
        "name": "Thomasena B.",
        "address": "13650 Meadowvale Rd NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.335947,
          "lng": -93.611868
        }
      }, {
        "name": "Luther M.",
        "address": "17676 Johnson St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true,
        "position": {
          "lat": 45.2938954,
          "lng": -93.52729409999999
        }
      }, {
        "name": "Werner P.",
        "address": "21860 Norris Lake Rd NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.367292,
          "lng": -93.47003699999999
        }
      }, {
        "name": "Tod V.",
        "address": "21860 Norris Lake Rd NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.367292,
          "lng": -93.47003699999999
        }
      }, {
        "name": "Porfirio H.",
        "address": "19140 Concord Ct NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.2948604,
          "lng": -93.60185539999999
        }
      }, {
        "name": "Eusebia H.",
        "address": "724 Auburn Pl NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.30926520000001,
          "lng": -93.554035
        }
      }, {
        "name": "Rosita M.",
        "address": "19685 Carson Cir NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.323059,
          "lng": -93.55567479999999
        }
      }, {
        "name": "Abbey T.",
        "address": "19685 Carson Cir NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.323059,
          "lng": -93.55567479999999
        }
      }, {
        "name": "Modesto C.",
        "address": "1103 School St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3115283,
          "lng": -93.5750492
        }
      }, {
        "name": "Jack M.",
        "address": "19191 Kent St NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3178468,
          "lng": -93.60902779999999
        }
      }, {
        "name": "Terence B.",
        "address": "13227 180 1/2 Ct NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true,
        "position": {
          "lat": 45.2986075,
          "lng": -93.60361660000001
        }
      }, {
        "name": "Treena B.",
        "address": "14246 189th Ln NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3152385,
          "lng": -93.6297433
        }
      }, {
        "name": "Solange Z.",
        "address": "14246 189th Ln NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3152385,
          "lng": -93.6297433
        }
      }, {
        "name": "Johnny P.",
        "address": "14246 189th Ln NW, Elk River, MN 55330",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3152385,
          "lng": -93.6297433
        }
      }, {
        "name": "Kacy K.",
        "address": "19999 Polk St NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.333979,
          "lng": -93.5351068
        }
      }, {
        "name": "Zandra E.",
        "address": "13463 -181s Cir NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.2998684,
          "lng": -93.60983399999999
        }
      }, {
        "name": "Agripina K.",
        "address": "18263 Concord St NW, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3020826,
          "lng": -93.5973183
        }
      }, {
        "name": "Maisie R.",
        "address": "15682 County Rd #35, Elk River, MN 55330",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.3379499,
          "lng": -93.66482560000001
        }
      }, {
        "name": "Arnoldo P.",
        "address": "26251 4th St W, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true,
        "position": {
          "lat": 45.4466836,
          "lng": -93.5935432
        }
      }, {
        "name": "Alfredo A.",
        "address": "26251 4th St W, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4466836,
          "lng": -93.5935432
        }
      }, {
        "name": "Faye O.",
        "address": "25895 100th St, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.439398,
          "lng": -93.52133189999999
        }
      }, {
        "name": "Tynisha B.",
        "address": "28520 138th St, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4885213,
          "lng": -93.62108289999999
        }
      }, {
        "name": "Lisbeth T.",
        "address": "27979 Blue Lake Dr NW, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4763312,
          "lng": -93.5051447
        }
      }, {
        "name": "Claud S.",
        "address": "13903 290th Ave, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.49540750000001,
          "lng": -93.6236247
        }
      }, {
        "name": "Mac A.",
        "address": "13903 290th Ave, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.49540750000001,
          "lng": -93.6236247
        }
      }, {
        "name": "Francisco G.",
        "address": "13903 290th Ave, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.49540750000001,
          "lng": -93.6236247
        }
      }, {
        "address": "26131 10th St W, Zimmerman, MN 55398",
        "behavioralIssues": true,
        "hasMedications": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "name": "Chris N.",
        "needsTwoSeats": false,
        "needsWave": false,
        "position": {
          "lat": 45.4439486,
          "lng": -93.6013704
        },
        "sex": "male"
      }, {
        "name": "Stanton C.",
        "address": "11420 272nd Ave NW, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.46383549999999,
          "lng": -93.55761179999999
        }
      }, {
        "name": "Alva R.",
        "address": "8224 285th Ave NW #SPENCER, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.48646160000001,
          "lng": -93.4770116
        }
      }, {
        "name": "Dianne O.",
        "address": "8024 285th Ave NW, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4864334,
          "lng": -93.4719856
        }
      }, {
        "name": "Adaline C.",
        "address": "11420 272nd Ave NW, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.46383549999999,
          "lng": -93.55761179999999
        }
      }, {
        "name": "Dolores S.",
        "address": "11580 272nd Ave NW, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.46280540000001,
          "lng": -93.56167459999999
        }
      }, {
        "name": "Gena E.",
        "address": "25905 8th St W, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4406105,
          "lng": -93.59966720000001
        }
      }, {
        "name": "Emelina E.",
        "address": "27979 Blue Lake Dr NW, Zimmerman, MN 55398",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.4763312,
          "lng": -93.5051447
        }
      }, {
        "name": "Galen F.",
        "address": "25570 96th St, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.47216359999999,
          "lng": -93.510617
        }
      }, {
        "name": "Jamey A.",
        "address": "14833 262nd Ave NW, Zimmerman, MN 55398",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.445219,
          "lng": -93.54537069999999
        }
      }, {
        "name": "Lemuel T.",
        "address": "11634 76th St NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true,
        "position": {
          "lat": 45.263053,
          "lng": -93.6503479
        }
      }, {
        "name": "Donovan P.",
        "address": "11634 76th St NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.263053,
          "lng": -93.6503479
        }
      }, {
        "name": "Howard M.",
        "address": "11634 76th St NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.263053,
          "lng": -93.6503479
        }
      }, {
        "name": "Lowell C.",
        "address": "11255 75th St NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.258717,
          "lng": -93.658295
        }
      }, {
        "name": "Mickie V.",
        "address": "11255 75th St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.258717,
          "lng": -93.658295
        }
      }, {
        "name": "Romona K.",
        "address": "11255 75th St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.258717,
          "lng": -93.658295
        }
      }, {
        "name": "Soo S.",
        "address": "11255 75th St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.258717,
          "lng": -93.658295
        }
      }, {
        "name": "Derick K.",
        "address": "5898 Lachman Ave NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.23762850000001,
          "lng": -93.65998040000001
        }
      }, {
        "name": "Garry B.",
        "address": "6357 Manchester Ave NE, Albertville, MN 55301",
        "sex": "male",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.243198,
          "lng": -93.640834
        }
      }, {
        "name": "Staci M.",
        "address": "5553 Kalenda Dr NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.232267,
          "lng": -93.67053299999999
        }
      }, {
        "name": "Saturnina G.",
        "address": "5476 Lander Ave NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.231307,
          "lng": -93.65503400000001
        }
      }, {
        "name": "Zola K.",
        "address": "10539 61st St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false,
        "position": {
          "lat": 45.238446,
          "lng": -93.67342599999999
        }
      }, {
        "name": "Beatrice N.",
        "address": "10784 53rd St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.2285309,
          "lng": -93.66994600000001
        }
      }, {
        "name": "Thelma A.",
        "address": "5476 Lander Ave NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.231307,
          "lng": -93.65503400000001
        }
      }, {
        "name": "Annamarie M.",
        "address": "12291 58th St NE, Albertville, MN 55301",
        "sex": "female",
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false,
        "position": {
          "lat": 45.234668,
          "lng": -93.6374079
        }
      }, {
        "name": "Lora Crowe",
        "sex": "female",
        "address": "700 Lake St N Big Lake, MN 55309",
        "position": {
          "lat": 45.340471,
          "lng": -93.74623
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Norris Turk",
        "sex": "male",
        "address": "25380 167th St NW Big Lake, MN 55309",
        "position": {
          "lat": 45.431797,
          "lng": -93.692647
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Yuki Borey",
        "sex": "female",
        "address": "3629 21st Ave S St. Cloud, MN 56301",
        "position": {
          "lat": 45.508092,
          "lng": -94.187906
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Qiana Mizelle",
        "sex": "female",
        "address": "5836 Bison Cir Monticello, MN 55362",
        "position": {
          "lat": 45.277361,
          "lng": -93.769908
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Kandra Mccallie",
        "sex": "female",
        "address": "20018 January St Big Lake Twp, MN 55309",
        "position": {
          "lat": 45.333947,
          "lng": -93.686223
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Tianna Gines",
        "sex": "female",
        "address": "10333 49th St NE Albertville, MN 55301",
        "position": {
          "lat": 45.221843,
          "lng": -93.679486
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Bell Whittingham",
        "sex": "male",
        "address": "10586 48th St Albertville, MN 55301",
        "position": {
          "lat": 45.221468,
          "lng": -93.674631
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Stephani Oatis",
        "sex": "female",
        "address": "10254 53rd St NE Albertville, MN 55301",
        "position": {
          "lat": 45.23144,
          "lng": -93.681559
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Stefani Fournier",
        "sex": "female",
        "address": "10443 51st Ct Albertville, MN 55301",
        "position": {
          "lat": 45.227347,
          "lng": -93.678419
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Marcene Husby",
        "sex": "female",
        "address": "101 Cedar Ct Maple Lake, MN 55358",
        "position": {
          "lat": 45.237615,
          "lng": -94.017501
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Clemmie Slawson",
        "sex": "female",
        "address": "9411 65th St NE Otsego, MN 55301",
        "position": {
          "lat": 45.244006,
          "lng": -93.695632
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Delorse Luedke",
        "sex": "female",
        "address": "300 Ramey Rd Maple Lake, MN 55358",
        "position": {
          "lat": 45.226352,
          "lng": -94.006927
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Evelyn Mejia",
        "sex": "female",
        "address": "10217 Karston Ave NE Albertville, MN 55301",
        "position": {
          "lat": 45.24125,
          "lng": -93.680414
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Loriann Mazzarella",
        "sex": "female",
        "address": "10209 Karston Dr NE Albertville, MN 55301",
        "position": {
          "lat": 45.239163,
          "lng": -93.680913
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Bernardina Schumacher",
        "sex": "female",
        "address": "1814 Whitetail Run Buffalo, MN 55313",
        "position": {
          "lat": 45.200127,
          "lng": -93.833799
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Delma Healey",
        "sex": "male",
        "address": "12712 County Road 37 NW Annandale, MN 55302",
        "position": {
          "lat": 45.201586,
          "lng": -94.149695
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Emerald Mccown",
        "sex": "female",
        "address": "13205 45th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.217668,
          "lng": -94.159069
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Fran Aho",
        "sex": "female",
        "address": "10024 Norling Ave NW South Haven, MN 55382",
        "position": {
          "lat": 45.297812,
          "lng": -94.166134
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Lorenzo Coke",
        "sex": "male",
        "address": "3295 85th St NE Monticello, MN 55362",
        "position": {
          "lat": 45.272022,
          "lng": -93.82169
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Karleen Sasso",
        "sex": "female",
        "address": "315 Front St Monticello, MN 55362",
        "position": {
          "lat": 45.309187,
          "lng": -93.796521
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Inger Jelinek",
        "sex": "male",
        "address": "510 Highland St W Annandale, MN 55302",
        "position": {
          "lat": 45.259507,
          "lng": -94.133541
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Blair Stapleton",
        "sex": "female",
        "address": "9172 Fallon Dr NE Monticello, MN 55362",
        "position": {
          "lat": 45.282886,
          "lng": -93.783769
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Tonita Lavoie",
        "sex": "female",
        "address": "4658 Pebblebrook Dr Monticello, MN 55362",
        "position": {
          "lat": 45.284161,
          "lng": -93.79291
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Suk Dewalt",
        "sex": "female",
        "address": "4648 Homestead Dr Monticello, MN 55362",
        "position": {
          "lat": 45.285403,
          "lng": -93.79317
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Irving Dupre",
        "sex": "male",
        "address": "12351 Aetna Ave NE Monticello, MN 55362",
        "position": {
          "lat": 45.32913,
          "lng": -93.884454
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Tracey Scruton",
        "sex": "female",
        "address": "20331 Gordon Ln Big Lake, MN 55309",
        "position": {
          "lat": 45.340645,
          "lng": -93.778033
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Kizzy Montejano",
        "sex": "female",
        "address": "324 E River St Monticello, MN 55362",
        "position": {
          "lat": 45.304861,
          "lng": -93.789099
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Lenny Salais",
        "sex": "male",
        "address": "13209 80th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.267356,
          "lng": -94.162218
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Casey Chancellor",
        "sex": "female",
        "address": "13223 80th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.267292,
          "lng": -94.16254
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Hector Maranto",
        "sex": "male",
        "address": "4318 87th St NE Monticello, MN 55362",
        "position": {
          "lat": 45.276761,
          "lng": -93.800147
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Bettyann Bourbeau",
        "sex": "female",
        "address": "413 W River St Monticello, MN 55362",
        "position": {
          "lat": 45.308893,
          "lng": -93.798249
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Delphine Prinz",
        "sex": "female",
        "address": "11000 118th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.323605,
          "lng": -94.117093
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Shaina Breazeale",
        "sex": "female",
        "address": "310 Elm St Monticello, MN 55362",
        "position": {
          "lat": 45.30737,
          "lng": -93.805116
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Toby Thomas",
        "sex": "male",
        "address": "9111 Kennedy Ave NW Annandale, MN 55302",
        "position": {
          "lat": 45.284485,
          "lng": -94.100346
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Regena Waldorf",
        "sex": "female",
        "address": "5038 Mitchell Rd Big Lake, MN 55309",
        "position": {
          "lat": 45.351056,
          "lng": -93.775517
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Idella Steenberg",
        "sex": "female",
        "address": "4190 Lake Ridge Dr Big Lake, MN 55309",
        "position": {
          "lat": 45.350107,
          "lng": -93.775718
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Catherin Bunton",
        "sex": "female",
        "address": "1165 Lime Tree Cir St. Cloud, MN 56301",
        "position": {
          "lat": 45.511489,
          "lng": -94.164087
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Dedra Stone",
        "sex": "female",
        "address": "1940 37th St SE St. Cloud, MN 56304",
        "position": {
          "lat": 45.515607,
          "lng": -94.124341
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Jone Mckinley",
        "sex": "male",
        "address": "18492 120th St SE Big Lake, MN 55309",
        "position": {
          "lat": 45.397197,
          "lng": -93.779501
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Helene Burgett",
        "sex": "female",
        "address": "14807 Hillcrest Rd SE Becker, MN 55308",
        "position": {
          "lat": 45.386694,
          "lng": -93.859532
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Benjamin Fish",
        "sex": "male",
        "address": "8689 County Road 23 SE Becker Twp, MN 55308",
        "position": {
          "lat": 45.447773,
          "lng": -93.867189
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Mirella Kamel",
        "sex": "female",
        "address": "13985 Woodland Ct Becker, MN 55308",
        "position": {
          "lat": 45.407401,
          "lng": -93.871756
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Christa Boelter",
        "sex": "female",
        "address": "6101 Highway 10 S St. Cloud, MN 56304",
        "position": {
          "lat": 45.477646,
          "lng": -94.033513
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rubin Greenhalgh",
        "sex": "male",
        "address": "9685 173rd Ave SE Becker Twp, MN 55308",
        "position": {
          "lat": 45.451394,
          "lng": -93.803749
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Jules Chunn",
        "sex": "male",
        "address": "4150 165th Ave Becker, MN 55308",
        "position": {
          "lat": 45.509521,
          "lng": -93.819947
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Clayton Dendy",
        "sex": "male",
        "address": "655 Juliet Ave Clearwater, MN 55320",
        "position": {
          "lat": 45.401166,
          "lng": -94.052923
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "May Alderman",
        "sex": "female",
        "address": "12150 Gopher St Becker, MN 55308",
        "position": {
          "lat": 45.394188,
          "lng": -93.866871
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Janyce Grieves",
        "sex": "female",
        "address": "18443 118th St SE Becker Twp, MN 55309",
        "position": {
          "lat": 45.400604,
          "lng": -93.773478
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Dora Saini",
        "sex": "female",
        "address": "11169 Olympia Ave Becker, MN 55308",
        "position": {
          "lat": 45.412169,
          "lng": -93.876366
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Alia Crotty",
        "sex": "female",
        "address": "11179 Brenda Blvd Becker, MN 55308",
        "position": {
          "lat": 45.409692,
          "lng": -93.880156
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Ricardo Makin",
        "sex": "male",
        "address": "17262 94th St SE Becker, MN 55308",
        "position": {
          "lat": 45.434275,
          "lng": -93.805912
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Tamala Keirn",
        "sex": "female",
        "address": "20877 Franklin Rd Clearwater, MN 55320",
        "position": {
          "lat": 45.427229,
          "lng": -94.055626
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Kiersten Reali",
        "sex": "male",
        "address": "1436 200th St Saint Augusta, MN 55320",
        "position": {
          "lat": 45.413046,
          "lng": -94.141712
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Dallas Wine",
        "sex": "female",
        "address": "13263 Monroe Dr Becker, MN 55308",
        "position": {
          "lat": 45.406498,
          "lng": -93.883308
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Osvaldo Decicco",
        "sex": "male",
        "address": "13444 Brenda Blvd Becker, MN 55308",
        "position": {
          "lat": 45.40302,
          "lng": -93.890885
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Jami Heady",
        "sex": "male",
        "address": "7645 Church St Clear Lake, MN 55319",
        "position": {
          "lat": 45.445355,
          "lng": -94.000283
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Monroe Stradford",
        "sex": "male",
        "address": "5106 135th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.495456,
          "lng": -93.882269
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Vonda Styons",
        "sex": "female",
        "address": "641 Cedar Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.237826,
          "lng": -94.018269
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Paulette Mccarver",
        "sex": "female",
        "address": "1827 44th St NE Buffalo, MN 55313",
        "position": {
          "lat": 45.214254,
          "lng": -93.850889
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rueben Sweeney",
        "sex": "male",
        "address": "801 Spruce Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.238684,
          "lng": -94.015296
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11046 194th Cir NW Elk River MN 55330",
        "name": "Dwain Steinbeck",
        "sex": "male",
        "position": {
          "lat": 45.324143,
          "lng": -93.56984
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "address": "11046 194th Cir NW Elk River MN 55330",
        "name": "Graham Flaherty",
        "sex": "male",
        "position": {
          "lat": 45.324143,
          "lng": -93.56984
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "11046 194th Cir NW Elk River MN 55330",
        "name": "Tory Debellis",
        "sex": "male",
        "position": {
          "lat": 45.324144,
          "lng": -93.56985
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11046 194th Cir NW Elk River MN 55330",
        "name": "Blaine Sikora",
        "sex": "male",
        "position": {
          "lat": 45.324144,
          "lng": -93.56985
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11046 194th Cir NW Elk River MN 55330",
        "name": "Sammy Dimmick",
        "sex": "male",
        "position": {
          "lat": 45.324144,
          "lng": -93.56985
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11051 194th Cir NW Elk River MN 55330",
        "name": "Emmitt Golding",
        "sex": "male",
        "position": {
          "lat": 45.324116,
          "lng": -93.569841
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "address": "11052 194th Cir NW Elk River MN 55330",
        "name": "Elena Serafino",
        "sex": "female",
        "position": {
          "lat": 45.324143,
          "lng": -93.56984
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "address": "11053 194th Cir NW Big Lake Twp MN 55330",
        "name": "Nohemi Aguinaga",
        "sex": "female",
        "position": {
          "lat": 45.323889,
          "lng": -93.622486
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11054 194th Cir NW Big Lake Twp MN 55330",
        "name": "Sun Atwater",
        "sex": "female",
        "position": {
          "lat": 45.323889,
          "lng": -93.622486
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11055 194th Cir NW Elk River MN 55330",
        "name": "Skye Tegeler",
        "sex": "female",
        "position": {
          "lat": 45.324116,
          "lng": -93.569841
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11056 194th Cir NW Elk River MN 55330",
        "name": "Candi Yepez",
        "sex": "female",
        "position": {
          "lat": 45.324143,
          "lng": -93.56984
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11057 194th Cir NW Elk River MN 55330",
        "name": "Yuki Hedman",
        "sex": "female",
        "position": {
          "lat": 45.324116,
          "lng": -93.569841
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11058 194th Cir NW Elk River MN 55330",
        "name": "Brittanie Crooms",
        "sex": "female",
        "position": {
          "lat": 45.324143,
          "lng": -93.56984
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14266 183rd Ln NW Elk River MN 55330",
        "name": "Jenise Marcil",
        "sex": "female",
        "position": {
          "lat": 45.303001,
          "lng": -93.634659
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "12193 68th Cir NE Otsego MN 55330",
        "name": "Elyse Coburn",
        "sex": "female",
        "position": {
          "lat": 45.251589,
          "lng": -93.640652
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14258 183rd Ln NW Elk River MN 55330",
        "name": "Caren Geren",
        "sex": "female",
        "position": {
          "lat": 45.303001,
          "lng": -93.634659
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14258 183rd Ln NW Elk River MN 55330",
        "name": "Josef Everest",
        "sex": "male",
        "position": {
          "lat": 45.303001,
          "lng": -93.634659
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "20363 150th St NW Elk River MN 55330",
        "name": "Doug Havard",
        "sex": "male",
        "position": {
          "lat": 45.341199,
          "lng": -93.651251
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "18489 YANKTON St NW Elk River MN 55330",
        "name": "Elliot Gillespie",
        "sex": "male",
        "position": {
          "lat": 45.308062,
          "lng": -93.632075
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "18419 Yankton St NW Elk River MN 55330",
        "name": "Eduardo Jeffords",
        "sex": "male",
        "position": {
          "lat": 45.302389,
          "lng": -93.633429
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "18415 Yankton St NW Elk River MN 55330",
        "name": "Lavern Baxter",
        "sex": "male",
        "position": {
          "lat": 45.302389,
          "lng": -93.633429
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "18407 Yankton St NW Elk River MN 55330",
        "name": "Modesto Gallaway",
        "sex": "male",
        "position": {
          "lat": 45.302389,
          "lng": -93.633429
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "18381 YANKTON St NW Elk River MN 55330",
        "name": "Agustin Mustafa",
        "sex": "male",
        "position": {
          "lat": 45.302389,
          "lng": -93.633429
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "18401 Yankton St NW Elk River MN 55330",
        "name": "Marlon Laporta",
        "sex": "male",
        "position": {
          "lat": 45.302389,
          "lng": -93.633429
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "21127 Olson Cir NW Elk River MN 55330",
        "name": "Erick Eshelman",
        "sex": "male",
        "position": {
          "lat": 45.368439,
          "lng": -93.535634
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "18268 Ogden St NW Elk River MN 55330",
        "name": "Sonny Rourke",
        "sex": "male",
        "position": {
          "lat": 45.300503,
          "lng": -93.61716
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "19180 Xavier St NW Elk River MN 55330",
        "name": "Sterling Payton",
        "sex": "male",
        "position": {
          "lat": 45.319248,
          "lng": -93.548088
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "address": "22118 156th St NW Big Lake Twp MN 55330",
        "name": "Faviola Lirette",
        "sex": "female",
        "position": {
          "lat": 45.37293,
          "lng": -93.665934
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "11102 187th Ave NW Elk River MN 55330",
        "name": "Mirella Sereno",
        "sex": "female",
        "position": {
          "lat": 45.309867,
          "lng": -93.549128
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "16050 205th Ave NW Big Lake Twp MN 55330",
        "name": "Earlie Coit",
        "sex": "female",
        "position": {
          "lat": 45.343055,
          "lng": -93.675748
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "25520 12th St W Zimmerman MN 55398",
        "name": "Claudie Petrucci",
        "sex": "female",
        "position": {
          "lat": 45.43199,
          "lng": -93.606596
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "25526 12th St W Zimmerman MN 55398",
        "name": "Debbra Bryd",
        "sex": "female",
        "position": {
          "lat": 45.43199,
          "lng": -93.606596
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "25526 12th St W Zimmerman MN 55398",
        "name": "Domenic Gladding",
        "sex": "male",
        "position": {
          "lat": 45.43199,
          "lng": -93.606596
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "26675 Woodlands Pkwy Zimmerman MN 55398",
        "name": "Major Christina",
        "sex": "male",
        "position": {
          "lat": 45.45451,
          "lng": -93.625413
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "26525 Lake Ave Zimmerman MN 55398",
        "name": "Larry Rieke",
        "sex": "male",
        "position": {
          "lat": 45.451451,
          "lng": -93.574565
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14609 283 1/2 Ave NW Blue Hill Twp MN 55398",
        "name": "Dannie Posner",
        "sex": "male",
        "position": {
          "lat": 45.484028,
          "lng": -93.639856
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14320 284th Ave NW Zimmerman MN 55398",
        "name": "Dong Lenton",
        "sex": "male",
        "position": {
          "lat": 45.484253,
          "lng": -93.520562
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "26358 22nd St W Zimmerman MN 55398",
        "name": "John Moffat",
        "sex": "male",
        "position": {
          "lat": 45.435484,
          "lng": -93.620202
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "10511 275th Ave NW Zimmerman MN 55398",
        "name": "Hunter Phillippe",
        "sex": "male",
        "position": {
          "lat": 45.468729,
          "lng": -93.533814
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "10892 256th Ave NW Zimmerman MN 55398",
        "name": "Daron Burry",
        "sex": "male",
        "position": {
          "lat": 45.435458,
          "lng": -93.543949
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "13175 287th Ave NW Zimmerman MN 55398",
        "name": "Geneva Telles",
        "sex": "female",
        "position": {
          "lat": 45.490399,
          "lng": -93.550544
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "13310 Lake Place Rd Zimmerman MN 55398",
        "name": "Lawana Pando",
        "sex": "female",
        "position": {
          "lat": 45.485597,
          "lng": -93.605154
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "13093 288th Ave NW Zimmerman MN 55398",
        "name": "Krysta Huseman",
        "sex": "female",
        "position": {
          "lat": 45.491044,
          "lng": -93.599226
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "28710 Oak Dr NW Zimmerman MN 55398",
        "name": "Cleta Sena",
        "sex": "female",
        "position": {
          "lat": 45.49019,
          "lng": -93.489925
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "address": "24800 100th St NW Zimmerman MN 55398",
        "name": "Kandice Seyal",
        "sex": "female",
        "position": {
          "lat": 45.419195,
          "lng": -93.520316
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "25429 12th St W Zimmerman MN 55398",
        "name": "Georgianna Champion",
        "sex": "female",
        "position": {
          "lat": 45.430122,
          "lng": -93.606472
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "26314 105th St NW Livonia Twp MN 55398",
        "name": "Breana Campuzano",
        "sex": "female",
        "position": {
          "lat": 45.448039,
          "lng": -93.53535
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "address": "13884 2nd Ave N Zimmerman MN 55398",
        "name": "Naomi Sturgill",
        "sex": "female",
        "position": {
          "lat": 45.444337,
          "lng": -93.59211
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "9350 281st Ave NW Zimmerman MN 55398",
        "name": "Toya Tillery",
        "sex": "female",
        "position": {
          "lat": 45.479061,
          "lng": -93.505125
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "27156 140th St NW Zimmerman MN 55398",
        "name": "Liza Gehringer",
        "sex": "female",
        "position": {
          "lat": 45.463059,
          "lng": -93.62509
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "13752 9th Ave S Zimmerman MN 55398",
        "name": "Tameka Malloy",
        "sex": "female",
        "position": {
          "lat": 45.434706,
          "lng": -93.617781
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14045 290th Ave NW Zimmerman MN 55398",
        "name": "Amal Mcclenton",
        "sex": "female",
        "position": {
          "lat": 45.496236,
          "lng": -93.625997
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14045 290th Ave NW Zimmerman MN 55398",
        "name": "Stephania Burnette",
        "sex": "female",
        "position": {
          "lat": 45.496236,
          "lng": -93.625997
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14045 290th Ave NW Zimmerman MN 55398",
        "name": "Carmella Lagasse",
        "sex": "female",
        "position": {
          "lat": 45.496237,
          "lng": -93.625998
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "14045 290th Ave NW Zimmerman MN 55398",
        "name": "Kimberly Marquis",
        "sex": "female",
        "position": {
          "lat": 45.496237,
          "lng": -93.625998
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "13830 249th Ave NW Zimmerman MN 55398",
        "name": "Linwood Keaton",
        "sex": "male",
        "position": {
          "lat": 45.422606,
          "lng": -93.621736
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "L1B4 247th Ave NW Zimmerman MN 55398",
        "name": "Leroy Hecker",
        "sex": "male",
        "position": {
          "lat": 45.422271,
          "lng": -93.567067
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "address": "24800 100th St NW Zimmerman MN 55398",
        "name": "Irving Aslett",
        "sex": "male",
        "position": {
          "lat": 45.419195,
          "lng": -93.520316
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "26340 142nd St NW Zimmerman MN 55398",
        "name": "Johnathan Miguel",
        "sex": "male",
        "position": {
          "lat": 45.448246,
          "lng": -93.62603
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "address": "L4B1 140th St NW Zimmerman MN 55398",
        "name": "Van Spellman",
        "sex": "male",
        "position": {
          "lat": 45.449376,
          "lng": -93.621686
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      },
      function() {
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
function seedVehicles(done) {
  Vehicle.find({}).remove(function() {
    vehicle1.save();
    vehicle2.save();
    Vehicle.create({
      name: 'Van 3',
      seats: 12,
    }, {
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
      flexSeats: 2,
      wheelchairs: 2
    }, {
      name: 'Bus 3',
      seats: 8,
      flexSeats: 2,
      wheelchairs: 4
    }, {
      name: 'Bus 4',
      seats: 8,
      flexSeats: 2,
      wheelchairs: 4
    }, {
      name: 'Bus 5',
      seats: 8,
      wheelchairs: 5
    }, {
      name: 'Bus 6',
      seats: 8,
      wheelchairs: 4
    }, {
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
function seedSettings(done) {
  Settings.find({}).remove(function() {
    Settings.create({
      optionsIncAddress: '16820 197th Ave NW, Big Lake, MN 55309',
      optionsIncCoords: {
        lat: 45.3292957,
        lng: -93.69755090000001
      },
      maxPassengersPerVehicle: 14,
      maxConsumerRouteTime: 90
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
