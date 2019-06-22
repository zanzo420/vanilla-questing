import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";

function Level() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      level: 0,
      difference: 0,
      width: {}
   })

   // RECALIBRATE LEVEL VALUES
   useEffect(() => {

      // FISH OUT CURRENT LEVEL
      const current_level = state.data.route[state.current].experience.toFixed(2);
      let diff = null;

      // CHECK IF THERE'S A SUCCESSOR BLOCK
      if (state.data.route.length > state.current + 1) {
      
         // FETCH THE NEXT LEVEL AND FIGURE OUT THE DIFFERENCE
         const next_level = state.data.route[state.current + 1].experience.toFixed(2);
         diff = difference(current_level, next_level);
      }

      // SET LOCAL STATE
      set_local({
         level: current_level,
         difference: diff === null ? '0%' : diff,
         width: {
            width: current_level.split('.')[1] + '%'
         }
      })

   }, [state.current, state.data])

   // <div>{ local.level } + { local.difference }</div>

   return (
      <div id="level">
         <div className="split">
            <div>Level</div>
            <div>{ local.level }</div>
            <div id="bar" style={ local.width }></div>
         </div>
      </div>
   )
}

// CALCULATE DIFFERENCE BETWEEN CURRENT & NEXT BLOCK LEVELS
function difference(current, next) {
   const foo = (parseFloat(next) - parseFloat(current)) * 100;
   return foo.toFixed(0) + '%';
}

export default Level;