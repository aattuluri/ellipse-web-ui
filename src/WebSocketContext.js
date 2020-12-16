import React from 'react';
 
const WebSocketContext = React.createContext({
    webSocketContext: null,
    setWebSocketContext: ()=>{}
});
 
export default WebSocketContext;