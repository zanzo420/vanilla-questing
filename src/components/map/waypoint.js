import React, { useState, useEffect } from 'react';

function Waypoint({ waypoint, block }) {

   // LOCAL STATE
   const [local, set_local] = useState({
      position: {},
      alignment: null,
      number: null,
      space: null
   })

   // GENERATE APPROPARIATE CONTENT
   useEffect(() => {
      set_local({
         position: {
            left: waypoint.coords.x + '%',
            top: waypoint.coords.y + '%'
         },
         alignment: (waypoint.align === undefined) ? 'left' : waypoint.align,
         number: require('../../interface/images/numbers/' + (block + 1) + '.png'),
         space: require('../../interface/images/waypoints/space.png'),
      })
   }, [waypoint, block])

   return (
      <foreignObject width='100%' height='100%'>
         <div className="waypoint" style={ local.position }>
            <img src={ local.space } id={ waypoint.type } alt='' />
            <span id={ local.alignment }>
               <img src={ local.number } alt='' />
            </span>
         </div>
      </foreignObject>
   )
}

export default Waypoint;