import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";
import { jump } from "../../../funcs/browsing";

function Progress() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      progress: 0,
   })

   // RECALIBRATE LEVEL VALUES
   useEffect(() => {

      // FIND PERCENTAGE
      const current_progress = ((state.current / (state.data.route.length - 1)) * 100).toFixed(2) + '%';

      set_local({
         progress: current_progress,
         width: {
            width: current_progress
         }
      })
   }, [state.current, state.data])

   return (
      <div id="progress" onClick={(event) => { jump(event, state, dispatch) }}>
         <div className="split">
            <div>Progress</div>
            <div>{ local.progress }</div>
            <div id="bar" style={ local.width }></div>
         </div>
      </div>
   )
}

export default Progress;