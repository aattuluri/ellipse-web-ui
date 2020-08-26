import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Paper from '@material-ui/core/Paper';
// import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import HomeIcon from '@material-ui/icons/Home';
// import TelegramIcon from '@material-ui/icons/Telegram';
import EventIcon from '@material-ui/icons/Event';
// import Box from '@material-ui/core/Box';
// import TabPanel from './EventsTabpanel';
import useStyles from '../Themes/MainHomeStyles';
// import { Grid, Button } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import EventsDialog from '../Components/EventsDialog';
import EventsContext from '../EventsContext';
// import AuthContext from '../AuthContext';
import NotificationsDialog from '../Components/NotficationsDialog';





const NavigationBar = function ({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  // const [allEvents, setAllEvents] = React.useState([]);
  const [searchedEvent, setSearchedEvent] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [calenderValue, setCalenderValue] = useState(new Date());
  // const [loading, setLoading] = React.useState(false);
  // const eventypes = ["Hackathon", "Coding Contest", "Webinar"];
  const [open, setOpen] = React.useState(false);
  const [notificationsOpen,setNotificationsOpen] = React.useState(false);
  const allEvents = React.useContext(EventsContext);
  useEffect(() => {
    if (localStorage.getItem('tabIndex') != null) {
      const tabIndex = parseInt(localStorage.getItem('tabIndex'));
      if (tabIndex != null) {
        setValue(tabIndex);
      }
    }
  }, [])


  // function handleMorebuttonClick(event) {
  //   event.preventDefault();
  //   // history.push("/event/1")
  // }
  function handleSearchChange(event, value) {
    if(value){
      console.log(value);
      setSearchedEvent(value);
      setOpen(true);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('tabIndex', newValue);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    // setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const token = localStorage.getItem('token');
  if(!token){
    history.replace('/');
  }

  

  function handleSignout(event) {

    fetch(process.env.REACT_APP_API_URL+'/api/users/logout', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then((result) => {
      result.json().then((data) => {
        if (data.message === "success") {
          localStorage.removeItem('token');
          localStorage.removeItem('tabIndex');
          history.replace("/")
        }
      })
    })


  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleSignout}>Log Out</MenuItem>
    </Menu>
  );

  function handleeventClick(event) {
    event.preventDefault();
    history.push("/events")
    // localStorage.setItem('tabIndex',1);
  }
  function handleHomeClick() {
    history.push("/home")
    // localStorage.setItem('tabIndex',2);
  }
  function handleProfileClick() {
    history.push("/profile")
  }
  function handleExploreClick(){
    history.push("/yourevents")
  }
  // function handleChatClick() {
  //   history.push('/chat')
  // }
  const handleClose = () => {
    setOpen(false);
    setNotificationsOpen(false);
  };

  function handleRegistrationButton(event) {
    setOpen(false);
    // setSelectedEvent(event);
    history.push('/event/register/' + event._id);
}

function handleNotificationClick(){
  setNotificationsOpen(true);
}

  return (
    <div className={classes.grow}>
      <React.Fragment>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
              Ellipse
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Autocomplete
                freeSolo
                id="search"
                placeholder="search.."
                options={allEvents}
                getOptionLabel={(option) => option.name}
                onChange={handleSearchChange}
                renderInput={(params) => <TextField {...params} placeholder="search.."
                  className={classes.inputInput} />}
              />
            </div>
            <div className={classes.tabs}>
              <Paper square className={classes.root}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="icon tabs example"
                >
                  <Tab onClick={handleHomeClick} icon={<HomeIcon />} aria-label="home" />
                  <Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="event" />
                  {/* <Tab onClick={handleChatClick} icon={<TelegramIcon />} aria-label="favorite" /> */}
                  <Tab onClick={handleExploreClick} icon={<ExploreIcon />} aria-label="person" />
                  <Tab onClick={handleProfileClick} icon={<PersonPinIcon />} aria-label="person" />
                </Tabs>
              </Paper>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="notifications" color="inherit" onClick={handleNotificationClick}>
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <SettingsIcon></SettingsIcon>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        <AppBar position="sticky" color="secondary">
          <div className={classes.mobiletab}>

            <Paper square className={classes.root} position="sticky">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              // aria-label="icon tabs example"
              >
                <Tab onClick={handleHomeClick} icon={<HomeIcon />} aria-label="home" />
                <Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="event" />
                {/* <Tab onClick={handleChatClick} icon={<TelegramIcon />} aria-label="messages" /> */}
                <Tab onClick={handleExploreClick} icon={<ExploreIcon />} aria-label="explore" />
                <Tab onClick={handleProfileClick} icon={<PersonPinIcon />} aria-label="person" />
              </Tabs>
            </Paper>
          </div>
        </AppBar>
        <div>
         { open && <EventsDialog
            open={open}
            event={searchedEvent}
            handleReg={handleRegistrationButton}
            handleClose={handleClose}>
          </EventsDialog>}
          <NotificationsDialog open={notificationsOpen} handleClose={handleClose}></NotificationsDialog>
        </div>
      </React.Fragment>
    </div>
  )
}

export default withRouter(NavigationBar);

