import React from 'react';
// import EventCard from '../Components/EventCard';
// import { Typography } from '@material-ui/core';
import ProfileCard from '../Components/MainProfileCard';


function EventsTabPanel(props) {
    const { children, value, url, index, ...other } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                {/* <Typography>Profile Page</Typography> */}
                <ProfileCard></ProfileCard>
                </div>
                
            )}
        </div>
    );
}

export default EventsTabPanel;