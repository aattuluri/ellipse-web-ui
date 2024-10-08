import React from 'react';

//calender view imports
import '../Themes/main.scss'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

//materialui imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
import Typography from '@material-ui/core/Typography';

//other componnets
import EventsDialog from '../Components/EventsDialog';
import AuthContext from '../AuthContext';
import ActiveEventsContext from '../ActiveEventsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '300px'
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
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

function CalenderPanel({ history }) {
    localStorage.setItem('tabIndex', 1)
    const { currentUser } = React.useContext(AuthContext);
    const classes = useStyles();
    const [events, setEvents] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    const [registeredEvents, setRegisteredEvents] = React.useState([]);
    const { activeEvents } = React.useContext(ActiveEventsContext);

    React.useEffect(() => {
        activeEvents.forEach(y => {
            setEvents(events =>
                [...events, { id: JSON.stringify(y), title: y.name, start: y.start_time, end: y.finish_time }]
            )
        })
        setRegisteredEvents(activeEvents.filter((value) => value.registered === true))
    }, [activeEvents])

    const handleClose = () => {
        setOpen(false);
    }

    const handlePostButtonClick = () => {
        history.push('/post')
    }

    const handleRegisterdEventClick = (event) => () => {
        if (event.registered || event.user_id === currentUser.user_id) {
            history.push(`/event/${event._id}`)
        } else {
            setSelectedEvent(event);
            setOpen(true);
        }
    }

    const handleRegistrationButton = (event) => {
        setOpen(false);
        history.push('/event/register/' + event._id);
    }


    const handleEventClick = (info) => {
        if (JSON.parse(info.event.id).registered || JSON.parse(info.event.id).user_id === currentUser.user_id) {
            history.push(`/event/${JSON.parse(info.event.id)._id}`)
        } else {
            setSelectedEvent(JSON.parse(info.event.id));
            setOpen(true);
        }
    }

    return (
        <div>
            <div className={classes.root}>
                <Grid container component="main" >

                    <Grid item xs={12} sm={12} md={3} lg={2} >

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
                                                        <Avatar variant="square"
                                                            alt={event.name}
                                                            src={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={event.name} />

                                                </ListItem>
                                                <Divider /></React.Fragment>
                                        })
                                    }
                                </List>
                            </Paper>
                        </Paper>

                    </Grid>
                </Grid>
                <div>
                    {open && <EventsDialog
                        open={open}
                        event={selectedEvent}
                        handleClose={handleClose}
                        handleReg={handleRegistrationButton}
                    ></EventsDialog>}
                </div>
            </div>
        </div>
    );
}

export default CalenderPanel;
