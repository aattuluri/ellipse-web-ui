import React from 'react';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
// import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
// import Button from '@material-ui/core/Button';
// import MailIcon from '@material-ui/icons/Mail';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// import TabPanel from '../Pages/EventsTabpanel';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
// import ProfileEventCard from '../Components/ProfileEventCard';
import ProfileEventsTabPanel from './ProfileRegEventsTabPanel';
import ProfilePostedEventsTabPanel from './ProfilePostedEventsTabPanel';
import AuthContext from '../AuthContext';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)

    },
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)

    },
    media: {
        // height: 250,
        // paddingTop: '56.25%', // 16:9
    },

    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    buttonDiv: {
        marginLeft: 'auto',
    },
    button: {
        margin: theme.spacing(0.5),
        borderRadius: theme.spacing(3)
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    tab: {
        flexGrow: 1,
        // maxWidth: 800,
        background: theme.palette.secondary.main,
        alignItems: 'center',
    }
}));




function Eventcard(props) {
    localStorage.setItem('tabIndex', 3)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = React.useContext(AuthContext);
    // const url = user.imageUrl;
    // const token = localStorage.getItem('token');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const url = `data:image/jpeg;base64,${user.imageUrl}`
    // function handleEditButton(){

    // }

    // console.log(url);

    return (
        <Card className={classes.root}>
            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={false} sm={false} md={2}>
                    {/* <Typography>Hello</Typography> */}
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.large} sizes="100" alt="" src={process.env.REACT_APP_API_URL + `/api/image?id=${user.profile_pic}`}></Avatar>
                        }
                        action={
                            <Button
                                variant="outlined"
                                color="default"
                                className={classes.button}
                                onClick={props.handleEditButton}
                            >
                                Edit Profile
                            </Button>
                            // <IconButton  onClick={props.handleEditButton} aria-label="settings">
                            //     <MoreVertIcon />
                            //     <Typography>Edit Profile</Typography>
                            // </IconButton>
                        }
                        title={
                            <Typography variant="h4">{user.name}</Typography>
                        }
                        subheader={user.bio}
                    ></CardHeader>
                </Grid>
                <Grid item xs={false} sm={false} md={2}>
                    {/* <Typography>Hello</Typography> */}
                </Grid>
            </Grid>

            <CardContent>
                <Paper className={classes.root2}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                    // centered
                    >

                        {/* <Tab label="About" /> */}
                        <Tab label="Registered Events" />
                        <Tab label="Posted Events" />

                    </Tabs>
                </Paper>
                <div>
                    <ProfileEventsTabPanel url={user.imageUrl} value={value} index={0}></ProfileEventsTabPanel>
                    <ProfilePostedEventsTabPanel url={user.imageUrl} value={value} index={1}></ProfilePostedEventsTabPanel>
                    {/* <ProfileEventsTabPanel url={user.imageUrl} value={value} index={2}></ProfileEventsTabPanel> */}
                    {/* <ProfileEventCard></ProfileEventCard> */}
                    {/* <ProfileEventCard></ProfileEventCard> */}
                    {/* <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item One
                    </TabPanel> */}
                </div>

            </CardContent>
        </Card>);
}

export default Eventcard;

