import React from 'react';

function Secondary({ id, header, children }) { return (
   <>
      <div className={ 'subheader' } id={ id }>
         { header }
      </div>
      <div className={ 'subcontent' }>
         { children }
      </div>
   </>
)}

export default Secondary;