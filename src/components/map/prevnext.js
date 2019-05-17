import React, { useState, useEffect } from 'react';

function PrevNext({ visibility, type, func }) {
   const [local, set_local] = useState({
      style: {
         opacity: 0
      }
   })

   // TOGGLE VISIBILITY
   useEffect(() => {
      set_local({
         style: {
            opacity: visibility ? 1 : 0
         }
      })
   }, [visibility])

   return (
      <div
         id={ type }
         style={ local.style }
         onClick={ func }
      />
   )
}

export default PrevNext;