
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import AnnouncementIcon from '@material-ui/icons/Announcement';
// import BarChartIcon from '@material-ui/icons/BarChart'; 
import SettingsIcon from '@material-ui/icons/Settings';
import EventPost from './EventEdit';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import AboutPanel from '../Components/AboutEventPanel';
import TimeLinePanel from '../Components/EventTimeLinePanel';
import DashboardPanel from '../Components/DashboardPanel';

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
    zIndex: '1'
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
  mobToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selected,setSelected] = React.useState({
    infoSelected: true,
    dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: false
  })
  const token = localStorage.getItem('token');
  const id = props.match.params.eventId;
  const [event,setEvent] = React.useState(null);
  React.useEffect(() => {
    fetch(`http://139.59.16.53:4000/api/event?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET',
    }).then(response => {
        response.json().then(value => {
            setEvent(value.event);
        })
    })
}, [token])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function infoClicked(){
    setSelected({
      infoSelected: true,
      dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: false
    })
  }

  function dashBoardClicked(){
    setSelected({
      infoSelected: false,
      dashBoardSelected: true,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: false
    })
  }
  function timelineClicked(){
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
    timilineSelected: true,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: false
    })
  }
  function announcementsClicked(){
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: true,
    settingsSelected: false,
    editEventSelected: false
    })
  }
  function settingsClicked(){
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: true,
    editEventSelected: false
    })
  }
  function editEventClicked(){
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
    timilineSelected: false,
    announcementSelected: false,
    settingsSelected: false,
    editEventSelected: true
    })
  }
  const {
    infoSelected,
    dashBoardSelected,
    timilineSelected,
    announcementSelected,
    settingsSelected,
    editEventSelected} = selected;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.mobToolbar} />
        <div className={classes.toolbar}>
          {open ?
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
            : <IconButton onClick={handleDrawerOpen}>
              <MenuIcon></MenuIcon>
            </IconButton>}
        </div>
        <Divider />
        <List>
          <ListItem button onClick={infoClicked} selected={infoSelected}>
            <ListItemIcon >
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={timelineClicked} selected={timilineSelected}>
            <ListItemIcon >
              <TimelineIcon></TimelineIcon>
            </ListItemIcon>
            <ListItemText primary="Timeline" />
          </ListItem>
          <ListItem button onClick={announcementsClicked} selected={announcementSelected}>
            <ListItemIcon>
              <AnnouncementIcon></AnnouncementIcon>
            </ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={dashBoardClicked} selected={dashBoardSelected}>
            <ListItemIcon >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={editEventClicked} selected={editEventSelected}>
            <ListItemIcon>
              <EditIcon></EditIcon>
            </ListItemIcon>
            <ListItemText primary="Edit Event" />
          </ListItem>
          <ListItem button onClick={settingsClicked} selected={settingsSelected}>
            <ListItemIcon>
              <SettingsIcon></SettingsIcon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {/* <EventsTabPanel></EventsTabPanel> */}
        {
          infoSelected && event != null && <AboutPanel event = {event}></AboutPanel>
        }
        {
          editEventSelected && event != null &&  <EventPost event = {event} ></EventPost>
        }
        {
          timilineSelected && event != null && <TimeLinePanel event = {event}></TimeLinePanel>
        }
        {
          dashBoardSelected && event != null && <DashboardPanel event = {event}></DashboardPanel>
        }
        {/* <EventPost event = {event} ></EventPost> */}
        
      </main>
    </div>
  );
}

