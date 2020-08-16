import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AboutEventsPanel from '../Components/AboutEventPanel';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.primary.dark
    },
    body: {
        margin: theme.spacing(3)
    },
    appbar: {
        backgroundColor: theme.palette.secondary.main
    }
}));

export default function UnregisteredPage(props) {
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const id = props.match.params.eventId;
    const [event, setEvent] = React.useState({});
    const [open, setOpen] = React.useState(false);
    if(token){
        
        props.history.replace(`/event/${id}`)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        fetch(`http://139.59.16.53:4000/api/event?id=${id}`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                setEvent(value.event);
            })
        })
    }, [id])

    function handleSigninClick() {
        localStorage.setItem('eventid',id);
        props.history.push("/")
    }
    function handleSignupClick() {
        localStorage.setItem('eventid',id);
        props.history.push('/signup');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Ellipse
                    </Typography>
                    <Button size="large" color="primary" onClick={handleSigninClick}>Login</Button>
                    <Button size="large" color="primary" onClick={handleSignupClick}>Signup</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                <Typography
                    align='center'
                    variant="h4"
                    style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                    {event.name + "(Login to Register and Know More Info)"}
                </Typography>
                <AboutEventsPanel event={event}></AboutEventsPanel>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Register</Button>
            </div>
            <Dialog
                open={open}
                maxWidth="md"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Login to Register for the Event/Contest
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}