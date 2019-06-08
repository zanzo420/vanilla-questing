// STORAGE KEY
const key = 'settings';

// CHECK STORAGE CONTENT
function check() {

   // IF SETTINGS KEY DOENST EXIST
   if (localStorage.getItem(key) === null) {

      // DEFAULT SETTINGS
      const settings = {
         close: 'Escape',
         references: 'Keyq',
         backward: 'KeyA',
         forward: 'KeyD'
      };
      
      // STRINGIFY & SET
      localStorage.setItem(key, JSON.stringify(settings));
   }

   // PARSE & RETURN STORAGE ITEM
   return JSON.parse(localStorage.getItem(key));
}

function keys() {
   
   // BOUND KEYS
}

export {
   check,
   keys
}