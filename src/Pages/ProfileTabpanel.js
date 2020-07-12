import React from 'react';
import ProfileCard from '../Components/MainProfileCard';
import { Grid } from '@material-ui/core';
import UpdateProfileDialog from '../Components/UpdateProfileDialog';


function EventsTabPanel(props) {
    // const { children, value, url, index, ...other } = props;
    const [open, setOpen] = React.useState(false);
    function handleEditButton(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }
    return (
        <div
            // role="tabpanel"
            // hidden={value !== index}
            // {...other}
            >
            {/* {value === index && ( */}
                <div>
                <Grid container component="main" spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={2} >
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={8}>
                <ProfileCard handleEditButton={handleEditButton}></ProfileCard>
                <UpdateProfileDialog open={open} handleClose={handleClose}></UpdateProfileDialog>
                </Grid>
                </Grid>
                
                
                </div>
                
            {/* )} */}
        </div>
    );
}

export default EventsTabPanel;