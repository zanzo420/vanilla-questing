import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../context";
import EventListener from 'react-event-listener';
import { next, previous } from "../funcs/browsing";

import { autocenter, update_position, dimensions } from "../funcs/map";

import '../interface/css/map.scss';

import PrevNext from './map/prevnext';
import Markers from './map/markers';

function Map() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // MAP STATE
   const [local, set_local] = useState({
      prevnext: false,
      resolution: null,
      style: null,
      enabled: false,
      last_event: null,
      last_position: null
   });

   // CHANGE RESOLUTION
   const change_resolution = () => {
      set_local({
         ...local,
         resolution: dimensions()
      })
   }

   // SHOW/HIDE PREVNEXT PANELS
   const prevnext = {
      show: () => {
         set_local({
            ...local,
            prevnext: true
         })
      },
      hide: () => {
         set_local({
            ...local,
            prevnext: false
         })
      }
   }

   // MAP MOVEMENT MODES
   const movement = {
      enable: (event) => {
         event.target.parentElement.style.transition = "none";
   
         set_local({
            ...local,
            enabled: true,
            last_event: event
         })
      },
      disable: (event) => {
         if (local.enabled) {
            event.target.parentElement.style.transition = "0.2s";
      
            set_local({
               ...local,
               enabled: false
            })
         }
      },
      moving: (event) => {
         event.persist();
         if (local.enabled) {

            // FIND NEW POSITION
            const position = update_position({
               event: event,
               last_event: local.last_event,
               last_position: local.last_position,
               resolution: local.resolution
            })

            set_local({
               ...local,
               last_event: event,
               last_position: position,
               style: {
                  ...local.style,
                  left: position.x + 'px',
                  top: position.y + 'px',
               }
            })
         }
      }
   }

   // ON INITIAL LOAD
   useEffect(() => {
      change_resolution();
   }, [state.profiles])

   // CHANGE POSITION
   useEffect(() => {
      if (local.resolution !== null) {
         
         // FIND CENTER COORDINATES
         const position = autocenter({
            waypoints: state.data.route[state.current].waypoints,
            resolution: local.resolution
         })

         set_local({
            ...local,
            last_position: position,
            style: {
               backgroundImage: 'url(' + require('../interface/images/maps/' + state.data.route[state.current].zone + '.png') + ')',
               left: position.x + 'px',
               top: position.y + 'px',
            }
         })

      }
   }, [local.resolution, state.current])

   return (
      <div onMouseOver={ prevnext.show } onMouseOut={ prevnext.hide }>
         <EventListener
            target={ 'window' }
            onResize={ change_resolution }
         />
         <svg
            id={ 'map' }
            style={ local.style }
            onMouseDown={ movement.enable }
            onMouseUp={ movement.disable }
            onMouseLeave={ movement.disable }
            onMouseMove={ movement.moving }
         ><Markers /></svg>
         <PrevNext
            type={ 'prev' }
            visibility={ local.prevnext }
            func={() => { previous(state, dispatch) }}
         />
         <PrevNext
            type={ 'next' }
            visibility={ local.prevnext }
            func={() => { next(state, dispatch) }}
         />
      </div>
)}

export default Map;