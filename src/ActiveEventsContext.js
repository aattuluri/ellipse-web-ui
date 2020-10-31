import React from 'react';
 
const ActiveEventsContext = React.createContext({
    activeEvents: null,
    setActiveEvents: ()=>{}
});
 
export default ActiveEventsContext;