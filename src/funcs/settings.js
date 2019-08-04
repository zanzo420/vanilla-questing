// STORAGE KEY
const key = 'settings';

// CHECK STORAGE HEALTH
function check() {

   // IF SETTINGS KEY DOENST EXIST
   if (localStorage.getItem(key) === null) {
      
      // SET DEFAULT SETTINGS
      set({
         database: 'classicdb',
         keybinds: 'enable',
         binds: {
            close: 'Escape',
            references: 'KeyQ',
            backward: 'KeyA',
            forward: 'KeyD'
         }
      })
   }

   // FETCH THE CONTENT
   const settings = fetch();

   // IF THE DATABASE PROP DOESNT EXIST
   if (settings.database === undefined) {

      // SET THE DB VALUE & UPDATE STORAGE
      settings.database = 'classicdb';
      set(settings);
   }

   // PARSE & RETURN STORAGE ITEM
   return settings;
}

// PARSE & RETURN STORAGE VALUE
function fetch() {
   return JSON.parse(localStorage.getItem(key));
}

// STRINGIFY & SET STORAGE VALUE
function set(settings) {
   localStorage.setItem(key, JSON.stringify(settings));
}

// CHECK IF KEY EXISTS
function exists(bind) {

   // FETCH BIND VALUES & CONVERT THEM TO A SET
   const content = Object.values(fetch().binds);
   const values = new Set(content);

   // RETURN CHECK RESULT
   return values.has(bind);
}

// CHANGE KEYBIND
function update_bind(settings, payload) {

   // PAYLOAD PROPS
   const { name, bind } = payload;

   // UPDATE OBJECT & LOCALSTORAGE
   settings.binds[name] = bind;
   set(settings);

   // RETURN UPDATED OBJECT
   return settings;
}

// CHANGE OTHER PROP
function update_prop(settings, payload) {

   // PAYLOAD PROPS
   const { prop, value } = payload;

   // UPDATE OBJECT & LOCALSTORAGE
   settings[prop] = value;
   set(settings);

   // RETURN UPDATED OBJECT
   return settings;
}

// FETCH URL OF PREFERRED DATABASE
function database(state) {
   switch(state.settings.database) {

      // CLASSICDB
      case 'classicdb': {
         return 'https://classicdb.ch/?quest='
      }

      // WOWHEAD
      default: {
         return 'https://classic.wowhead.com/quest=';
      }
   }
}

export {
   check,
   exists,
   update_bind,
   update_prop,
   database
}