import { useContext, useEffect } from 'react';
import { Context } from "./context";

import { random, dev } from './funcs/build';
import { check, fetch } from './funcs/storage';
import { sleep } from './funcs/misc';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // ARE YOU DEVELOPING
   const developing = false;

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // CHECK STORAGE HEALTH
      check().then(() => {

         // FETCH PROFILES
         const profiles = fetch();

         // GIVE THE PAGE A SECOND TO RESOLVE
         sleep(1000).then(() => {

            // WHEN DEVELOPING
            if (developing) {

               // FETCH DEV BUILD & LAST DEV BLOCK
               const build = dev();
               const dev_block = profiles.get('dev').block;

               // IF DEV BLOCK IS IN RANGE
               if (build.data.route.length >= dev_block) {

                  // OVERWRITE DEFAULT CURRENT
                  build.current = dev_block
               
               // OTHERWISE, DEFAULT TO ZERO & LOG ERROR
               } else { console.log('Block limit exceeded. Defaulting to zero!'); }

               // LOAD DEV BUILD
               dispatch({
                  type: 'load',
                  payload: build
               })

               // SET LOADED PROFILE TO 'DEV'
               dispatch({
                  type: 'loaded',
                  payload: 'dev'
               })

            // OTHERWISE, LOAD RANDOM ROUTE
            } else {
               dispatch({
                  type: 'load',
                  payload: random()
               })
            }

            // IRREGARDLESS, SET PROFILES
            dispatch({
               type: 'set_profiles',
               payload: profiles
            })

            // FINALLY, HIDE PROMPT
            dispatch({type: 'hide-prompt' })
         })
      })
   }, [])

   return null;
}

export default Init;