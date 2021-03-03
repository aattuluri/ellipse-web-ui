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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import TelegramIcon from '@material-ui/icons/Telegram';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import { Theaters } from '@material-ui/icons';


import EventDetailsNavigationBar from '../Components/EventDetailsNavigationBar';
import AnnouncementPanel from '../Components/EventsAnnouncementsPanel';
import AnnouncementEditPanel from '../Components/AnnouncementsEditPanel';
import AboutPanel from '../Components/AboutEventPanel';
import TimeLinePanel from '../Components/EventTimeLinePanel';
import DashboardPanel from '../Components/DashboardPanel';
import ChatPanel from '../Components/EventDetailsChatPanel';
import EventPost from './EventEdit';
import CertificateDashboard from '../Components/AdminCertificateDashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
      position:'sticky',
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
    position:'sticky',
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
    position:'sticky',
    
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
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
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const theme = useTheme();
  localStorage.removeItem('eventid')
  const token = localStorage.getItem('token');
  const id = props.match.params.eventId;
  const t = localStorage.getItem('theme');

  const [drawerOpen, setDrawerOpen] = React.useState(true);
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
    chatSelected: false,
    certificateSelected: false
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

  }, [token, id])

  // console.log(adminAccess)
  React.useEffect(() => {
    if (event.user_id !== undefined && currentUser.user_id !== undefined) {
      if (event.user_id === currentUser.user_id) {
        // console.log(event);
        // console.log(currentUser)
        setAdminAccess(true);
      }
    }

  }, [currentUser, event])



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
      chatSelected: false,
      certificateSelected: false
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
      chatSelected: false,
      certificateSelected: false
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
      chatSelected: false,
      certificateSelected: false
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
      chatSelected: false,
      certificateSelected: false
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
      chatSelected: false,
      certificateSelected: false
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
      chatSelected: true,
      certificateSelected: false
    })
  }
  function certificateClicked() {
    setSelected({
      infoSelected: false,
      dashBoardSelected: false,
      timilineSelected: false,
      announcementSelected: false,
      settingsSelected: false,
      editEventSelected: false,
      chatSelected: false,
      certificateSelected: true
    })
  }
  const {
    infoSelected,
    dashBoardSelected,
    timilineSelected,
    announcementSelected,
    settingsSelected,
    editEventSelected, chatSelected, certificateSelected } = selected;

  function handleSignout() {
    props.history.replace('/');
  }

  function handleRegClick() {
    props.history.push('/event/register/' + event._id);
    // props.handleReg(event._id);

  }

  return (
    <div >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* <div className={classes.drawerHeader} /> */}
        <div>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        </div>
        
      </main>
    </div>
  );
}