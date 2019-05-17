import React, { useState, useContext } from 'react';
import { Context } from "../../context";
import { specific } from '../../funcs/build';

function Create() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: '',
      button: 'bad',
      errors: []
   })

   // AUDIT NAME -- FORCE LOWERCASE
   const audit = (event) => {
      const input = event.target.value.toLowerCase();

      // ERRORS ARRAY
      let errors = [];

      // SOMETHING IS TYPED
      if (input.length !== 0) {
         
         // CHECK LENGTH
         if (input.length >= 3 && input.length <= 12) {

            // CHECK EXISTENCE
            if (!state.profiles.has(input)) {
               
               // IF NO ERRORS ARE FOUND, SAVE NAME TO STATE & CHANGE BUTTON COLOR
               set_local({
                  name: input,
                  button: 'good',
                  errors: []
               })

            } else { errors.push('Name already exists!') }
         } else { errors.push('3-12 characters!') }
      } else { errors.push('Profile must have a name!') }

      // IF ERRORS WERE FOUND, SHOW THEM & TURN BUTTON RED
      if (errors.length !== 0) {
         set_local({
            ...local,
            button: 'bad',
            errors: errors
         })
      }
   }

   // WHEN SUBMIT BUTTON IS PRESSED & NO ERRORS HAVE OCCURRED
   const submit = () => {
      if (local.button === 'good') {
         
         // GENERATE DETAILS
         const details = {
            icon: state.selected_race,
            block: 0
         }

         // ADD PROFILE TO HASHMAP
         state.profiles.set(local.name, details);

         // GENERATE BUILD
         specific(details).then((response) => {

            // SET BUILD
            dispatch({
               type: 'load',
               payload: response
            })

            // SET 'LOADED' PROFILE
            dispatch({
               type: 'loaded',
               payload: local.name
            })

            // UPDATE STORAGE
            dispatch({
               type: 'update_profiles',
               payload: state.profiles
            });

            // HIDE PROMPT
            dispatch({ type: 'hide-prompt' });
         })
      }
   }

   return (
      <>
         <div id={ 'header' }>Create Profile</div>
         <div id={ 'create' }>
            <input
               autoFocus
               id={ 'content' }
               type={ 'text' }
               placeholder={ 'Enter Profile Name' }
               onChange={ audit }
            />
            <input
               id={ local.button }
               type={ 'submit' }
               value={ 'Create' }
               onClick={ submit }
            />
         </div>
         <div id={ 'errors' }>
            <Errors data={ local.errors } />
         </div>
      </>
   )
}

// ERROR FRAME CONTENT
function Errors({ data }) {
   if (data.length !== 0) {
      return <span id={ 'row' }>{ data[0] }</span>
   } else {
      return null;
   }
}

export default Create;