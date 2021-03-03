import React from 'react';
 
const WebSocketDataContext = React.createContext({
    eventChatMessages: null,
    setEventChatMessages: ()=>{},
    teamChatMessages: [],
    setTeamChatMessages: ()=>{},
    teamUpdateStatus: [],
    setTeamUpdateStatus: ()=>{},
    deletedEventChatMessages: [],
    setDeletedEventChatMessages: ()=>{},
    deletedTeamChatMessages: [],
    setDeletedTeamChatMessages: ()=>{}

});
 
export default WebSocketDataContext;