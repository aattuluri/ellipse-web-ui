import React from 'react';
 
const EventsContext = React.createContext({
    allEvents: null,
    setAllEvents: ()=>{}
});
 
export default EventsContext;