import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../context";
import Line from './line';
import Waypoint from './waypoint';

function Markers() {

   // GLOBAL STATE
   const { state } = useContext(Context);
   
   // LOCAL STATE
   const [local, set_local] = useState({
      content: null
   });

   // CHANGE LINE COLOR FOR THE FOLLOWING ZONES
   const whitelist = new Set([
      'barrens',
      'stonetalon',
      'orgrimmar',
      'azshara',
      'badlands',
      'blasted',
      'darnassus',
      'durotar',
      'ironforge',
      'needles',
      'redridge',
      'stormwind',
      'tanaris',
      'westfall',
   ])

   // GENERATE MAP MARKERS
   useEffect(() => {
      const waypoints = state.data.route[state.current].waypoints;
      const offcolor = whitelist.has(state.data.route[state.current].zone);

      set_local({
         content: waypoints.map((waypoint, index) =>
            <React.Fragment key={ index }>
               <Line
                  current={ waypoint }
                  next={ waypoints[index + 1] }
                  offcolor={ offcolor }
               />
               <Waypoint
                  waypoint={ waypoint }
                  block={ index } 
               />
            </React.Fragment>
         )
      })

   }, [state.current, state.data])

   return local.content;
}

export default Markers;