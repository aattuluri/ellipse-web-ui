import React from 'react';
 
const ActiveEventsContext = React.createContext({
    activeEvents: null,
    setActiveEvents: ()=>{},
    contextLoading: false,
    setContextLoading: ()=>{}
});
 
export default ActiveEventsContext;