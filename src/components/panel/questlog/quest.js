import React, { useContext, Fragment } from 'react';
import { Context } from '../../../context';

import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';
import { database } from '../../../funcs/settings';

import Single from '../single';
import Split from '../split';

function Quest({ quest, quests }) { return (
   <Fragment>
      <span className={ 'starts-icon' } />
      <div className={ 'starts-row' }>
         <Row
            quest={ quest }
            quests={ quests }
         />
      </div>
   </Fragment>
)}

function Row({ quest, quests }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // FETCH URL TO PREFERRED DATABASE
   const url = database(state);

   // DETERMINE CONTAINER
   switch(typeof quest) {

      // ARRAYS
      case 'object': { return (
         <Split
            header={ shorten(quest[0]) }
            tag={ quest[1] }
            url={ url }
            id={ fetch_id(quest, quests) }
         />
      )}

      // STRINGS
      default: { return (
         <Single
            header={ shorten(quest) }
            url={ url }
            id={ fetch_id(quest, quests) }
         />
      )}
   }
}

export default Quest;