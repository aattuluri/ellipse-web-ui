import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsDialog from '../Components/NotficationsDialog';
import Switch from '@material-ui/core/Switch';
import Logo from '../Components/Images/logo.svg';
import { Button } from '@material-ui/core';


import { Redirect } from 'react-router';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

    grow: {
        flexGrow: 1,
        alignItems: 'center',
    },
    sectionDesktop: {

        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    tabs: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: theme.spacing(4),
        },
    },
    mobiletab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    tabPanel: {
        marginBottom: theme.spacing(3),
    },
    flex_section: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        // minHeight: 0
    },

    flex_col_scroll: {
        flexGrow: 1,
        overflow: 'auto',
        // minHeight: '100vh'
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontFamily: 'Gugi',
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.5em',
            height: '0.5em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ad9d9d',
            outline: '1px solid slategrey'
        }
    },
    mobileTitle: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },

    },
    titleButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
        },
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        textTransform: 'none'
    },
    eventName: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    // const theme = useTheme();
    const t = localStorage.getItem('theme');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [darkThemeSelected, setDarkThemeSelected] = React.useState(t === 'light' ? false : true);
    // const [value, setValue] = React.useState(0);
    // const [searchedEvent, setSearchedEvent] = React.useState([]);

    const isMenuOpen = Boolean(anchorEl);
    // const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem('token');

    const [notificationsOpen, setNotificationsOpen] = React.useState(false);
    // const [currentUser, setCurrentUser] = React.useState({});
    const [authorized, setAuthorized] = React.useState(true);
    const [userDetailsDone, setUserDetailsDone] = React.useState(true);



    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    // setCurrentUser(value[0]);
                    props.setUser(value[0])
                    if (value[0].college_name === null) {
                        setUserDetailsDone(false);
                    }

                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setAuthorized(false);
            }
        })

        // eslint-disable-next-line
    }, [token])


    if (!token) {
        return <Redirect to="/"></Redirect>
    }
    if (!authorized) {
        return <Redirect to="/"></Redirect>
    }
    if (!userDetailsDone) {
        return <Redirect to="/userinfo"></Redirect>
    }

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
                    props.handleSignout()
                }
            })
        })

    }
    function handleHomeClick() {
        props.handleHomeClick()
        // props.history.push("/home")
        // localStorage.setItem('tabIndex',2);
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
            onClose={handleMenuClose}>
            <MenuItem> Dark Theme <Switch
                checked={darkThemeSelected}
                onChange={handleThemeChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'dark mode checkbox' }}
            /></MenuItem>
            <MenuItem onClick={handleSignout}>Log Out</MenuItem>

        </Menu>
    );

    const handleClose = () => {
        setNotificationsOpen(false);
    };

    function handleNotificationClick() {
        setNotificationsOpen(true);
    }


    const handleDrawerOpen = () => {
        props.setDOpen(true);
    };

    function handleTitleButtonClick() {
        localStorage.setItem('tabIndex', 0)
        props.handleHomeClick()
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="secondary"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.dOpen,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: props.dOpen,
                        })}>
                        <MenuIcon color="primary" />
                    </IconButton>
                    <img src={Logo} alt="logo" onClick={handleTitleButtonClick} className={classes.mobileTitle}></img>
                    <Button className={classes.titleButton} onClick={handleTitleButtonClick}>
                        <Typography className={classes.title} variant="h5" noWrap>
                            Ellipse
                        </Typography>
                    </Button>
                    <div className={classes.grow} />
                    <Typography className={classes.eventName} variant="h5" noWrap>{props.event.name}</Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton onClick={handleHomeClick}><HomeIcon></HomeIcon></IconButton>
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
                            color="inherit">
                            <SettingsIcon></SettingsIcon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <NotificationsDialog open={notificationsOpen} handleClose={handleClose}></NotificationsDialog>
        </div>
    );
}

