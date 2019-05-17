import { useContext, useEffect } from 'react';
import { Context } from "./context";

import { random, dev } from './funcs/build';
import { check, fetch } from './funcs/storage';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // ARE YOU DEVELOPING
   const developing = false;

   // ON INITIAL PAGE LOAD
   useEffect(() => {
      
      // CHECK STORAGE HEALTH
      check().then(() => {
         
         // WHEN DEVELOPING, LOAD DEV ROUTE
         if (developing) {
            dev().then(response => {

               // FETCH PROFILVES & LAST DEV BLOCK
               const profiles = fetch();
               const dev_block = profiles.get('dev').block;

               // IF ITS WITHIN LOADED ROUTES LIMITS
               if (response.data.route.length >= dev_block) {

                  // OVERWRITE CURRENT BLOCK
                  response.current = dev_block
               
               // OTHERWISE, DEFAULT TO ZERO WITH ERROR
               } else { console.log('Block limit exceeded. Defaulting to zero!'); }

               // SET BUILD
               dispatch({
                  type: 'load',
                  payload: response
               })

               // SET LOADED PROFILE TO 'DEV'
               dispatch({
                  type: 'loaded',
                  payload: 'dev'
               })

               // FETCH & SET PROFILES
               dispatch({
                  type: 'set_profiles',
                  payload: profiles
               })
            })

         // OTHERWISE, LOAD RANDOM ROUTE
         } else {
            random().then(response => {

               // SET BUILD
               dispatch({
                  type: 'load',
                  payload: response
               })

               // FETCH & SET PROFILES
               dispatch({
                  type: 'set_profiles',
                  payload: fetch()
               })
            })
         }
      })
   }, [])

   return null;
}

export default Init;