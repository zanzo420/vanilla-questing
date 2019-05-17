import React from 'react';

function Line({ current, next }) {

   // IF THERE IS A PREDICESSOR
   if (next !== undefined) {
      return <line
         x1={ current.coords.x + '%' }
         y1={ current.coords.y + '%' }
         x2={ next.coords.x + '%' }
         y2={ next.coords.y + '%' }
      />

   // OTHERWISE, RETURN NULL
   } else { return null; }
}

export default Line;