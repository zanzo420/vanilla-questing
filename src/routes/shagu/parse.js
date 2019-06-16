const fs = require('fs');

const files = [
   read('data/ids.json'),
   read('data/monsters.json'),
   read('data/quests.json'),
   read('data/items.json')
];

// RUN
Promise.all(files).then(response => {

   // DECONSTRUCT RESPONSE
   const [_ids, _monsters, _quests, _items] = response;

   // FETCH ALL UNIQUE IDs
   const ids = process_ids(_ids);

   // FETCH ALL QUESTS
   const quests = process_quests(ids, _quests, _items);

   fs.writeFile("result.json", JSON.stringify(quests), (err) => {

      if (err) console.log(err);
      console.log("REWROTE RESULT SUCCESSFULLY!");
   });
});

// READ & PARSE FILE PROMISE
function read(path) {
   return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
         if (err) throw err;
         resolve(JSON.parse(data));
      });
   })
}

// FETCH IDS
function process_ids(file) {

   // CONTAINER
   const ids = [];

   // LOOP THROUGH
   Object.values(file).forEach(row => {

      // IF ROW IS AN ARRAY
      if (row instanceof Array) {
         
         // LOOP THROUGH & PUSH
         row.forEach(value => {
            ids.push(value)
         });
         
      // OTHERWISE, PUSH
      } else { ids.push(row); }
   });

   return ids;
}

function process_quests(ids, quests, items) {

   const container = {}

   ids.forEach(id => {
      
      const quest = quests[id];

      if (quest.objective !== undefined) {

         let secondary = [];

         quest.objective.forEach(objective => {
            
            if (objective.type === 'npc') {
               secondary.push(objective.id);
            }

            if (objective.type === 'item') {
               
               if (items[objective.id].npcs !== undefined) {
                  secondary = [
                     ...secondary,
                     ...items[objective.id].npcs
                  ]
               }
            }
         });

         if (secondary.length !== 0) {
            container[quest.name] = secondary;
         }
      }
   });

   return container;
}
