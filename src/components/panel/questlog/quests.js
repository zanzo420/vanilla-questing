import React, { useContext, useReducer, useEffect } from 'react';
import { reducer, values } from '../../../states/log';
import { Context } from "../../../context";
import { filter } from "../../../funcs/quests";
import Quest from './quest';

function Quests({ visible }) {

   // GLOBAL & LOCAL STATE
   const { state } = useContext(Context);
   const [ local, set_local ] = useReducer(reducer, values);

   // UPDATE VISIBILITY
   useEffect(() => {
      set_local({
         type: 'visibility',
         payload: visible ? 'block' : 'none'
      })
   }, [visible])

   // UPDATE CONTENT
   useEffect(() => {
      set_local({
         type: 'content',
         payload: filter(state)
      })
   }, [state.data.route[state.current]])

   return (
      <div id={ 'quests' } style={ local.visibility }>
         <div className={ 'section' }>
            <div className={ 'title' }>
               <div>Current Quests</div>
               <div>{ local.content.length } / 20</div>
            </div>
            <Rows data={ local.content } />
         </div>
      </div>
   )
}

function Rows({ data }) {
   return data.map((quest, index) =>
      <Quest
         key={ index }
         quest={ quest }
      />
   )
}

export default Quests;