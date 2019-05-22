// BROWSE TO PREVIOUS BLOCK
function previous(state, dispatch) {
   const prev = state.current - 1;
   
   // IF THERE IS ROOM TO MOVE
   if (prev >= 0) {
      dispatch({
         type: 'block',
         payload: prev
      })
   }
}

// BROWSE TO NEXT BLOCK
function next(state, dispatch) {
   const next = state.current + 1;
   
   // IF THERE IS ROOM TO MOVE
   if (next <= state.data.route.length - 1) {
      dispatch({
         type: 'block',
         payload: next
      })
   }
}

// JUMP IN PROGRESS
function jump(event, state, dispatch) {
   const parameters = {
      window: window.innerWidth,
      width: event.target.clientWidth,
      coord: event.pageX + 7
   }

   // FIND CLOSEST ROUTE BLOCK
   const length = parameters.width - (parameters.window - parameters.coord);
   const percent = length / parameters.width;
   const final = Math.floor(percent * state.data.route.length);

   // UPDATE STATE
   dispatch({
      type: 'block',
      payload: final
   });
}

// BROWSING KEY LISTENER
const key_listener = (event, state, dispatch) => {
   switch (event.key.toLowerCase()) {

      // PREVIOUS BLOCK
      case'arrowleft':
      case 'a': {
         if (!state.prompt.visible) {
            previous(state, dispatch);
         } break;
      }

      // NEXT BLOCK
      case'arrowright':
      case 'd': {
         if (!state.prompt.visible) {
            next(state, dispatch);
         } break;
      }

      // SHOW REFERENCES
      case 'q': {
         if (!state.prompt.visible) {
            dispatch({
               type: 'show-prompt',
               payload: 'references'
            })
         } break;
      }

      // HIDE PROMPT
      case 'escape': {
         dispatch({
            type: 'hide-prompt',
         })
         break;
      }

      // FALLBACK
      default: {
         return null;
      }
   }
}

export {
   next,
   previous,
   jump,
   key_listener
}