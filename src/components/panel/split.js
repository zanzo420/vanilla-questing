import React from 'react';

function Split({ header, url, id, tag }) { return (
   <div className="split">
      <div><a href={ url + id } data-wowhead={ 'quest=' + id + '?domain=classic' } target={ '_blank' } rel='noopener noreferrer'>{ header }</a></div>
      <div>{ tag }</div>
   </div>
)}

export default Split;