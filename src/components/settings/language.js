import React, { useContext, useState } from 'react';
import { Context } from '../../context';

function Language({ header, options }) {

   // STATES
   const { dispatch } = useContext(Context);
   const [ local, set_local ] = useState(options[0])

   // SWAP LANGUAGE
   function swap(item) {
      if (local !== item) {
         set_local(item)
      }
   }

   return (
      <div className={ 'option' }>
         <div id={ 'header' }>{ header }</div>
         <div id={ 'language' }>
            { options.map((item, index) =>
               <div id={ local === item ? 'current' : null } key={ index } onClick={() => { swap(item) }}>
                  { item }
               </div>
            )}
         </div>
      </div>
   )
}

export default Language;