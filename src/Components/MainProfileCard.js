import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
// import ProfileEventsTabPanel from './ProfileRegEventsTabPanel';
import ProfilePostedEventsTabPanel from './ProfilePostedEventsTabPanel';
import AboutProfileTabPanel from './ProfileAboutTabPanel';
import AuthContext from '../AuthContext';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import ProfileCertificatePanel from './ProfileCertificateTabPanel';


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
    const user = React.useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card className={classes.root}>
            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={false} sm={false} md={2}>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <CardHeader
                        avatar={
                            <Avatar
                                className={classes.large}
                                sizes="100" alt=""
                                src={process.env.REACT_APP_API_URL + `/api/image?id=${user.profile_pic}`}>
                                <PersonIcon></PersonIcon>
                            </Avatar>
                        }
                        action={
                            <Button
                                variant="outlined"
                                color="default"
                                className={classes.button}
                                onClick={props.handleEditButton}>
                                Edit Profile
                            </Button>
                        }
                        title={
                            <Typography variant="h4">{user.name}</Typography>
                        }
                        subheader={user.bio}
                    ></CardHeader>
                </Grid>
                <Grid item xs={false} sm={false} md={2}>
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
                        scrollButtons="on">
                        <Tab label="About" />
                        {/* <Tab label="Registered Events" /> */}
                        <Tab label="Posted Events" />
                        <Tab label="Certificates"></Tab>
                    </Tabs>
                </Paper>
                <div>
                    <AboutProfileTabPanel handleEditButton={props.handleEditButton} value={value} index={0}></AboutProfileTabPanel>
                    {/* <ProfileEventsTabPanel url={user.imageUrl} value={value} index={1}></ProfileEventsTabPanel> */}
                    <ProfilePostedEventsTabPanel url={user.imageUrl} value={value} index={1}></ProfilePostedEventsTabPanel>
                    <ProfileCertificatePanel url={user.imageUrl} value={value} index={2}></ProfileCertificatePanel>
                </div>
            </CardContent>
        </Card>);
}

export default Eventcard;

