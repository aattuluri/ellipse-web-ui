import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileEventCard from '../Components/ProfileEventCard';
import EventsDialog from '../Components/EventsDialog';
import AuthContext from '../AuthContext';
import EventsContext from '../EventsContext';

// const useStyles = makeStyles((theme) => ({
//     // backdrop: {
//     //     // zIndex: theme.zIndex.drawer + 1,
//     //     color: '#fff',
//     // },
//     icons: {
//         position: 'absolute',
//         right: theme.spacing(1),
//         top: theme.spacing(1),
//     }
// }));

function ProfilePostsTabPanel(props) {
    const { children, value, url, index, ...other } = props;
    const [open, setOpen] = React.useState(false);
    // const [allEvents, setAllEvents] = React.useState([]);
    const user = React.useContext(AuthContext);
    // const token = localStorage.getItem('token');
    const allEvents = React.useContext(EventsContext);
    
    const postedEvents = allEvents.filter((val)=>{
        return val.user_id === user.user_id;
    });

    const [selectedEvent,setSellectedEvent] = React.useState("");
    function handleViewClick(event){
        setSellectedEvent(event);
        // setOpen(true);
    } 

    function handleClose(){
        setOpen(false);
    }

    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div >
                <Grid container component="main" alignItems="center" spacing={1}>
                {postedEvents.map((event,index) => {
                    return(<Grid item xs={12} sm={12} md={4} key={index}>
                    <ProfileEventCard event={event} handleViewClick={handleViewClick} name={event.name} image={url}></ProfileEventCard>
                    </Grid>) 
                })}
                <EventsDialog
                    open={open}
                    event={selectedEvent}
                    handleClose={handleClose}
                    name={selectedEvent.name}
                    startTime={selectedEvent.start_time}
                    endTime={selectedEvent.finish_time}
                    regEndTime={selectedEvent.registrationEndTime}
                    type={selectedEvent.eventType}
                    tags={selectedEvent.tags}
                    mode={selectedEvent.eventMode}
                    feeType={selectedEvent.feesType}
                    url={user.imageUrl}>
                    {/* imageDialog={handleImageDialogOpen} */}
                </EventsDialog>
                    {/* <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    <ProfileEventCard image={url}></ProfileEventCard>
                    </Grid> */}
                </Grid>
                
                {/* <ProfileEventCard></ProfileEventCard> */}
                </div>
            )}
        </div>
    );
}

export default ProfilePostsTabPanel;
