// STORAGE KEY
const key = 'profiles';

// HANDLE LEGACY ITEMS & FILL HASHMAP
function check() {
   return new Promise((resolve, reject) => {

      // CONVERT OLD PROFILES
      if (localStorage.getItem('vanilla-questing') !== null) {

         // CONVERT & SET
         localStorage.setItem(key, JSON.stringify({
            profiles: convert(localStorage.getItem('vanilla-questing'))
         }));
         
         // DELETE OLD KEY
         localStorage.removeItem('vanilla-questing');
      }

      // NUKE LEGACY STUFF ENTIRELY
      if (localStorage.getItem('horde') !== null) { localStorage.removeItem('horde'); }

      // IF STORAGE IS EMPTY, FILL IT WITH BRACKETS
      if (localStorage.getItem(key) === null) {
         localStorage.setItem(key, '{ "profiles": [] }');
      }

      // THEN RESOLVE
      resolve();
   })
}

// FETCH HASHMAP OF PROFILES
function fetch() {
   const storage = JSON.parse(localStorage.getItem(key));
   return new Map(storage.profiles);
}

// UPDATE STORAGE
function update(hashmap) {
   const stringified = JSON.stringify({ 'profiles': Array.from(hashmap) });
   localStorage.setItem(key, stringified);
}

// CHANGE BLOCK NUM FOR LOADED PROFILE
function change(state, block) {
   if (state.loaded !== null) {

      // RECONSTRUCT DETAILS
      const details = {
         ...state.profiles.get(state.loaded),
         block: block
      }

      // OVERWRITE OLD VALUE & UPDATE STORAGE
      state.profiles.set(state.loaded, details);
      update(state.profiles);
   }
}

// CONVERT OLD STORAGE OBJECT
function convert(old) {

   // OBJECTIFY
   const foo = JSON.parse(old);

   // FETCH KEYS & DECLARE PROFILES
   const keys = Object.keys(foo);
   let profiles = [];

   // LOOP THROUGH
   keys.forEach(key => {

      // PUSH EACH NAME/DETAILS BLOCK
      profiles.push([key, {
         icon: foo[key].race,
         block: foo[key].block
      }]);
   })

   return profiles;
}

export {
   check,
   fetch,
   update,
   change
};