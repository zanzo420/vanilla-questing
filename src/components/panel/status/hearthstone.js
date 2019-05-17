import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";

function Hearthstone() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      location: null
   })

   // FIND LATEST HEARTHSTONE LOCATION
   useEffect(() => {

      // FILTER OUT FUTURE HEARTHSTONE LOCATIONS
      const filtered = state.data.hearthstones.filter(id => id.block < state.current);
      let value;

      if (filtered.length === 0) {
         value = 'none';
      } else {
         value = filtered[filtered.length - 1].zone;
      }

      set_local({
         location: value
      })

   }, [state.current, state.data])

   return (
      <div id="hearthstone" className="split">
         <div>Hearthstone</div>
         <div>{ local.location }</div>
      </div>
   )
}

export default Hearthstone;