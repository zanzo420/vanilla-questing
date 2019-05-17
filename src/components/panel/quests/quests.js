import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";
import { filter } from "../../../funcs/quests";

import Quest from './quest';

function Quests({ visible }) {

   // FETCH STATE
   const { state } = useContext(Context);

   const [local, set_local] = useState({
      visibility: null,
      content: []
   })

   // TOGGLE VISIBILITY
   useEffect(() => {
      set_local({
         ...local,
         visibility: {
            display: visible ? 'block' : 'none'
         }
      })
   }, [visible])

   // RENDER QUESTLOG CONTENT
   useEffect(() => {
      const quests = filter(state);

      set_local({
         ...local,
         content: quests.map((quest, index) => 
            <Quest
               key={ index }
               quest={ quest }
               quests={ state.data.quests }
            />
         )
      })
   }, [state.current, state.data])

   return (
      <div id="quests" style={ local.visibility }>
         <div className="section">
            <div className="title">
               <div>Current Quests</div>
               <div>{ local.content.length } / 20</div>
            </div>
            { local.content }
         </div>
      </div>
   )
}

export default Quests;