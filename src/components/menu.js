import React, { useContext } from 'react';
import { Context } from "../context";
import { preload_bgs } from "../funcs/misc";

import '../interface/css/menu.scss';

import Main from './menu/main';
import Sub from './menu/sub';
import Profiles from './menu/profiles';

function Menu() {

   // GLOBAL CONTEXT
   const { dispatch } = useContext(Context);

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

   // PRELOAD BACKGROUNDS
   const preload = () => {
      preload_bgs(dispatch);
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