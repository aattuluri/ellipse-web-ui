import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
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
import AnnouncementIcon from '@material-ui/icons/Announcement';


import EventDetailsNavigationBar from '../Components/EventDetailsNavigationBar';
import AnnouncementPanel from '../Components/EventsAnnouncementsPanel';
import AboutPanel from '../Components/AboutEventPanel';
import TimeLinePanel from '../Components/EventTimeLinePanel';
import DashboardPanel from '../Components/DashboardPanel';
import ChatPanel from '../Components/EventDetailsChatPanel';
import EventPost from './EventEdit';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.secondary.main,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },

}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const token = localStorage.getItem('token');
  const id = props.match.params.eventId;

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [event, setEvent] = React.useState({});
  const [adminAccess, setAdminAccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selected, setSelected] = React.useState({
    infoSelected: true,
    dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: false,
    chatSelected: false
  })


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
        
      })
    })
    
  }, [token,id])

  console.log(adminAccess)
  React.useEffect(()=>{
    if( event.user_id !== undefined && currentUser.user_id !== undefined){
      if (event.user_id === currentUser.user_id) {
        // console.log(event);
        // console.log(currentUser)
        setAdminAccess(true);
      }
    }
    
  },[currentUser,event])



  // const handleDrawerOpen = () => {
  //   setDrawerOpen(true);
  // };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  function handleHomeClick() {
    props.history.push("/home")
    // localStorage.setItem('tabIndex',2);
  }



  function infoClicked() {
    setSelected({
      infoSelected: true,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: false
    })
  }

  function dashBoardClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: true,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: false
    })
  }
  function timelineClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: true,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: false
    })
  }
  function announcementsClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: true,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: false
    })
  }
  function settingsClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: true,
      editEventSelected: false,
      chatSelected: false
    })
  }
  function editEventClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: true,
      chatSelected: false
    })
  }
  function chatClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: true
    })
  }
  const {
    infoSelected,
    dashBoardSelected,
    timilineSelected,
    announcementSelected,
    settingsSelected,
    editEventSelected, chatSelected } = selected;

    function handleSignout(){
      props.history.replace('/');
    }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <EventDetailsNavigationBar event={event} handleSignout={handleSignout} handleHomeClick={handleHomeClick} setUser={setCurrentUser}  dOpen={drawerOpen} setDOpen={setDrawerOpen}></EventDetailsNavigationBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon color="primary"/> : <ChevronLeftIcon color="primary"/>}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={infoClicked} selected={infoSelected}>
            <ListItemIcon >
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={timelineClicked} selected={timilineSelected}>
            <ListItemIcon>
              <TimelineIcon color="primary"></TimelineIcon>
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
          <ListItem button onClick={announcementsClicked} selected={announcementSelected}>
            <ListItemIcon>
              <AnnouncementIcon color="primary"></AnnouncementIcon>
            </ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItem>
          <ListItem button onClick={chatClicked} selected={chatSelected}>
            <ListItemIcon>
              <TelegramIcon color="primary"></TelegramIcon>
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </List>
        <Divider />
        {
          adminAccess && <List>
            <ListItem button onClick={dashBoardClicked} selected={dashBoardSelected}>
              <ListItemIcon >
                <DashboardIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={editEventClicked} selected={editEventSelected}>
              <ListItemIcon>
                <EditIcon color="primary"></EditIcon>
              </ListItemIcon>
              <ListItemText primary="Edit Event" />
            </ListItem>
            <ListItem button onClick={settingsClicked} selected={settingsSelected}>
              <ListItemIcon>
                <SettingsIcon color="primary"></SettingsIcon>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        }
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography align='center' variant="h4" style={{ paddingBottom: "20px", paddingTop: "10px" }}>{event.name}</Typography> */}
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
          chatSelected && event != null && <div className={classes.chat} ><ChatPanel user={currentUser} open={drawerOpen} event={event}></ChatPanel></div>
        }
        {
          announcementSelected && event != null && <AnnouncementPanel event={event}></AnnouncementPanel>
        }
      </main>
    </div>
  );
}





