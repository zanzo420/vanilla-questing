import React from 'react';

function Primary({ id, header, children }) { return (
   <>
      <div className={ 'header' } id={ id }>{ header }</div>
      <div className={ 'content' }>
         { children }
      </div>
   </>
)}

export default Primary;