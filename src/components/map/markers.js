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

   // GENERATE MAP MARKERS
   useEffect(() => {
      const waypoints = state.data.route[state.current].waypoints;

      set_local({
         content: waypoints.map((waypoint, index) =>
            <React.Fragment key={ index }>
               <Line
                  current={ waypoint }
                  next={ waypoints[index + 1] }
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