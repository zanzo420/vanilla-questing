import React, { useContext } from 'react';
import { Context } from "../context";
import '../interface/css/settings.scss';

import Swapper from '../components/settings/swapper';
import Keybind from '../components/settings/keybind';
import Language from '../components/settings/language';

function Settings() {
   
   // GLOBAL CONTEXT
   const { state } = useContext(Context);

   return (
      <div id={ 'settings' }>
         <div className={ 'header' }>Change Keybinds</div>
         <div className={ 'container' }>
            <Swapper
               header={ 'keybinds' }
               first={ 'enable' }
               second={ 'disable' }
            />
            <Keybind
               header={ 'close prompts' }
               name={ 'close' }
               bind={ state.settings.binds.close }
            />
            <Keybind
               header={ 'open references' }
               name={ 'references' }
               bind={ state.settings.binds.references }
            />
            <Keybind
               header={ 'browse backward' }
               name={ 'backward' }
               bind={ state.settings.binds.backward }
            />
            <Keybind
               header={ 'browse forward' }
               name={ 'forward' }
               bind={ state.settings.binds.forward }
            />
         </div>
         <div className={ 'header' }>Change Database</div>
         <div className={ 'container' }>
            <Swapper
               header={ 'database' }
               first={ 'classicdb' }
               second={ 'wowhead' }
            />
         </div>
         <div className={ 'header' }>Change Language</div>
         <div className={ 'container' }>
            <Language
               header={ 'Language' }
               options={[
                  'EN',
                  'RU',
                  'GE',
                  'FR',
                  'SP',
                  'KR',
                  'CH'
               ]}
            />
         </div>
      </div>
   )
}

export default Settings;