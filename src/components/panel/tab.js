import React, { useState, useEffect } from 'react';

function Tab({ selected, func, label }) {

   // LOCAL STATE
   const [local, set_local] = useState({
      style: null
   });

   // TOGGLE SELECTED TAB
   useEffect(() => {
      set_local({
         style: selected ? 'current' : null
      })
   }, [selected])

   return (
      <div id="objectives" onClick={ func } className={ local.style }>
         { label }
      </div>
   )
}

export default Tab;