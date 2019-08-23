import { shorten } from '../funcs/misc';

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
            })
         }

         // LOOP THROUGH STARTS
         if (waypoint.starts !== undefined) {
            waypoint.starts.forEach(quest => {
      
               // QUEST NAME
               const name = quest_name(quest);

               // ADD IT
               container.set(name, quest)
            })
         }
      })
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

// EXTRACT QUEST NAME & ID
function extract(data, state) {

   // NAME PLACEHOLDER & ID
   let name = quest_name(data);
   const id = fetch_id(data, state.data.quests);

   // TRANSLATE IF NECESSARY
   if (state.settings.language !== 'en') {
      name = state.lang[state.settings.language][id];
   }
   
   return {
      name: shorten(name),
      id: id
   }
}

// FETCH QUEST ID FOR SIDEPANEL LINKS
function fetch_id(quest, quests) {

   // FETCH PARAMS
   const name = quest_name(quest);
   const id = parseInt(quest[1].replace(/[^0-9]/g, ''));

   // FETCH DATA
   const target = quests[name];
   let response = target;
   
   if (target !== undefined) {
      if (typeof target === 'object') {
         if (!isNaN(id)) {
            response = target[id - 1];
         } else {
            response = target[0]
            console.log(name + ' found indexless array')
         }
      }
   } else {
      console.log(name + ' could not find')
      response = 2;
   }

   return response;
}

export {
   filter,
   extract
}