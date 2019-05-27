import React, { useState, useContext } from 'react';
import { Context } from "../../context";
import { custom } from '../../funcs/build';

function ImportRoute() {

   // GLOBAL CONTEXT
   const { dispatch } = useContext(Context);

   // PICKED FACTION STATE
   const [local, set_local] = useState({
      alliance: true,
      horde: false
   })

   const toggle = (target) => {
      if (!target) {
         set_local({
            alliance: !local.alliance,
            horde: !local.horde,
         })
      }
   }

   // PARSE SELECTED FILE
   const parse_file = (event) => {

      // FIND THE FILE
      var content = event.target.files[0];

      // CHECK THAT A PROPER FILE WAS SELECTED
      if (content !== undefined && content.type === 'application/json') {

         // FETCH THE READER
         var reader = new FileReader();

         // GENERATE A FETCHABLE URL
         reader.onload = () => {

            // GENERATE CUSTOM BUILD
            custom({
               file: reader.result,
               faction: local.alliance ? 'alliance' : 'horde'
            }).then(response => {

               // SET BUILD
               dispatch({
                  type: 'load',
                  payload: response
               })

               // SET LOADED PROFILE TO NULL
               dispatch({
                  type: 'loaded',
                  payload: null
               })

               // HIDE PROMPT
               dispatch({ type: 'hide-prompt' });
            })
         };

         // TRIGGER THE READER
         reader.readAsDataURL(content);

      // OTHERWISE, LOG ERROR
      } else { console.log('Bad file-type!'); }
   }

   // TOGGLE FACTION
   const picker = (faction) => {
      if (faction) { return 'selected'; }
   }

   return (
      <>
         <div id={ 'header' }>Import Route</div>
         <div id={ 'import' }>
            <div id={ 'factions' }>
               <div className={ 'tab' } id={ picker(local.alliance) } onClick={() => { toggle(local.alliance) }}>Alliance</div>
               <div className={ 'tab' } id={ picker(local.horde) } onClick={() => { toggle(local.horde) }}>Horde</div>
            </div>
            <div id={ 'container' }>
               <input
                  id={ 'route' }
                  type={ 'file' }
                  onChange={ parse_file }
               />
               <div id={ 'label' }>Select or Drop a route File</div>
            </div>
         </div>
      </>
   )
}

export default ImportRoute;