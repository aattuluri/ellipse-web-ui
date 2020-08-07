import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import '../main.scss'
import EventsDialog from '../Components/EventsDialog';
import EventsContext from '../EventsContext';
// import AuthContext from '../AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '300px'
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    }
}));

function CalenderPanel({history}) {
    localStorage.setItem('tabIndex',1)
    // const { children, value, url, index, ...other } = props;
    // const user = React.useContext(AuthContext);
    // const token = localStorage.getItem('token');
    const classes = useStyles();
    // const [allEvents, setAllEvents] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    // const [image, setImage] = React.useState(null);
    const allEvents = React.useContext(EventsContext);

    useEffect(() => {
        allEvents.forEach(y => {
            // console.log(y.start_time);
            setEvents(events =>
                [...events, { id: JSON.stringify(y), title: y.name, start: y.start_time, end: y.finish_time }]
            )
        })

    }, [allEvents])

    const handleClose = () => {
        setOpen(false);
    };

    function handleRegistrationButton(event) {
        setOpen(false);
        // setSelectedEvent(event);
        history.push('/event/register/' + event._id);
    }


    function handleEventClick(info) {
        setSelectedEvent(JSON.parse(info.event.id))
        setOpen(true);
    }
    return (
        <div
        // role="tabpanel"
        // hidden={value !== index}
        // {...other}
        >
            {/* {value === index && ( */}
            <div className={classes.root}>
                <Grid container component="main" spacing={2}>

                    <Grid item xs={12} sm={12} md={4} lg={2} >
                        <Typography index={0}>Filters</Typography>
                        {/* <Calendar onChange={setCalenderValue} value={calenderValue} ></Calendar> */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} >
                        <FullCalendar
                        
                            eventBackgroundColor="#e7305b"
                            events={events}
                            eventClick={handleEventClick}
                            defaultView='dayGridMonth' plugins={[dayGridPlugin]} backgroundColor="black" 
                            buttonIcons={false}></FullCalendar>

                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2}>
                        {/* <Paper className={classes.rpaper}>
                                <Button onClick={handlePostButtonClick} variant="contained" size="large" className={classes.postButton} >Post Event</Button>
                            </Paper> */}

                    </Grid>
                </Grid>
                <div>
                    <EventsDialog
                        open={open}
                        event={selectedEvent}
                        handleClose={handleClose}
                        handleReg={handleRegistrationButton}
                        ></EventsDialog>
                </div>
            </div>




            {/* )} */}
        </div>
    );
}

export default CalenderPanel;
