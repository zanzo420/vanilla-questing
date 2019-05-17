import React, { useState, useEffect } from 'react';

function Table({ data }) {

   // LOCAL STATE
   const [local, set_local] = useState({
      content: null
   })

   // GENERATE CONTENT ON LOAD
   useEffect(() => {
      set_local({
         content: data.map((row, index) =>
            <div className='split' key={ index }>
               <div>{ row[0] }:</div>
               <div>{ row[1] }</div>
            </div>
         )
      })
   }, [])

   return (
      <div id="container">
         { local.content }
      </div>
   )
}

export default Table;