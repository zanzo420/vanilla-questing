import axios from 'axios';

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// SHORTEN STRING
function shorten(string) {
   
   // MAX CHARACTER LIMIT
   const max_length = 22;

   // string !== undefined && 

   // CHECK IF THE STRING LONGER THAN 22 CHARACTERS
   if (string.length > max_length) {

      // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
      string = string.substring(0, (max_length - 3));
      string += '...';
   }

   return string;
}

// PRELOAD BACKGROUNDS
function preload_bgs() {

   // ALL THE ZONES
   const zones = [
      'alterac',
      'arathi',
      'ashenvale',
      'azshara',
      'badlands',
      'barrens',
      'blasted',
      'darkshore',
      'darnassus',
      'deadwind',
      'desolace',
      'durotar',
      'duskwood',
      'dustwallow',
      'elwynn',
      'epl',
      'felwood',
      'feralas',
      'hillsbrad',
      'hinterlands',
      'ironforge',
      'loch',
      'moonglade',
      'morogh',
      'mulgore',
      'needles',
      'orgrimmar',
      'redridge',
      'searing',
      'silverpine',
      'steppes',
      'stonetalon',
      'stormwind',
      'stv',
      'swamp',
      'tanaris',
      'teldrassil',
      'thunderbluff',
      'tirisfal',
      'undercity',
      'ungoro',
      'westfall',
      'wetlands',
      'winterspring',
      'wpl'
   ];

   // PROMISE CONTAINER
   let promises = [];

   // GENERATE & PUSH A PROMISE FOR EACH ZONE
   zones.forEach(zone => {

      // GENERATE A PROMISE
      var p = new Promise((resolve, reject) => {
         axios.get(
            require('../interface/images/maps/' + zone + '.jpg')
         ).then(() => { resolve(); });
      })

      // PUSH IT TO THE CONTAINER
      promises.push(p);
   });

   // RETURN THE UNIFIED PROMISES
   return Promise.all(promises);
}

export {
   sleep,
   shorten,
   preload_bgs
}