const fs = require('fs');

const files = [
   read('data/ids.json'),
   read('data/monsters.json'),
   read('data/quests.json'),
   read('data/items.json')
];

Promise.all(files).then(response => {

   // DECONSTRUCT RESPONSE
   const [ids, monsters, quests, items] = response;

   Object.values(ids).forEach(id => {
      if (quests[id].objective !== undefined) {

         switch(quests[id].objective[0].type) {
            case 'npc': {
               console.log(quests[id].name + ' (' + id + ')' + ' is a kill quest\n');
            } break;
            case 'item': {
               console.log(quests[id].name + ' (' + id + ')' + ' is a drop quest\n');
            } break;
            default: {
               console.log(id + ' was not found!');
            }
         }
      }
   });
});

// READ & PARSE FILE
function read(path) {
   return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
         if (err) throw err;
         resolve(JSON.parse(data));
      });
   })
}