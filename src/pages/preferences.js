import React, { useState } from 'react';
import EventListener from 'react-event-listener';
import '../interface/css/preferences.scss';

function Preferences() { return (
   <div id={ 'preferences' }>
      <div className={ 'header' }>General</div>
      <Swapper
         header={ 'database' }
         first={ 'classicDB' }
         second={ 'wowhead' }
      />
      <Swapper
         header={ 'keybindings' }
         first={ 'enable' }
         second={ 'disable' }
      />
      <div className={ 'header' }>Keybindings</div>
      <Keybind
         header={ 'close prompts' }
         bind={ 'escape' }
      />
      <Keybind
         header={ 'open references' }
         bind={ 'q' }
      />
      <Keybind
         header={ 'browse backward' }
         bind={ 'a' }
      />
      <Keybind
         header={ 'browse forward' }
         bind={ 'd' }
      />
   </div>
)}

function Swapper({ header, first, second }) {

   // LOCAL STATE
   const [local, set_local] = useState({
      selected: true
   })

   // SWAP SELECTED OPTION
   const swap = () => {
      set_local({
         selected: !local.selected
      })
   }

   return (
      <div className={ 'option' }>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'swapper' }>
            <div id={ local.selected ? 'current' : null } onClick={ swap }>{ first }</div>
            <div id={ local.selected ? null : 'current' } onClick={ swap }>{ second }</div>
         </div>
      </div>
   )
}

function Keybind({ header, bind }) {

   const [local, set_local] = useState({
      key: bind,
      listener: false
   })

   const update = () => {
      set_local({
         ...local,
         listener: !local.listener
      })
   }

   const listener = (event) => {
      event.preventDefault();

      set_local({
         key: event.code,
         listener: false
      })
   }

   return (
      <div>
         <div className={ 'keybind' } onClick={ update }>
            <div id={ 'header' }>{ header }</div>
            <div id={ local.listener ? 'current' : 'bind' }>{ local.key }</div>
         </div>
         { local.listener ? (
            <EventListener
               target={ document }
               onKeyDown={ listener }
            />
         ) : null }
      </div>
   )
}

export default Preferences;