import React from 'react';
import ProfileCard from '../Components/MainProfileCard';
import { Grid } from '@material-ui/core';


function EventsTabPanel(props) {
    const { children, value, url, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {/* {value === index && ( */}
                <div>
                <Grid container component="main">
                <Grid item xs={12} sm={12} md={3} lg={2} spacing={2}>

                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={8} spacing={2}>
                <ProfileCard></ProfileCard>
                </Grid>
                </Grid>
                
                
                </div>
                
            {/* )} */}
        </div>
    );
}

export default EventsTabPanel;