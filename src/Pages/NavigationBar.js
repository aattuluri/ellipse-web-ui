import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EventIcon from '@material-ui/icons/Event';
import useStyles from '../Themes/MainHomeStyles';
// import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import EventsDialog from '../Components/EventsDialog';
import EventsContext from '../EventsContext';
import NotificationsDialog from '../Components/NotficationsDialog';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core';
import Logo from '../Components/Images/logo.svg';
// import TelegramIcon from '@material-ui/icons/Telegram'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import Tooltip from '@material-ui/core/Tooltip';
// import DarkLogo from '../Components/Images/dark_theme_logo.png';
// import LightLogo from '../Components/Images/light_theme_logo.png';
// import CuboidLogo from '../Components/Images/Cuboid logo.png'






const NavigationBar = function ({ history }) {

  const classes = useStyles();
  const token = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const t = localStorage.getItem('theme');
  const [darkThemeSelected, setDarkThemeSelected] = React.useState(t === 'light' ? false : true);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  // const [allEvents, setAllEvents] = React.useState([]);
  const [searchedEvent, setSearchedEvent] = React.useState([]);
  const [notificationsCount, setNotificationCount] = React.useState(0);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [calenderValue, setCalenderValue] = useState(new Date());
  // const [loading, setLoading] = React.useState(false);
  // const eventypes = ["Hackathon", "Coding Contest", "Webinar"];
  const [open, setOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const { allEvents } = React.useContext(EventsContext);
  useEffect(() => {
    if (localStorage.getItem('tabIndex') != null) {
      const tabIndex = parseInt(localStorage.getItem('tabIndex'));
      if (tabIndex != null) {
        setValue(tabIndex);
      }
    }
    fetch(process.env.REACT_APP_API_URL + '/api/get_unseen_notifications_count', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then((result) => {
      result.json().then((data) => {
        // console.log(data);
        setNotificationCount(data);
      })
    })
  }, [token])


  // function handleMorebuttonClick(event) {
  //   event.preventDefault();
  //   // history.push("/event/1")
  // }
  function handleSearchChange(event, value) {
    if (value) {
      // console.log(value);
      setSearchedEvent(value);
      setOpen(true);
    }
  }

  const handleNotificationCardClick = (value) => {
    if (value) {
      allEvents.forEach(event => {
        if (event._id === value) {
          setSearchedEvent(event);
          setOpen(true);
        }
      });
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


  if (!token) {
    history.replace('/');
  }

  function handleThemeChange(event) {
    // console.log(event.target.checked);
    setDarkThemeSelected(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem('theme', 'dark');
      window.location.reload(false);
    }
    else {
      localStorage.setItem('theme', 'light');
      window.location.reload(false);
    }
  }



  function handleSignout(event) {

    fetch(process.env.REACT_APP_API_URL + '/api/users/logout', {
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
      <MenuItem> Dark Theme <Switch
        checked={darkThemeSelected}
        onChange={handleThemeChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /></MenuItem>
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
  // function handleExploreClick() {
  //   history.push("/yourevents")
  // }
  function handleChatClick() {
    history.push('/chat')
  }
  const handleClose = () => {
    setOpen(false);
    setNotificationsOpen(false);
  };

  function handleRegistrationButton(event) {
    setOpen(false);
    // setSelectedEvent(event);
    history.push('/event/register/' + event._id);
  }

  function handleNotificationClick() {
    fetch(process.env.REACT_APP_API_URL + '/api/update_notification_status', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then((result) => {
      result.json().then((data) => {
        setNotificationCount(0);
      })
    })
    setNotificationsOpen(true);
  }
  function handleTitleButtonClick() {
    localStorage.setItem('tabIndex', 0)
    setValue(0)
    history.push('/home')
  }

  return (
    <div className={classes.grow}>
      <React.Fragment>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <img src={Logo} alt="logo" onClick={handleTitleButtonClick} className={classes.mobileTitle}></img>
            <Button className={classes.titleButton} onClick={handleTitleButtonClick}>
              <Typography className={classes.title} variant="h5" noWrap>
                Ellipse
              </Typography>
            </Button>
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
              <Paper square className={classes.root} elevation={0}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="icon"
                >
                  <Tooltip title="Home"><Tab onClick={handleHomeClick} icon={<HomeIcon />} aria-label="home" /></Tooltip>
                  <Tooltip title="Calender View"><Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="event" /></Tooltip>
                  <Tooltip title="Chat"><Tab onClick={handleChatClick} icon={<ChatOutlinedIcon />} aria-label="favorite" /></Tooltip>
                  {/* <Tab onClick={handleExploreClick} icon={<ExploreIcon />} aria-label="person" /> */}
                  <Tooltip title="Profile"><Tab onClick={handleProfileClick} icon={<PersonPinIcon />} aria-label="person" /></Tooltip>
                </Tabs>
              </Paper>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Notifications"><IconButton aria-label="notifications" color="inherit" onClick={handleNotificationClick}>
                <Badge badgeContent={notificationsCount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton></Tooltip>
              <Tooltip title="Settings"><IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <SettingsIcon></SettingsIcon>
              </IconButton></Tooltip>
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
                <Tooltip title="Notifications"><Tab onClick={handleHomeClick} icon={< HomeIcon />} aria-label="home" /></Tooltip>
                <Tooltip title="Notifications"><Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="event" /></Tooltip>
                {/* <Tab onClick={handleChatClick} icon={<TelegramIcon />} aria-label="messages" /> */}
                <Tooltip title="Notifications"><Tab onClick={handleChatClick} icon={<ChatOutlinedIcon></ChatOutlinedIcon>} aria-label="favorite" /></Tooltip>
                <Tooltip title="Notifications"><Tab onClick={handleProfileClick} icon={<PersonPinIcon />} aria-label="person" /></Tooltip>
              </Tabs>
            </Paper>
          </div>
        </AppBar>
        <div>
          {open && <EventsDialog
            open={open}
            event={searchedEvent}
            handleReg={handleRegistrationButton}
            handleClose={handleClose}>
          </EventsDialog>}
          <NotificationsDialog open={notificationsOpen} handleClick={handleNotificationCardClick} handleClose={handleClose}></NotificationsDialog>
        </div>
      </React.Fragment>
    </div>
  )
}

export default withRouter(NavigationBar);

