import React, { useContext, Fragment } from 'react';
import { Context } from '../../../context';

import { extract } from '../../../funcs/quests';
import { resource } from '../../../funcs/settings';

import Single from '../single';
import Split from '../split';

function Quest({ quest }) { return (
   <Fragment>
      <span className={ 'starts-icon' } />
      <div className={ 'starts-row' }>
         <Row quest={ quest } />
      </div>
   </Fragment>
)}

function Row({ quest }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // FETCH QUEST ID & NAME, THEN URL & LOCALIZATION PREFIX
   const { name, id } = extract(quest, state);
   const { url, prefix } = resource(state);

   // DETERMINE CONTAINER
   switch(typeof quest) {

      // ARRAYS
      case 'object': { return (
         <Split
            header={ name }
            tag={ quest[1] }
            url={ url }
            id={ id }
            prefix={ prefix }
         />
      )}

      // STRINGS
      default: { return (
         <Single
            header={ name }
            url={ url }
            id={ id }
            prefix={ prefix }
         />
      )}
   }
}

export default Quest;