import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventsDialog from '../Components/EventsDialog';
import EventsContext from '../EventsContext';
import AuthContext from '../AuthContext';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfileEventCard from '../Components/ProfileEventCard';

const useStyles = makeStyles((theme) => ({
    root: {
        // height: '300px'
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    },
    root2: {
        marginTop: theme.spacing(3)
    },
    accordion: {
        backgroundColor: theme.palette.primary.light,      
    }
}));

function CalenderPanel(props) {
    localStorage.setItem('tabIndex',2)
    // const { children, value, url, index, ...other } = props;
    const user = React.useContext(AuthContext);
    // const token = localStorage.getItem('token');
    const classes = useStyles();
    // const [allEvents, setAllEvents] = React.useState([]);
    // const [regEvents, setRegEvents] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    // const [image, setImage] = React.useState(null);
    const allEvents = React.useContext(EventsContext);
    const regEvents = allEvents.filter((val) => {
        return val.registered === true;
    });

    const postedEvents = allEvents.filter((val)=>{
        return val.user_id === user.user_id;
    });

    const handleClose = () => {
        setOpen(false);
    };


    const handleEventClick = info => () => {
        // setSelectedEvent(JSON.parse(info.event.id))
        // setOpen(true);
        setSelectedEvent(info);
    }
    return (
        <div>
            <div className={classes.root}>
                <Grid container component="main" spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={2} >
                        {/* <Typography index={0}>Filters</Typography> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} >
                        <div className={classes.root2}>
                            <Accordion defaultExpanded className={classes.accordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography className={classes.heading}>Registered Events</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Grid container component="main" spacing={2}>
                                    {regEvents.map((event, index) => {
                                        return (<Grid item xs={12} sm={12} md={4} key={index}>
                                            <ProfileEventCard event={event} handleViewClick={handleEventClick(event)} name={event.name} ></ProfileEventCard>
                                        </Grid>)
                                    })}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded className={classes.accordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography className={classes.heading}>Posted Events</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Grid container component="main" spacing={2}>
                                    {postedEvents.map((event, index) => {
                                        return (<Grid item xs={12} sm={12} md={4} key={index}>
                                            <ProfileEventCard event={event} handleViewClick={handleEventClick(event)} name={event.name} ></ProfileEventCard>
                                        </Grid>)
                                    })}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2}>

                    </Grid>
                </Grid>
                <div>
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
                    ></EventsDialog>
                </div>
            </div>
        </div>
    );
}

export default CalenderPanel;
