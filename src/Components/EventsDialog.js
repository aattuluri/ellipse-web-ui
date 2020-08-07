import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
// import MailIcon from '@material-ui/icons/Mail';
import ShareIcon from '@material-ui/icons/Share';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import AboutEventPanel from '../Components/AboutEventPanel';
import EventsTimeLinePanel from '../Components/EventTimeLinePanel';
import EvenstAnnouncementsPanel from '../Components/EventsAnnouncementsPanel';
import ChatPanel from '../Components/EventsChatPanel';
import Paper from '@material-ui/core/Paper';
// import { TextField } from '@material-ui/core';
// import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import EventShareDialog from './EventShareDialog';
// import AuthContext from '../AuthContext';
// import { connect } from 'socket.io-client';


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    // backdrop: {
    //     zIndex: theme.zIndex.drawer + 1,
    //     color: '#fff',
    // },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    },
    root: {
        // flexGrow: 1,
        // width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    bottomTags: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: theme.spacing(1),
    },
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    },
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        // marginBottom: theme.spacing(2),
        padding: theme.spacing(1)

    },
    bottomBar: {
        display: 'flex',
        width: '90%',
        backgroundColor: theme.palette.secondary.main
    },
    field: {
        width: '100%'
    },
    action: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '50px'
    }
}));

function EventsDialog(props) {
    const event = props.event;
    const [value, setValue] = React.useState(0);
    // const user = React.useContext(AuthContext);
    const classes = useStyles();
    // const token = localStorage.getItem('token');
    const [shareDialogOpen,setShareDialogOpen] = React.useState(false);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleClose() {
        props.handleClose();

    }

    function handleRegClick() {
        props.handleReg(event);

    }

    function handleShareClick(){
        setShareDialogOpen(true);
      }

      function handleShareClose(){
        setShareDialogOpen(false);
      }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth="md"
            PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle id="scroll-dialog-title">
                {event.name}
                <div className={classes.icons}>
                    {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <MailIcon></MailIcon>
                    </IconButton> */}
                    <IconButton aria-label="share" onClick={handleShareClick}>
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className={classes.root}>
                    <Paper className={classes.root2}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab label="About" {...a11yProps(0)} />
                            <Tab label="Timeline" {...a11yProps(1)} />
                            <Tab label="Announcements" {...a11yProps(2)} />
                            <Tab label="Chat" {...a11yProps(3)} />

                        </Tabs>
                    </Paper>
                </div>
            </DialogTitle>
            <DialogContent dividers={true} >
            <EventShareDialog
      event = {event} 
      open={shareDialogOpen} 
      handleClose={handleShareClose}></EventShareDialog>
                <AboutEventPanel
                    value={value}
                    index={0}
                    event={props.event}></AboutEventPanel>
                <EventsTimeLinePanel value={value} index={1} event={props.event}></EventsTimeLinePanel>
                <EvenstAnnouncementsPanel value={value} index={2} event={props.event}></EvenstAnnouncementsPanel>
                {value === 3 && <ChatPanel value={value} index={3} event={props.event}></ChatPanel>}
            </DialogContent>
            <DialogActions className={classes.action}>
                <Box className={classes.bottomBar} display="flex"
                    alignItems="center"
                    justifyContent="center" hidden={value !== 3}>
                </Box>
                <div
                    role="tabpanel"
                    hidden={value === 3}>
                    {value !== 3 && (
                        <div className={classes.buttonDiv}>

                            {
                                event.reg_mode === "form" ? <Button disabled={event.registered ? true : false} size="small" color="primary" variant="contained" className={classes.button} onClick={handleRegClick}>
                                    {event.registered ? "Registered" : "Register"}
                                </Button> : <Button disabled={event.registered ? true : false} size="small" color="primary" variant="contained" className={classes.button}>
                                        <a href={event.reg_link} style={{ textDecoration: 'none', color: '#000000' }} target="blank">Register</a>
                                    </Button>
                            }

                        </div>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default EventsDialog;