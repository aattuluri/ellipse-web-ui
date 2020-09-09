
// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles} from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
// // import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// // import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import TimelineIcon from '@material-ui/icons/Timeline';
// import AnnouncementIcon from '@material-ui/icons/Announcement';
// // import BarChartIcon from '@material-ui/icons/BarChart'; 
// import SettingsIcon from '@material-ui/icons/Settings';
// import EventPost from './EventEdit';
// import EditIcon from '@material-ui/icons/Edit';
// import InfoIcon from '@material-ui/icons/Info';
// import AboutPanel from '../Components/AboutEventPanel';
// import TimeLinePanel from '../Components/EventTimeLinePanel';
// import DashboardPanel from '../Components/DashboardPanel';
// import TelegramIcon from '@material-ui/icons/Telegram';
// import ChatPanel from '../Components/EventsChatPanel';
// // import ChatTextField from '../Components/ChatTextField';
// import AuthContext from '../AuthContext';
// import { Typography } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import AnnouncementPanel from '../Components/EventsAnnouncementsPanel';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     position: 'relative',
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     zIndex: '1'
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     position: 'relative',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   drawerClose: {
//     position: 'relative',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     overflowY: 'auto',
//     width: theme.spacing(7) + 1,
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9) + 1,
//     },
//     backgroundColor: theme.palette.secondary.main,
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   mobToolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     [theme.breakpoints.up('lg')]: {
//       display: 'none'
//     },
//   },
//   content: {
//     // position: 'relative',
//     // display: 'flex',
//     flexGrow: 1,
//     padding: theme.spacing(2),
//     height: '84vh',
//     [theme.breakpoints.up('lg')]: {
//       height: '92vh',
//     },
//     overflow: 'auto',
//   },
//   // chat: {
//   //   // position: 'relative',
//   //   // position: 'fixed',
//   //   // overflow: 'auto',
//   //   // height: '92vh',
//   //   // width: '70%'
//   // },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(7),
//     [theme.breakpoints.down('md')]: {
//       top: theme.spacing(12),
//     }
//   }
// }));

// export default function MiniDrawer(props) {
//   const classes = useStyles();
//   localStorage.removeItem('eventid')
//   const [open, setOpen] = React.useState(true);
//   const [selected,setSelected] = React.useState({
//     infoSelected: true,
//     dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: false
//   })
//   const token = localStorage.getItem('token');
//   const user = React.useContext(AuthContext);
//   const id = props.match.params.eventId;
//   const [event,setEvent] = React.useState({});
//   const [adminAccess,setAdminAccess] = React.useState(false);
//   React.useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL+`/api/event?id=${id}`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         method: 'GET',
//     }).then(response => {
//         response.json().then(value => {
//           const ev = value.event;
//           if(ev.user_id === user.user_id){
//             setAdminAccess(true);
//           }
//             setEvent(value.event);
//         })
//     })
// }, [token,id,user.user_id])


//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   function infoClicked(){
//     setSelected({
//       infoSelected: true,
//       dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: false
//     })
//   }

//   function dashBoardClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: true,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: false
//     })
//   }
//   function timelineClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: false,
//     timilineSelected: true,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: false
//     })
//   }
//   function announcementsClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: true,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: false
//     })
//   }
//   function settingsClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: true,
//     editEventSelected: false,
//     chatSelected: false
//     })
//   }
//   function editEventClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: true,
//     chatSelected: false
//     })
//   }
//   function chatClicked(){
//     setSelected({
//       infoSelected: false,
//       dashBoardSelected: false,
//     timilineSelected: false,
//     announcementSelected: false,
//     settingsSelected: false,
//     editEventSelected: false,
//     chatSelected: true
//     })
//   }
//   const {
//     infoSelected,
//     dashBoardSelected,
//     timilineSelected,
//     announcementSelected,
//     settingsSelected,
//     editEventSelected,chatSelected} = selected;


//     function handleCloseButton(){
//       props.history.goBack();
//     }


//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         className={clsx(classes.drawer, {
//           [classes.drawerOpen]: open,
//           [classes.drawerClose]: !open,
//         })}
//         classes={{
//           paper: clsx({
//             [classes.drawerOpen]: open,
//             [classes.drawerClose]: !open,
//           }),
//         }}
//       >
//         {/* <div className={classes.toolbar} /> */}
//         {/* <div className={classes.mobToolbar} /> */}
//         <div className={classes.toolbar}>
//           {open ?
//             <IconButton onClick={handleDrawerClose}>
//               <ChevronLeftIcon />
//             </IconButton>
//             : <IconButton onClick={handleDrawerOpen}>
//               <MenuIcon></MenuIcon>
//             </IconButton>}
//         </div>
//         <Divider />
        // <List>
        //   <ListItem button onClick={infoClicked} selected={infoSelected}>
        //     <ListItemIcon >
        //       <InfoIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="About" />
        //   </ListItem>
        //   <ListItem button onClick={timelineClicked} selected={timilineSelected}>
        //     <ListItemIcon >
        //       <TimelineIcon></TimelineIcon>
        //     </ListItemIcon>
        //     <ListItemText primary="Schedule" />
        //   </ListItem>
        //   <ListItem button onClick={announcementsClicked} selected={announcementSelected}>
        //     <ListItemIcon>
        //       <AnnouncementIcon></AnnouncementIcon>
        //     </ListItemIcon>
        //     <ListItemText primary="Announcements" />
        //   </ListItem>
        //   <ListItem button onClick={chatClicked} selected={chatSelected}>
        //     <ListItemIcon>
        //       <TelegramIcon></TelegramIcon>
        //     </ListItemIcon>
        //     <ListItemText primary="Chat" />
        //   </ListItem>
        // </List>
//         <Divider />
        // {

        // adminAccess && <List>
        //   <ListItem button onClick={dashBoardClicked} selected={dashBoardSelected}>
        //     <ListItemIcon >
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Dashboard" />
        //   </ListItem>
        //   <ListItem button onClick={editEventClicked} selected={editEventSelected}>
        //     <ListItemIcon>
        //       <EditIcon></EditIcon>
        //     </ListItemIcon>
        //     <ListItemText primary="Edit Event" />
        //   </ListItem>
        //   <ListItem button onClick={settingsClicked} selected={settingsSelected}>
        //     <ListItemIcon>
        //       <SettingsIcon></SettingsIcon>
        //     </ListItemIcon>
        //     <ListItemText primary="Settings" />
        //   </ListItem>
        // </List>
        // }
//       </Drawer>
//       <main className={classes.content}>
      // <Typography align= 'center' variant="h4" style={{paddingBottom:"20px",paddingTop:"10px"}}>{event.name}</Typography>
      // <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseButton}>
      //     <CloseIcon fontSize="large" />
      // </IconButton>
      //   {
      //     infoSelected && event != null && <AboutPanel event = {event}></AboutPanel>
      //   }
      //   {
      //     editEventSelected && event != null &&  <EventPost event = {event} ></EventPost>
      //   }
      //   {
      //     timilineSelected && event != null && <TimeLinePanel event = {event}></TimeLinePanel>
      //   }
      //   {
      //     dashBoardSelected && event != null && <DashboardPanel event = {event}></DashboardPanel>
      //   }
      //   {
      //     chatSelected && event != null && <div className={classes.chat} ><ChatPanel open={open} event = {event}></ChatPanel></div>
      //   }
      //   {
      //     announcementSelected && event != null && <AnnouncementPanel event = {event}></AnnouncementPanel>
      //   }



//       </main>
//     </div>
//   );
// }