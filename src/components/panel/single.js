import React from 'react';

function Single({ header, url, id }) {
   switch(id) {

      // PLAIN LINKS
      case undefined: { return (
         <div>
            <a href={ url } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
         </div>
      )}

      // DATABASE LINKS
      default: { return (
         <div>
            <a href={ url + id } data-wowhead={ 'quest=' + id + '?domain=classic' } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
         </div>
      )}
   }
}

export default Single;