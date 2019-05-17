import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";
import Objective from './objective';

function Objectives({ visible }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      visibility: {
         display: 'block'
      },
      content: null
   });

   // TOGGLE VISIBILITY
   useEffect(() => {
      set_local({
         ...local,
         visibility: {
            display: visible ? 'block' : 'none'
         }
      })
   }, [visible])

   // RENDER OBJECTIVES
   useEffect(() => {
      set_local({
         ...local,
         content: state.data.route[state.current].waypoints.map((waypoint, index) =>
            <Objective
               key={ index }
               index={ index }
               waypoint={ waypoint }
               quests={ state.data.quests }
            />
         )
      })
   }, [state.current, state.data])

   return (
      <div id="objectives" style={ local.visibility }>
         { local.content }
      </div>
   )
}

export default Objectives;