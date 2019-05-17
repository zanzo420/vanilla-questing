import React, { useContext } from 'react';
import { Context } from "../context";
import axios from 'axios';

import '../interface/css/menu.scss';

import Main from './menu/main';
import Sub from './menu/sub';
import Profiles from './menu/profiles';

function Menu() {

   // GLOBAL CONTEXT
   const { dispatch } = useContext(Context);

   // PRELOAD BACKGROUNDS
   const preload = () => {
      console.log('Started Preload!');

      // SHOW PROMPT
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // ALL THE ZONES
      const zones = [
         'alterac',
         'arathi',
         'ashenvale',
         'azshara',
         'badlands',
         'barrens',
         'blasted',
         'darkshore',
         'darnassus',
         'deadwind',
         'desolace',
         'durotar',
         'duskwood',
         'dustwallow',
         'elwynn',
         'epl',
         'felwood',
         'feralas',
         'hillsbrad',
         'hinterlands',
         'ironforge',
         'loch',
         'moonglade',
         'morogh',
         'mulgore',
         'needles',
         'orgrimmar',
         'redridge',
         'searing',
         'silverpine',
         'steppes',
         'stonetalon',
         'stormwind',
         'stv',
         'swamp',
         'tanaris',
         'teldrassil',
         'thunderbluff',
         'tirisfal',
         'undercity',
         'ungoro',
         'westfall',
         'wetlands',
         'winterspring',
         'wpl'
      ];

      // PROMISE CONTAINER
      let promises = [];

      // GENERATE & PUSH A PROMISE FOR EACH ZONE
      zones.forEach(zone => {

         // GENERATE A PROMISE
         var p = new Promise((resolve, reject) => {
            axios.get(
               require('../interface/images/maps/' + zone + '.png')
            ).then(() => { resolve(); });
         });

         // PUSH IT TO THE CONTAINER
         promises.push(p);
      });

      // WAIT FOR EVERYTHING TO RESOLVE
      Promise.all(promises).then(() => {

         // LOG SUCCESS & HIDE PROMPT
         console.log('Preload Complete!');
         dispatch({ type: 'hide-prompt' })
      });
   }

   // IMPORT CUSTOM ROUTE
   const custom = () => {
      dispatch({
         type: 'show-prompt',
         payload: 'import'
      })
   }

   // CREATE PROFILE
   const create = (race) => {
      dispatch({
         type: 'selected_race',
         payload: race
      })
      dispatch({
         type: 'show-prompt',
         payload: 'create'
      })
   }

   // REFERENCES PROMPT
   const references = () => {
      dispatch({
         type: 'show-prompt',
         payload: 'references'
      })
   }

   return (
      <div id="menu"><div className="inner">
         <div>
            <Main header='Route' link='/' />
            <Main header='Manifesto' link='/manifesto' />
            <Main header='Help'>
               <Sub header='References' icon='references' func={ references } />
               <Sub header='Report issues' icon='report' link='/manifesto#contribute' />
               <Sub header='Donate' icon='donate' link='/manifesto#contribute' />
            </Main>
         </div>
         <div>
            <Main header='Actions'>
               <Sub header='Preload Backgrounds' icon='preload' func={ preload } />
               <Sub header='Import Custom Route' icon='import' func={ custom } />
            </Main>
            <Main header='Load Progress'>
               <Profiles />
            </Main>
            <Main header='New Character'>
               <Sub header='Human' icon='human' func={() => { create('human') }} />
               <Sub header='Dwarf' icon='dwarf' func={() => { create('dwarf') }} />
               <Sub header='Gnome' icon='gnome' func={() => { create('gnome') }} />
               <Sub header='Night elf' icon='nelf' func={() => { create('nelf') }} />
               <Sub header='Orc' icon='orc' func={() => { create('orc') }} />
               <Sub header='Troll' icon='troll' func={() => { create('troll') }} />
               <Sub header='Tauren' icon='tauren' func={() => { create('tauren') }} />
               <Sub header='Undead' icon='undead' func={() => { create('undead') }} />
            </Main>
         </div>
      </div></div>
   )
}

export default Menu;