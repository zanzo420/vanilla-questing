// DEFAULT VALUES
const values = {
   content: [],
   visibility: {}
}

// REDUCER
function reducer(state, action) {
   switch (action.type) {

      // UPDATE CONTENT
      case 'content': { return {
         ...state,
         content: action.payload
      }}

      // UPDATE VISIBILITY
      case 'visibility': { return {
         ...state,
         visibility: {
            display: action.payload
         }
      }}

      // FALLBACK
      default: {
         return state;
      }
   }
}

export {
   values,
   reducer
}