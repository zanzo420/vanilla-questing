import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Context } from "../../context";

import { autocenter } from "../../funcs/map";

import Line from './line';
import Waypoint from './waypoint';

function Container({ resolution }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL BACKGROUND, POSITION & MARKER STATES
   const [background, set_background] = useState({})
   const [position, set_position] = useState({})
   const [markers, set_markers] = useState([])

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
      'thunderbluff'
   ])

   // UPDATE BACKGROUND
   useEffect(() => {

      // ASYNC LOAD BACKGROUND IN
      const image = require('../../interface/images/maps/' + state.data.route[state.current].zone + '.jpg');

      // UPDATE STATE
      set_background({
         background: 'url(' + image + ')'
      })

   }, [state.data.route[state.current].zone])

   // UPDATE MARKERS
   useEffect(() => {

      // FETCH WAYPOINTS & CHECK IF LINE NEEDS TO BE OFFCOLOUR
      const waypoints = state.data.route[state.current].waypoints;
      const offcolor = whitelist.has(state.data.route[state.current].zone);

      // GENERATE MARKERS
      const markers = waypoints.map((waypoint, index) =>
         <Fragment key={ index }>
            <Line
               current={ waypoint }
               next={ waypoints[index + 1] }
               offcolor={ offcolor }
            />
            <Waypoint
               waypoint={ waypoint }
               block={ index } 
            />
         </Fragment>
      )

      // UPDATE STATE
      set_markers(markers)

   }, [state.data.route[state.current].waypoints])

   // UPDATE POSITION
   useEffect(() => {
      if (resolution !== null) {
         
         // FIND CENTER COORDINATES
         const position = autocenter({
            waypoints: state.data.route[state.current].waypoints,
            resolution: resolution
         })

         // UPDATE POSITION STATE
         set_position({
            left: position.x + 'px',
            top: position.y + 'px',
         })

      }
   }, [resolution, state.data.route[state.current].waypoints])

   return (
      <svg id={ 'map' } style={{ ...background, ...position }}>
         { markers }
      </svg>
   )
}

export default Container;