import { useContext, useEffect } from 'react';
import { Context } from "./context";

import { random } from './funcs/build';
import { check, fetch } from './funcs/storage';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {
      
      // SET BUILD
      dispatch({
         type: 'load',
         payload: random()
      })

      // CHECK STORAGE HEALTH
      check().then(() => {

         // FETCH & SET PROFILES
         dispatch({
            type: 'set_profiles',
            payload: fetch()
         })
      })
   }, [])

   return null;
}

export default Init;