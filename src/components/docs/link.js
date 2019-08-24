import React from 'react';

function Link({ header, url }) { return (
   <a href={ url } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
)}

export default Link;