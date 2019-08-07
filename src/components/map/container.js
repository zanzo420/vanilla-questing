import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { values, reducer } from '../../reducers/map';
import { Context } from "../../context";
import { autocenter, update_position } from "../../funcs/map";

import Line from './line';
import Waypoint from './waypoint';
import Circle from './circle';

function Container({ resolution }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, values)

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
      set_local({
         type: 'background',
         payload: state.data.route[state.current].zone
      })
   }, [state.data.route[state.current].zone])

   // UPDATE MARKERS
   useEffect(() => {

      // FETCH WAYPOINTS & CHECK IF LINE NEEDS TO BE OFFCOLOUR
      const waypoints = state.data.route[state.current].waypoints;
      const offcolor = whitelist.has(state.data.route[state.current].zone);

      // SET MARKERS
      set_local({
         type: 'markers',
         payload: waypoints.map((waypoint, index) =>
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
               <Circle
                  waypoint={ waypoint }
                  block={ index }
                  offcolor={ offcolor }
               />
            </Fragment>
         )
      })

   }, [state.data.route[state.current].waypoints])

   // UPDATE POSITION
   useEffect(() => {
      if (resolution !== null) {
         
         // FIND CENTER COORDINATES
         const position = autocenter({
            waypoints: state.data.route[state.current].waypoints,
            resolution: resolution
         })

         // SET POSITION PARAMS
         set_local({
            type: 'position',
            payload: {
               coords: {
                  left: position.x + 'px',
                  top: position.y + 'px',
               },
               position: position
            }
         })

      }
   }, [resolution, state.data.route[state.current].waypoints])

   // ENABLE MOVEMENT
   function enable(event) {
      set_local({
         type: 'enable-movement',
         payload: event
      })
   }

   // DISABLE MOVEMENT
   function disable() {
      set_local({
         type: 'disable-movement',
      })
   }

   // MOVE MAP POSITION
   function move(event) {
      event.persist();

      if (local.movement.enabled) {

         // FIND NEW POSITION
         const position = update_position({
            event: event,
            last_event: local.movement.last_event,
            last_position: local.movement.last_position,
            resolution: resolution
         })

         // SET MOVEMENT
         set_local({
            type: 'move',
            payload: {
               coords: {
                  left: position.x + 'px',
                  top: position.y + 'px',
               },
               position: position,
               event: event
            }
         })
      }
   }

   return (
      <svg
         id={ 'map' }
         style={{
            ...local.background,
            ...local.position,
            ...local.transition
         }}
         onMouseDown={ enable }
         onMouseUp={ disable }
         onMouseLeave={ disable }
         onMouseMove={ move }
      >{ local.markers }</svg>
   )
}

export default Container;