import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import { Typography } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import '../Themes/main.scss'
import EventsDialog from '../Components/EventsDialog';
// import EventsContext from '../EventsContext';
// import AuthContext from '../AuthContext';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ActiveEventsContext from '../ActiveEventsContext';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '300px'
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    },
    rpaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.primary.light,
        margin: theme.spacing(1),
        position: 'sticky',
        height: '86vh',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        top: theme.spacing(10),
        // zIndex: 3,
        // borderRadius: theme.spacing(50)
    },
    subRpaper: {
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',

    },
    postButton: {
        borderRadius: theme.spacing(50),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 10,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    sideList: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(0),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        minHeight: 300,
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
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
    const [registeredEvents,setRegisteredEvents] = React.useState([]);
    // const [image, setImage] = React.useState(null);
    const allEvents = React.useContext(ActiveEventsContext);

    useEffect(() => {
        allEvents.forEach(y => {
            // console.log(y.start_time);
            setEvents(events =>
                [...events, { id: JSON.stringify(y), title: y.name, start: y.start_time, end: y.finish_time }]
            )
        })
        setRegisteredEvents(allEvents.filter((value) => value.registered === true))

    }, [allEvents])

    const handleClose = () => {
        setOpen(false);
    };
    const handlePostButtonClick = () => {
        history.push('/post')
    }
    
    const handleRegisterdEventClick = (event) => () => {
        setSelectedEvent(event);
        setOpen(true);

    }

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
        <div>
            {/* {value === index && ( */}
            <div className={classes.root}>
                <Grid container component="main" >

                    <Grid item xs={12} sm={12} md={3} lg={2} >
                        {/* <Typography index={0}>Filters</Typography> */}
                        {/* <Calendar onChange={setCalenderValue} value={calenderValue} ></Calendar> */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={8} >
                        <FullCalendar
                            eventBackgroundColor="#1C1C1E"
                            eventBorderColor="#00bdaa"
                            events={events}
                            eventClick={handleEventClick}
                            defaultView='dayGridMonth' plugins={[dayGridPlugin]} backgroundColor="black" 
                            buttonIcons={false}></FullCalendar>

                    </Grid>
                    <Grid item xs={12} sm={12} md={false} lg={2} >
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handlePostButtonClick}>
                        <AddIcon />
                    </Fab>
                    <Paper className={classes.rpaper}>
                        <Paper className={classes.subRpaper}>
                            <Button
                                onClick={handlePostButtonClick}
                                variant="contained"
                                fullWidth
                                size="large"
                                className={classes.postButton} >
                                Post Event
                        </Button>
                            <List className={classes.sideList}>
                                <Typography variant="body2">Registered Events</Typography>
                                {
                                    registeredEvents.map((event, index) => {
                                        return <React.Fragment key={index} >
                                        <ListItem onClick={handleRegisterdEventClick(event)} key={index} button>
                                            <ListItemAvatar>
                                                <Avatar  variant="square"
                                                    alt={event.name}
                                                    src={process.env.REACT_APP_API_URL+`/api/image?id=${event.poster_url}`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText  primary={event.name} />
                                            
                                        </ListItem>
                                        <Divider  /></React.Fragment>
                                    })
                                }
                            </List>
                        </Paper>
                    </Paper>

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
        </div>
    );
}

export default CalenderPanel;
