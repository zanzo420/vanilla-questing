import { sleep } from "./misc";

// STORAGE KEY
const key = 'profiles';

// HANDLE LEGACY ITEMS & FILL HASHMAP
function check() {
   return new Promise((resolve, reject) => {

      // FETCH STORAGE & OBJECTIFY
      let storage = JSON.parse(localStorage.getItem(key));

      // LEGACY KEYS
      const legacy = ['vanilla-questing', 'horde', 'dev'];

      // REMOVE LEGACY KEYS IF THEY EXIST
      legacy.forEach(item => {
         if (localStorage.getItem(item) !== null) {
            localStorage.removeItem(item);
         }
      })

      // IF STORAGE KEY DOESNT EXISTS
      if (localStorage.getItem(key) === null) {
         
         // OVERWRITE STORAGE VAR
         storage = {
            profiles: []
         }

         // STRINGIFY & SET IT
         localStorage.setItem(key, JSON.stringify(storage));
      }

      // GIVE THE PAGE A SECOND TO STABILIZE DIMENSIONS, THEN RESOLVE
      sleep(1000).then(() => {
         resolve(new Map(storage.profiles));
      });
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

// EXPORT PROFILE OBJECT
function _export() {
   return localStorage.getItem(key);
}

export {
   check,
   fetch,
   update,
   change,
   _export
};