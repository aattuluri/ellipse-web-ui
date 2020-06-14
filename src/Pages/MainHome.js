import React, { useContext, useState } from 'react';
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";
import firebaseApp from "../firebaseConfig";
import firebase from "firebase/app";
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
import TabPanel from './EventsTabpanel';
import useStyles from '../Themes/MainHomeStyles';
import { Grid, Button } from '@material-ui/core';
import ProfilePanel from './ProfileTabpanel';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';




const MainHome = function ({ history }) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [imageUrl, setImageurl] = useState("");
  // const [loading, setLoading] = React.useState(false);


  function handleMorebuttonClick(event) {
    event.preventDefault();
    // history.push("/event/1")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  if (!currentUser) {
    console.log(currentUser);
    return <Redirect to="/" />;
  }
  const currentUserUid = firebaseApp.auth().currentUser.uid;

  try {
    const db = firebase.firestore();
    db.collection("UserDetails").doc(currentUserUid).get().then(function (doc) {
      console.log(doc.data()["ProfilrPicUrl"])
      setImageurl(doc.data()["ProfilrPicUrl"]);
    });
  }
  catch (error) {
    console.log(error);
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
      <MenuItem onClick={() => firebase.auth().signOut()}>Log Out</MenuItem>
    </Menu>
  );

  // function a11yProps(index) {
  //   return {
  //     id: `scrollable-prevent-tab-${index}`,
  //     'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  //   };
  // }


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
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
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
                <Tab icon={<EventIcon />} aria-label="phone" />
                <Tab icon={<TelegramIcon />} aria-label="favorite" />
                <Tab icon={<ExploreIcon />} aria-label="person" />
                {/* <Tab icon={<FavoriteIcon />} aria-label="favorite" /> */}
                <Tab icon={<PersonPinIcon />} aria-label="person" />
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
              <Tab icon={<EventIcon />} aria-label="phone" />
              <Tab icon={<TelegramIcon />} aria-label="favorite" />
              <Tab icon={<ExploreIcon />} aria-label="person" />
              <Tab icon={<PersonPinIcon />} aria-label="person" />
            </Tabs>
          </Paper>


        </div>
      </AppBar>
      <div className={classes.paper}>
        <Grid container component="main" className={classes.flex_section}>
        
          <Grid item xs={12} sm={12} md={4} lg={2} spacing={2} className={classes.flex_col_scroll}>
            <Typography value={value} index={0}>Filters</Typography>

          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} spacing={2} className={classes.flex_col_scroll}>
            <TabPanel value={value} url={imageUrl} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item One
          </TabPanel>
            <ProfilePanel value={value} index={3}></ProfilePanel>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={2} spacing={5} className={classes.flex_col_scroll}>
          <Paper className={classes.rpaper}>
            <Button variant="contained" size="large" className={classes.postButton} >Post Event</Button>
            </Paper>

          </Grid>
        </Grid>


      </div>
      </React.Fragment>
    </div>
  )
}

export default withRouter(MainHome);