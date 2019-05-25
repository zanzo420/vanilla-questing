import React from 'react';
import { _export } from '../../funcs/storage';

function Export() { return (
   <>
      <div id={ 'header' }>Export Profiles</div>
      <div id={ 'export' }>
         <textarea
            value={ _export() }
            readOnly
         />
      </div>
   </>
)}

export default Export;