import React from 'react';


import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';


import EventShareDialog from './EventShareDialog';
import AboutEventPanel from '../Components/AboutEventPanel';
import EventsTimeLinePanel from '../Components/EventTimeLinePanel';
import EvenstAnnouncementsPanel from '../Components/EventsAnnouncementsPanel';
import ChatPanel from '../Components/EventsChatPanel';
// import EventsTeamPanel from '../Components/EventsTeamPanel';
// import EventSubmissionPanel from '../Components/EventSubmissionPanel';
import { Divider, Typography } from '@material-ui/core';
import AuthContext from '../AuthContext';
// import VerticalTabBar from './VerticalTabBar';



function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({

    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        // color: theme.palette.grey[500],
    },
    root: {

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
    },
    dialogContent: {
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
        },

    },
    mobileHead: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    desktopHead: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    }
}));

function EventsDialog(props) {
    const event = props.event;
    const t = localStorage.getItem('theme');
    const [value, setValue] = React.useState(0);
    const { currentUser } = React.useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    // const token = localStorage.getItem('token');
    const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
    const [chatAcess, setChatAcess] = React.useState(false);
    // const [teamAccess, setTeamAccess] = React.useState(false);
    // const [adminAccess, setAdminAccess] = React.useState(false);
    const [subIndexValue, setSubIndexValue] = React.useState(0);
    React.useEffect(() => {
        // console.log(event.registered);
        if (event.registered || event.reg_mode !== "form") {
            setChatAcess(true);
            // setTeamAccess(true);
        } else if (event.user_id === currentUser.user_id) {
            setChatAcess(true);
            // setAdminAccess(true);
        }
        else {
            setChatAcess(false)
        }
        if (props.openTeams) {
            setValue(4);
            setSubIndexValue(1);
        }
    }, [event, currentUser, props.openTeams])

    // console.log(chatAcess);
    const handleSubIndexChange = (event, newValue) => {
        setSubIndexValue(newValue);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleClose() {
        props.handleClose();

    }

    function handleRegClick() {
        props.handleReg(event);

    }

    function handleShareClick() {
        setShareDialogOpen(true);
    }

    function handleShareClose() {
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
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle id="scroll-dialog-title">
                <Box className={classes.mobileHead} display="flex" flexDirection="column" justifyContent="center">
                    {/* <Box display="flex" justifyContent="flex-start">
                        {event.name}
                    </Box> */}
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton aria-label="share" onClick={handleShareClick}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
                {event.name}
                {/* <Typography className={classes.mobileHead} style={{}} variant="h6">{event.name}</Typography> */}

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
                            <Tab label="Schedule" {...a11yProps(1)} />
                            <Tab label="Announcements" {...a11yProps(2)} />
                            <Tab label="Chat" {...a11yProps(3)} />
                            {/* {!event.isTeamed && <Tab label="Submission" {...a11yProps(4)}></Tab>} */}
                            {/* {event.isTeamed && <Tab label="Participation" {...a11yProps(4)}></Tab>} */}
                            {/* <Tab label="Submission"></Tab> */}
                        </Tabs>
                    </Paper>
                    <Divider></Divider>
                    {event.isTeamed && value === 4 && <Paper className={classes.root2}>
                        <Tabs
                            // style={{backgroundColor: "#00bdaa"}}
                            value={subIndexValue}
                            onChange={handleSubIndexChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab label="Submissions" />
                            <Tab label="Your Team" />
                            <Tab label="Team Chat" />
                            {/* <Tab label="Create Team" />
                            <Tab label="Join Team" /> */}
                        </Tabs>
                    </Paper>}
                </div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent} dividers={true} >
                <EventShareDialog
                    event={event}
                    open={shareDialogOpen}
                    handleClose={handleShareClose}></EventShareDialog>
                <AboutEventPanel
                    value={value}
                    index={0}
                    event={props.event}></AboutEventPanel>
                {/* {value === 2 && <VerticalTabBar value={value} index={1} subIndexValue={subIndexValue}  event={props.event}></VerticalTabBar>} */}
                <EventsTimeLinePanel value={value} index={1} event={props.event}></EventsTimeLinePanel>
                <EvenstAnnouncementsPanel value={value} index={2} event={props.event}></EvenstAnnouncementsPanel>
                {value === 3 && chatAcess && <ChatPanel value={value} index={3} event={props.event}></ChatPanel>}
                {value === 3 && !chatAcess && <Typography align="center" variant="h5" >Register for the event to continue</Typography>}
                {/* {teamAccess && event.isTeamed && !adminAccess && <EventsTeamPanel subIndexValue={subIndexValue} value={value} index={4} event={props.event}></EventsTeamPanel>}
                {chatAcess && value === 4 && !event.isTeamed && !adminAccess && <EventSubmissionPanel individual={true} event={props.event}></EventSubmissionPanel>} */}
                {/* {value === 4 && !teamAccess && <Typography align="center" variant="h5" >Register for the event to continue</Typography>} */}
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
                                        {t === 'light' ? <a rel="noopener noreferrer" href={event.reg_link} style={{ textDecoration: 'none', color: '#ffffff' }} target="blank">Register</a> :
                                            <a rel="noopener noreferrer" href={event.reg_link} style={{ textDecoration: 'none', color: '#000000' }} target="blank">Register</a>}
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