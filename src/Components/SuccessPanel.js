import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        // height: '300px'
    },
    hidden: {
        display: 'none'
      }
}));

function SuccessPanel(props) {
    // const user = React.useContext(AuthContext);
    const classes = useStyles();

    return (
        <div className={props.showSuccessPanel === false && classes.hidden}>
        <VerifiedUserIcon fontSize="large"></VerifiedUserIcon>
            {props.type === "eventSuccess" && <div className={classes.root}>
            
                <Typography variant="h5">Your Event was added successfully</Typography> 
                <ul>
                    <li><Typography>Visit your posted events in Profile page</Typography></li>
                    <li><Typography >Post announcements in dashboard, chat with users, add Moderators and see registered participants data</Typography> </li>
                </ul>
                
                
            </div>}
            {props.type === "registrationSuccess" && <div className={classes.root}>
                <Typography>Thanks for registering to the event</Typography>
                <ul>
                    <li><Typography>Stay tuned with announcements and notifications</Typography></li>
                    <li><Typography >Form Teams in Participation tab</Typography> </li>
                    <li><Typography >Send your queries in event chat</Typography> </li>
                </ul>  
                <Button variant="outlined" onClick={props.handleHomeScreenButton}>Home Screen</Button>
                <Button variant="outlined" style={{marginLeft:"5px"}} onClick={props.handleEventScreenButton}>Event Screen</Button>
            </div>}
        </div>
    );
}

export default SuccessPanel;
