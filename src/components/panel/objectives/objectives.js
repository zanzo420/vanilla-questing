import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../../context";
import Quests from './quests';

function Objectives({ visible }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      visibility: {
         display: 'block'
      }
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

   return (
      <div id="objectives" style={ local.visibility }>
         { state.data.route[state.current].waypoints.map((data, index) =>
            <div className="section" key={ index }>
               <div className="title">
                  <div>{ index + 1 }. { data.header }</div>
                  <div>{ data.coords.x + '.' + data.coords.y }</div>
               </div>
               <Quests data={ data } />
            </div>
         )}
      </div>
   )
}

export default Objectives;