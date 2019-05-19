import axios from 'axios';

// ALLIANCE RACES
const alliance = new Map([
   ['human', 'human'],
   ['dwarf', 'gnorf'],
   ['gnome', 'gnorf'],
   ['nelf', 'nelf'],
]);

// HORDE RACES
const horde = new Map([
   ['orc', 'trorc'],
   ['troll', 'trorc'],
   ['tauren', 'tauren'],
   ['undead', 'undead'],
]);

// ASSEMBLE JSON DATA
function route(race) {

   // CONTAINER
   let promises = [];

   // ALLIANCE BLOCKS
   if (alliance.has(race)) {

      // FIND RELEVANT FILES
      promises = [
         axios.get('./routes/alliance/quests.json'),
         axios.get('./routes/alliance/' + alliance.get(race) + '.json'),
         axios.get('./routes/alliance/shared.json'),
      ];

   // HORDE BLOCKS
   } else if (horde.has(race)) {

      // FIND RELEVANT FILES
      promises = [
         axios.get('./routes/horde/quests.json'),
         axios.get('./routes/horde/' + horde.get(race) + '.json'),
         axios.get('./routes/horde/shared.json'),
      ];
   }

   // WAIT FOR THE PROMISES TO RESOLVE
   return Promise.all(promises).then(response => {

      // CREATE THE DATA OBJECT
      const data = {
         quests: response[0].data,
         route: [
            ...response[1].data.path,
            ...response[2].data.path
         ],
         hearthstones: hearthstones([
            ...response[1].data.path,
            ...response[2].data.path
         ])
      };

      return data;
   });
}

// RANDOM ROUTE
function random() {

   // PICK A RACE RANDOMLY
   const races = [ ...alliance.keys(), ...horde.keys() ];
   const randomize = Math.floor((Math.random() * races.length) + 0);

   // BUILD ROUTE & RENDER IT
   return route(races[randomize]).then(data => {
      return {
         data: data,
         current: Math.floor((Math.random() * data.route.length - 1) + 1)
      }
   })
}

// SPECIFIC ROUTE
function specific({ icon, block }) {
   return route(icon).then(data => {
      return {
         data: data,
         current: block,
      };
   });
}

// IMPORTED DATASET
function custom(url, faction) {

   // QUEST & ROUTE PROMISES
   const promises = [
      axios.get('./routes/' + faction + '/quests.json'),
      axios.get(url)
   ];

   // WAIT FOR THE PROMISES TO RESOLVE
   return Promise.all(promises).then(data => {
      return {
         data: {
            quests: data[0].data,
            route: data[1].data.path,
            hearthstones: hearthstones(data[1].data.path)
         },
         current: 0
      }
   })
}

// DEVELOPMENT DATASET
function dev() {

   // QUEST & ROUTE PROMISES
   const promises = [
      axios.get('./routes/dev/quests.json'),
      axios.get('./routes/dev/route.json')
   ];

   // WAIT FOR THE PROMISES TO RESOLVE
   return Promise.all(promises).then(data => {
      return {
         data: {
            quests: data[0].data,
            route: data[1].data.path,
            hearthstones: hearthstones(data[1].data.path)
         },
         current: 0
      }
   })
}

// FIND HEARTHSTONE BLOCK INDEXES
function hearthstones(route) {
   const container = [];

   // ASSEMBLE LIST OF EACH 'SET HS' OCCURRENCE
   route.forEach((block, index) => {
      block.waypoints.forEach(waypoint => {
         if (waypoint.special !== undefined) {
            waypoint.special.forEach(message => {
               if (typeof message === 'string' && message.toLowerCase() === 'set hearthstone') {
                  container.push({
                     block: index,
                     zone: block.zone
                  });
               }
            });
         }
      });
   });

   return container;
}

// CHECK IF RACE EXISTS --- FORCE LOWERCASE
function exists(race) {

   // MAKE UNITED MAP
   const factions = new Map([
      ...alliance,
      ...horde
   ]);

   // PERFORM & RETURN CHECK
   return factions.has(race.toLowerCase())
}

export {
   random,
   specific,
   custom,
   dev,
   exists
}