// PARSE QUESTLOG
function filter({ current, data }) {

   // QUEST CONTAINER
   const container = new Map();

   // LOOP THROUGH DATA TO CURRENT BLOCK
   for (let x = 0; x < current; x++) {

      // SHORTHAND
      const waypoints = data.route[x].waypoints;

      // LOOP THROUGH EACH WAYPOINT
      waypoints.forEach(waypoint => {

         // LOOP THROUGH ENDS
         if (waypoint.ends !== undefined) {
            waypoint.ends.forEach(quest => {
      
               // QUEST NAME
               const name = quest_name(quest);

               // REMOVE IT
               container.delete(name);
            });
         }

         // LOOP THROUGH STARTS
         if (waypoint.starts !== undefined) {
            waypoint.starts.forEach(quest => {
      
               // QUEST NAME
               const name = quest_name(quest);
               container.set(name, quest);
            });
         }
      });
   }

   // CONVERT TO ARRAY & RETURN
   return Array.from(container.values());
}

// FIND QUEST NAME
function quest_name(quest) {
   switch (quest instanceof Array) {
      case true: {
         return quest[0]
      }
      default: {
         return quest;
      }
   }
}

// FETCH QUEST ID FOR SIDEPANEL LINKS
function fetch_id({ quests, header, tag }) {

   // PLACEHOLDER
   let id = quests[header.toString().toLowerCase()];
   
   // IF THE QUEST IS TAGGED, FETCH THE CORRECT ID
   if (tag !== undefined && tag[0] === 'p') {
      id = quests[header.toString().toLowerCase()][tag[1] - 1]
   }

   // IF THE ID CANT BE LOCATED, LOG ERROR
   if (id === undefined) {
      console.log(header + ' not found!');
   }

   if (id instanceof Array) {
      console.log(header + ' is an array')
   }

   return id;
}

export {
   filter,
   fetch_id
}