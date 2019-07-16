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
function fetch_id(quest, quests) {
   switch(typeof quest) {

      // STRING
      case 'string': {
         return quests[quest.toString().toLowerCase()];
      }

      // ARRAYS
      default: {

         // CHAIN QUEST
         if (quest[1][0].toLowerCase() === 'p') {

            // FISH OUT NUMERIC ID
            const id = quest[1].replace(/\D/g,'').substring(0, 2);

            return quests[quest[0].toString().toLowerCase()][id - 1];
         
         // SOMETHING ELSE
         } else {
            return quests[quest[0].toString().toLowerCase()];
         }
      }
   }
}

export {
   filter,
   fetch_id
}