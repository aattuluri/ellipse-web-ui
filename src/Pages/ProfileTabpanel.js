import React from 'react';
import ProfileCard from '../Components/MainProfileCard';
import { Grid } from '@material-ui/core';
import UpdateProfileDialog from '../Components/UpdateProfileDialog';
import { makeStyles } from '@material-ui/core/styles';
import EventsDialog from '../Components/EventsDialog';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ProfileEventCard from '../Components/ProfileEventCard';
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
import ActiveEvents from '../ActiveEventsContext';

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



function EventsTabPanel(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [eOpen, setEOpen] = React.useState(false);
    const activeEvents = React.useContext(ActiveEvents);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    function handleEditButton() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
        setEOpen(false)
    }
    const handlePostButtonClick = () => {
        props.history.push('/post')
    }

    const handleRegisterdEventClick = (event) => () => {
        setSelectedEvent(event);
        setEOpen(true);

    }
    return (
        <div>
            <div>
                <Grid container component="main" >
                    <Grid item xs={12} sm={12} md={3} lg={2} >
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={8}>
                        <ProfileCard handleEditButton={handleEditButton}></ProfileCard>
                        <UpdateProfileDialog open={open} handleClose={handleClose}></UpdateProfileDialog>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={2} >
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

                                    <Typography variant="body2">Explore Events</Typography>
                                    {
                                        activeEvents.map((event, index) => {
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
                    <EventsDialog
                        open={eOpen}
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

export default EventsTabPanel;