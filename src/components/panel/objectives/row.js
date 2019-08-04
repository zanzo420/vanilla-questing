import React, { useContext, Fragment } from 'react';
import { Context } from "../../../context";

import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';
import { database } from '../../../funcs/settings';

import Single from '../single';
import Split from '../split';

function Row({ data, type }) {
   return data.map((quest, index) =>
      <Fragment key={ index }>
         <span className={ type + '-icon' } />
         <div className={ type + '-row' }>
            <Name
               data={ quest }
               type={ type }
            />
         </div>
      </Fragment>
   )
}

// QUEST NAME SELECTOR
function Name({ data, type }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // NON SPECIALS
   if (type !== 'special') {

      // FETCH URL TO PREFERRED DATABASE
      const url = database(state);

      // DETERMINE CONTAINER
      switch(typeof data) {

         // ARRAY
         case 'object': { return (
            <Split
               header={ shorten(data[0]) }
               tag={ data[1] }
               url={ url }
               id={ fetch_id(data, state.data.quests) }
            />
         )}
   
         // STRING
         default: { return (
            <Single
               header={ shorten(data) }
               url={ url }
               id={ fetch_id(data, state.data.quests) }
            />
         )}
      }

   // SPECIALS
   } else {
      switch(typeof data) {

         // ARRAY
         case 'object': { return (
            <Single
               header={ data[0] }
               url={ data[1] }
            />
         )}

         // STRING
         default: {
            return <div>{ data }</div>
         }
      }
   }
}

export default Row;