import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventsDialog from '../Components/EventsDialog';
import EventsContext from '../EventsContext';
// import AuthContext from '../AuthContext';
import Typography from '@material-ui/core/Typography';
import ProfileEventCard from '../Components/ProfileEventCard';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Divider from '@material-ui/core/Divider';
// import List from '@material-ui/core/List';
import ActiveEvents from '../ActiveEventsContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EventCard from '../Components/EventCard';
import AuthContext from '../AuthContext';

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
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        position: 'sticky',
        top: theme.spacing(8),
        bottom: 0,
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(13),
        },
        zIndex: 5,
    },
    accordion: {
        backgroundColor: theme.palette.primary.light,
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
    content: {
        marginTop: theme.spacing(3)
    },
}));

function ExplorePanel(props) {
    localStorage.setItem('tabIndex', 0)
    // const user = React.useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    const { allEvents } = React.useContext(EventsContext);
    const { activeEvents } = React.useContext(ActiveEvents);
    const { currentUser } = React.useContext(AuthContext);
    const regEvents = allEvents.filter((val) => {
        return val.registered === true;
    });

    const [value, setValue] = React.useState(0);
    // const user = React.useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const postedEvents = allEvents.filter((val) => {
    //     return val.user_id === user.user_id;
    // });

    const pastEvents = allEvents.filter((val) => {
        const cDate = new Date();
        const eDate = new Date(val.finish_time);
        return cDate > eDate
    })

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
            <Paper className={classes.root2}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on">
                    <Tab label="Active Events" />
                    <Tab label="Registered Events" />
                    <Tab label="Past Events" />
                </Tabs>
            </Paper>
            <div className={classes.content}>
                {value === 0 && <React.Fragment>
                    {
                        activeEvents.length === 0 && <Typography align="center">No events, check back later</Typography>
                    }
                    {
                        props.isFiltered ? props.sortedEventsArray.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={props.handleClick}
                                    url={currentUser.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    event={event}
                                    feeType={event.feesType}
                                    imageDialog={props.handleImageDialogOpen}
                                    handleReg={props.handleRegistrationButton}
                                    eventId={event}
                                >
                                </EventCard>)
                        }) : activeEvents.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={props.handleClick}
                                    url={currentUser.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    eventId={event}
                                    feeType={event.feesType}
                                    imageDialog={props.handleImageDialogOpen}
                                    handleReg={props.handleRegistrationButton}
                                    event={event}
                                >
                                </EventCard>)
                        })}
                </React.Fragment>}
                {value === 1 && <Grid container component="main" alignItems="center" spacing={1}>
                    {
                        regEvents.length === 0 && <Typography align="center">No Registered Events</Typography>
                    }
                    {regEvents.map((event, index) => {
                        return (<Grid item xs={12} sm={12} md={4} key={index}>
                            <ProfileEventCard event={event} handleViewClick={handleEventClick(event)} name={event.name} ></ProfileEventCard>
                        </Grid>)
                    })}

                </Grid>}
                {value === 2 && <Grid container component="main" alignItems="center" spacing={1}>
                    {
                        pastEvents.length === 0 && <Typography align="center">No Past Events at this time</Typography>
                    }
                    {pastEvents.map((event, index) => {
                        return (<Grid item xs={12} sm={12} md={4} alignItems="center" key={index}>
                            <ProfileEventCard event={event} handleViewClick={handleEventClick(event)} name={event.name} ></ProfileEventCard>
                        </Grid>)
                    })}
                </Grid>}

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

export default ExplorePanel;
