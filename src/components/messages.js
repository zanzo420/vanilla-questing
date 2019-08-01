import React, { useContext } from 'react';
import { Context } from "../context";
import '../interface/css/messages.scss';
import Message from './messages/message';

function Messages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div id={ 'messages' }>
         { state.messages.map((item, index) =>
            <Message
               item={ item }
               id={ index }
               key={ index }
            />
         )}
      </div>
   )
}

export default Messages;