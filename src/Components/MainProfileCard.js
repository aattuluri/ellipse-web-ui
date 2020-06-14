import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TabPanel from '../Pages/EventsTabpanel';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
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
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    tab: {
        flexGrow: 1,
        // maxWidth: 800,
        background: theme.palette.secondary.main,
        alignItems: 'center',
    }
}));




function Eventcard(props) {
    const classes = useStyles();
    function handleMoreButtonClick() {
        console.log("button clicked");
        props.click();
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.large} sizes="100" alt=""></Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                        <Typography>Edit Profile</Typography>
                    </IconButton>
                }
                title={
                    <Typography variant="h4">Lalith</Typography>
                }
                subheader="iOS Developer || Reactjs Developer || Flutter || Nodejs"
            ></CardHeader>
            <CardContent>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="About" />
                        <Tab label="Your Events" />
                        <Tab label="Your Posts" />
                        <Tab label="Your Projects" />
                    </Tabs>
                </Paper>
                <div>
                    <TabPanel value={value} index={0}>
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
                    </TabPanel>
                </div>

            </CardContent>
        </Card>);
}

export default Eventcard;

