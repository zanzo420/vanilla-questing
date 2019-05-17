import React from 'react';
import { shorten } from '../../../funcs/misc';

function Objective({ index, quests, waypoint }) {

   // GENERATE CONTENT
   function content() {
      const types = ['ends', 'completed', 'starts', 'objectives', 'special'];
      let content = [];

      // PROCESS EACH TYPE & RECALIBRATE STATE
      types.forEach(type => {
         if (waypoint[type] !== undefined) {
            content.push(process({
               data: waypoint[type],
               type: type,
            }))
         }
      });

      return content;
   }

   // PROCESS CONTENT
   function process({ data, type }) {
      return data.map((header, index) =>
         <div key={ index } className={ type }>
            { row(header, type) }
         </div>
      );
   }
   
   // GENERATE APPROPRIATE ROW
   const row = (header, type) => {

      // SPECIALS
      if (type === 'special') {
         return <div>{ header }</div>
   
      // ARRAYS
      } else if (header instanceof Array) {
         return <Multi
            header={ header[0] }
            tag={ header[1] }
            quests={ quests }
         />
   
      // DEFAULTS
      } else {
         return <Single
            header={ header }
            quests={ quests }
         />
      }
   }

   return (
      <div className="section">
         <div className="title">
            <div>{ index + 1 }. { waypoint.header }</div>
            <div>{ waypoint.coords.x + '.' + waypoint.coords.y }</div>
         </div>
         { content() }
      </div>
   )
}

// DEFAULT BLOCK
function Single({ quests, header }) {
   
   if (quests[header.toString().toLowerCase()] === undefined) {
      console.log(header);
   }

   return (
   <div>
      <a href={ 'https://classicdb.ch/?quest=' + quests[header.toString().toLowerCase()] } target='_blank' rel='noopener noreferrer'>{ shorten(header) }</a>
   </div>
)}

// MULTI HEADER BLOCK
function Multi({ quests, header, tag }) {
   
   if (quests[header.toString().toLowerCase()] === undefined) {
      console.log(header);
   }
   
   return (
   <div className="split">
      <div><a href={ 'https://classicdb.ch/?quest=' + quests[header.toString().toLowerCase()] } target='_blank' rel='noopener noreferrer'>{ shorten(header) }</a></div>
      <div>{ tag }</div>
   </div>
)}

export default Objective;