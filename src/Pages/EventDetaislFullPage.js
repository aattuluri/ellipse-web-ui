import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import TelegramIcon from '@material-ui/icons/Telegram';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';

import AuthContext from '../AuthContext';
import AnnouncementPanel from '../Components/EventsAnnouncementsPanel';
import AnnouncementEditPanel from '../Components/AnnouncementsEditPanel';
import AboutPanel from '../Components/AboutEventPanel';
import TimeLinePanel from '../Components/EventTimeLinePanel';
import DashboardPanel from '../Components/DashboardPanel';
import ChatPanel from '../Components/EventDetailsChatPanel';
import EventPost from './EventEdit';
import CertificateDashboard from '../Components/AdminCertificateDashboard';
import EventSubmissionPanel from '../Components/EventSubmissionPanel';
import EventsTeamPanel from '../Components/EventsTeamPanel';
import EventDetailsTeamPanel from '../Components/EventDetailsTeamPanel';
import EventAdminSubmissionPanel from '../Components/EventAdminSubmissionPanel';
import EventShareDialog from '../Components/EventShareDialog';
import AdminSettingsPanel from '../Components/AdminSettingsPanel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        // marginBottom: theme.spacing(2),
        padding: theme.spacing(1)

    },
    appBar: {
        position: 'sticky',
        top: 64,
        [theme.breakpoints.down('sm')]: {
            top: 104
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        position: 'sticky',
        top: 64,
        [theme.breakpoints.down('sm')]: {
            top: 104
        },
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        position: 'sticky',

        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.main,
        // position:'sticky',
        top: 64,
        [theme.breakpoints.down('sm')]: {
            top: 104
        },

        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // [theme.breakpoints.down('sm')]: {
        //     display: 'none'
        // },
        // color: theme.palette.grey[500],
    },
}));

export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    localStorage.removeItem('eventid')
    const token = localStorage.getItem('token');
    const id = props.match.params.eventId;
    const t = localStorage.getItem('theme');

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [event, setEvent] = React.useState({});
    const [adminAccess, setAdminAccess] = React.useState(false);
    const [moderatorAccess,setModeratorAcces] = React.useState(false);
    const [chatAcess, setChatAcess] = React.useState(false);
    const [teamAccess, setTeamAccess] = React.useState(false);
    const { currentUser } = React.useContext(AuthContext);
    const [subIndexValue, setSubIndexValue] = React.useState(0);
    const [selected, setSelected] = React.useState({
        infoSelected: true,
        dashBoardSelected: false,
        timilineSelected: false,
        announcementSelected: false,
        settingsSelected: false,
        editEventSelected: false,
        chatSelected: false,
        certificateSelected: false,
        submissionSelected: false,
        participationSelected: false,
        teamsSelected: false,
    });

    const [shareDialogOpen, setShareDialogOpen] = React.useState(false);




    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/event?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(val => {
                setEvent(val.event);
                // console.log(val.event.isTeamed)
                if (val.event.isTeamed && val.event.registered) {
                    setTeamAccess(true);
                }
                if (val.event.registered || val.event.reg_mode !== "form") {
                    setChatAcess(true);

                } else if (val.event.user_id === currentUser.user_id) {
                    setChatAcess(true);
                    setTeamAccess(false);
                }
                else {
                    setChatAcess(false)
                }
                if(val.event.moderators.includes(currentUser.user_id)){
                    setModeratorAcces(true);
                    setChatAcess(true);
                }

            })
        })
        // eslint-disable-next-line
    }, [token, id, currentUser])

    React.useEffect(() => {
        if (event.user_id !== undefined && currentUser.user_id !== undefined) {
            if (event.user_id === currentUser.user_id) {
                // console.log(event);
                // console.log(currentUser)
                setAdminAccess(true);
            }
        }

    }, [currentUser, event])



    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    function handleClose() {
        props.history.goBack()

    }
    function handleShareClick() {
        setShareDialogOpen(true);
    }

    function handleShareClose() {
        setShareDialogOpen(false);
    }

    const handleAnyClick = (selectedOption) => () => {
        const defaultValues = {
            infoSelected: false,
            dashBoardSelected: false,
            timilineSelected: false,
            announcementSelected: false,
            settingsSelected: false,
            editEventSelected: false,
            chatSelected: false,
            certificateSelected: false,
            submissionSelected: false,
            participationSelected: false,
            teamsSelected: false
        }
        defaultValues[selectedOption] = true;
        setSelected(defaultValues);
    }




    const {
        infoSelected,
        dashBoardSelected,
        timilineSelected,
        announcementSelected,
        settingsSelected,
        editEventSelected,
        chatSelected,
        certificateSelected,
        submissionSelected,
        participationSelected, teamsSelected } = selected;

    function handleRegClick() {
        props.history.push('/event/register/' + event._id);
        // props.handleReg(event._id);

    }

    const handleSubIndexChange = (event, newValue) => {
        setSubIndexValue(newValue);
    };

    return (
        <div >
            <CssBaseline />
            <AppBar
                position="fixed"
                color="secondary"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>{event.name}</Typography>
                    <div className={classes.icons}>
                        <IconButton aria-label="share" onClick={handleShareClick}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </div>
                </Toolbar>
                {event.isTeamed &&
                    teamAccess &&
                    participationSelected && <Paper className={classes.root2}>
                        <Tabs
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
                        </Tabs>
                    </Paper>}
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={handleAnyClick("infoSelected")} selected={infoSelected}>
                        <ListItemIcon >
                            <InfoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button onClick={handleAnyClick("timilineSelected")} selected={timilineSelected}>
                        <ListItemIcon>
                            <TimelineIcon color="primary"></TimelineIcon>
                        </ListItemIcon>
                        <ListItemText primary="Schedule" />
                    </ListItem>
                    <ListItem button onClick={handleAnyClick("announcementSelected")} selected={announcementSelected}>
                        <ListItemIcon>
                            <AnnouncementIcon color="primary"></AnnouncementIcon>
                        </ListItemIcon>
                        <ListItemText primary="Announcements" />
                    </ListItem>
                    <ListItem button onClick={handleAnyClick("chatSelected")} selected={chatSelected}>
                        <ListItemIcon>
                            <TelegramIcon color="primary"></TelegramIcon>
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItem>
                    {!adminAccess && <ListItem button onClick={handleAnyClick("participationSelected")} selected={participationSelected}>
                        <ListItemIcon>
                            <GroupWorkIcon color="primary"></GroupWorkIcon>
                        </ListItemIcon>
                        <ListItemText primary="Participation" />
                    </ListItem>}
                </List>
                <Divider />
                {
                    adminAccess  && <List>
                        <ListItem button onClick={handleAnyClick("dashBoardSelected")} selected={dashBoardSelected}>
                            <ListItemIcon >
                                <DashboardIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={handleAnyClick("submissionSelected")} selected={submissionSelected}>
                            <ListItemIcon>
                                <CardMembershipIcon color="primary"></CardMembershipIcon>
                            </ListItemIcon>
                            <ListItemText primary="Submissions" />
                        </ListItem>
                        <ListItem button onClick={handleAnyClick("teamsSelected")} selected={teamsSelected}>
                            <ListItemIcon>
                                <CardMembershipIcon color="primary"></CardMembershipIcon>
                            </ListItemIcon>
                            <ListItemText primary="Teams" />
                        </ListItem>
                        <ListItem button onClick={handleAnyClick("editEventSelected")} selected={editEventSelected}>
                            <ListItemIcon>
                                <EditIcon color="primary"></EditIcon>
                            </ListItemIcon>
                            <ListItemText primary="Edit Event" />
                        </ListItem>
                        <ListItem button onClick={handleAnyClick("certificateSelected")} selected={certificateSelected}>
                            <ListItemIcon>
                                <CardMembershipIcon color="primary"></CardMembershipIcon>
                            </ListItemIcon>
                            <ListItemText primary="Certificates" />
                        </ListItem>
                        <ListItem button onClick={handleAnyClick("settingsSelected")} selected={settingsSelected}>
                            <ListItemIcon>
                                <SettingsIcon color="primary"></SettingsIcon>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List>
                }
                {
                    moderatorAccess && <List>
                        <ListItem button onClick={handleAnyClick("dashBoardSelected")} selected={dashBoardSelected}>
                            <ListItemIcon >
                                <DashboardIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </List>
                }
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                {/* <div className={classes.drawerHeader} /> */}
                {/* <Typography className={classes.eventName} align='center' variant="h4" style={{ paddingBottom: "20px", paddingTop: "10px" }}>{event.name}</Typography> */}
                {
                    infoSelected && event != null && <AboutPanel event={event}></AboutPanel>
                }
                {
                    editEventSelected && event != null && <EventPost event={event} ></EventPost>
                }
                {
                    timilineSelected && event != null && <TimeLinePanel event={event}></TimeLinePanel>
                }
                {
                    dashBoardSelected && event != null && <DashboardPanel event={event}></DashboardPanel>
                }
                {
                    chatSelected && event != null && chatAcess && <div className={classes.chat} ><ChatPanel user={currentUser} open={drawerOpen} event={event}></ChatPanel></div>
                }
                {
                    adminAccess && announcementSelected && event != null && <AnnouncementEditPanel event={event}></AnnouncementEditPanel>
                }
                {
                    !adminAccess && announcementSelected && event != null && <AnnouncementPanel event={event}></AnnouncementPanel>
                }
                {
                    event.isTeamed &&
                    teamAccess &&
                    participationSelected && !adminAccess &&
                    <EventsTeamPanel subIndexValue={subIndexValue} value={4} index={4} open={drawerOpen} event={event}></EventsTeamPanel>
                }
                {
                    !event.isTeamed  && participationSelected && !adminAccess && <EventSubmissionPanel individual={true} event={event}></EventSubmissionPanel>
                }
                {
                    adminAccess && certificateSelected && event != null && <CertificateDashboard event={event}></CertificateDashboard>
                }
                {
                    infoSelected && event.reg_mode === "form" && <Button disabled={event.registered || adminAccess} size="small" color="primary" variant="contained" className={classes.button} onClick={handleRegClick}>
                        {event.registered ? "Registered" : "Register"}
                    </Button>
                }
                {
                    infoSelected && event.reg_mode !== "form" && <Button disabled={event.registered || adminAccess} size="small" color="primary" variant="contained" className={classes.button}>
                        {t === 'light' ? <a href={event.reg_link} style={{ textDecoration: 'none', color: '#ffffff' }} target="blank">Register</a> :
                            <a href={event.reg_link} style={{ textDecoration: 'none', color: '#000000' }} target="blank">Register</a>}
                    </Button>
                }
                {
                    adminAccess && settingsSelected && <AdminSettingsPanel event={event} setEvent={setEvent}></AdminSettingsPanel>
                }
                {
                    adminAccess && teamsSelected && <EventDetailsTeamPanel event={event}></EventDetailsTeamPanel>
                }
                {
                    adminAccess && submissionSelected && <EventAdminSubmissionPanel event={event}></EventAdminSubmissionPanel>
                }
            </main>
            <EventShareDialog
                event={event}
                open={shareDialogOpen}
                handleClose={handleShareClose}></EventShareDialog>
        </div>
    );
}