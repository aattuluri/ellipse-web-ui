import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
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
import InputBase from '@material-ui/core/InputBase';
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
import TelegramIcon from '@material-ui/icons/Telegram';
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




const NavigationBar = function ({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [allEvents, setAllEvents] = React.useState([]);
  const [searchedEvent,setSearchedEvent]= React.useState([]);
  
  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [calenderValue, setCalenderValue] = useState(new Date());
  // const [loading, setLoading] = React.useState(false);
  const eventypes = ["Hackathon", "Coding Contest", "Webinar"];
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    setValue(parseInt(localStorage.getItem('tabIndex')));
    fetch('https://ellipseserver1.herokuapp.com/api/events', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET'
    }).then(response => {
        response.json().then(value => {
            console.log(value);
            setAllEvents(value);
            // setFinalEvents(value);
        })
    })
  },[])


  function handleMorebuttonClick(event) {
    event.preventDefault();
    // history.push("/event/1")
  }
  function handleSearchChange(event,value){
    console.log(value);
    if(value != null){
      setSearchedEvent(value);
    setOpen(true);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(typeof(newValue));
    localStorage.setItem('tabIndex',newValue);
    console.log(localStorage.getItem('tabIndex'));
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };
  // localStorage.removeItem('user');
  // localStorage.removeItem('token');
  console.log(localStorage.getItem('user'));
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if(!currentUser){
    return <Redirect to="/" />;
  }



  function handleSignout(event){
    console.log(token);
    
    fetch('https://ellipseserver1.herokuapp.com/api/users/logout',{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then((result) => {
      result.json().then((data) => {
        if (data.message === "success") {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleSignout}>Log Out</MenuItem>
    </Menu>
  );

  function handleeventClick(){
      history.push("/events")
      // localStorage.setItem('tabIndex',1);
  }
  function handleHomeClick(){
      history.push("/home")
      // localStorage.setItem('tabIndex',2);
  }
  function handleProfileClick(){
    history.push("/profile")
  }

  const handleClose = () => {
    setOpen(false);
};

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
                id="combo-box-demo"
                placeholder="search.."
                options={allEvents}
                getOptionLabel={(option) => option.name}
                onChange={handleSearchChange}
                renderInput={(params) => <TextField {...params} placeholder="search.."
                 className={classes.inputInput}  /> }
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
              <Tab onClick={handleHomeClick} icon={<HomeIcon />} aria-label="phone" />
                <Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="phone" />
                <Tab icon={<TelegramIcon />}  aria-label="favorite" />
                <Tab icon={<ExploreIcon />} aria-label="person" />
                <Tab onClick={handleProfileClick}  icon={<PersonPinIcon />} aria-label="person" />
              </Tabs>
            </Paper>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
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
              aria-label="icon tabs example"
            >
            <Tab onClick={handleHomeClick}  icon={<HomeIcon />} aria-label="home" />
              <Tab onClick={handleeventClick} icon={<EventIcon />} aria-label="event" />
              <Tab icon={<TelegramIcon />} aria-label="messages" />
              <Tab icon={<ExploreIcon />} aria-label="explore" />
              <Tab icon={<PersonPinIcon />} aria-label="person" />
            </Tabs>
          </Paper>
        </div>
      </AppBar>
     
      <div>
        <EventsDialog open={open} event={searchedEvent} handleClose={handleClose}></EventsDialog>
      </div>
      </React.Fragment>
    </div>
  )
}

export default withRouter(NavigationBar);

 {/* <div className={classes.paper}>
        <Grid container component="main" className={classes.flex_section}>
        
          <Grid item xs={12} sm={12} md={4} lg={2} spacing={2} className={classes.flex_col_scroll}>
            <Typography value={value} index={0}>Filters</Typography> */}
            {/* <Calendar onChange={setCalenderValue} value={calenderValue} ></Calendar> */}

          {/* </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} spacing={2} className={classes.flex_col_scroll}>
            <TabPanel value={value} url={imageUrl} index={0}>
            </TabPanel>
            <CalenderPanel value={value} index={1}>Item One</CalenderPanel>
            <TabPanel value={value} index={2}>
          </TabPanel>
            <ProfilePanel value={value} index={4}></ProfilePanel>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={2} spacing={5} className={classes.flex_col_scroll}>
          <Paper className={classes.rpaper}>
            <Button variant="contained" size="large" className={classes.postButton} >Post Event</Button>
            </Paper>

          </Grid>
        </Grid> */}


      {/* </div> */}

  // const currentUserUid = firebaseApp.auth().currentUser.uid;

  // try {
  //   const db = firebase.firestore();
  //   db.collection("UserDetails").doc(currentUserUid).get().then(function (doc) {
  //     console.log(doc.data()["ProfilrPicUrl"])
  //     setImageurl(doc.data()["ProfilrPicUrl"]);
  //   });
  // }
  // catch (error) {
    // console.log(error);
  // }


   // function a11yProps(index) {
  //   return {
  //     id: `scrollable-prevent-tab-${index}`,
  //     'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  //   };
  // }