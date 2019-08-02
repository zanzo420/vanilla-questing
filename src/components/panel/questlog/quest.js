import React, { Fragment } from 'react';
import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';

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
   switch(typeof quest) {

      // ARRAYS
      case 'object': { return (
         <Split
            header={ shorten(quest[0]) }
            tag={ quest[1] }
            to={ 'https://classicdb.ch/?quest=' + fetch_id(quest, quests) }
         />
      )}

      // STRINGS
      default: { return (
         <Single
            header={ shorten(quest) }
            to={ 'https://classicdb.ch/?quest=' + fetch_id(quest, quests) }
         />
      )}
   }
}

export default Quest;