import React from 'react';
import Row from './row';

function Quests({ data }) {

   // SELECTOR CONTAINER & ROW TYPES
   const types = ['ends', 'completed', 'starts', 'objectives', 'special']
   const container = [];

   // LOOP THROUGH EACH TYPE
   types.forEach(type => {
      if (data[type] !== undefined) {
         container.push(
            <Row
               type={ type }
               data={ data[type] }
               key={ container.length }
            />
         )
      }
   });
   
   return container;
}

export default Quests;