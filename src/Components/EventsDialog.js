import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import ShareIcon from '@material-ui/icons/Share';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import AboutEventPanel from '../Components/AboutEventPanel';
import EventsTimeLinePanel from '../Components/EventTimeLinePanel';


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    // backdrop: {
    //     zIndex: theme.zIndex.drawer + 1,
    //     color: '#fff',
    // },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    },
    root: {
        flexGrow: 1,
        // width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    bottomTags: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: theme.spacing(1),
    },
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    }
}));

function EventsDialog(props) {
    const event = props.event;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const token = localStorage.getItem('token');
    // const [image, setImage] = React.useState(null);
    // console.log(props.imageUrl);
    // React.useEffect(() => {
    //     setImage(props.imageUrl);
    //     if(props.imageUrl === "undefined"){
    //         fetch(`http://localhost:4000/api/event/image?id=${event.posterUrl}`, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //       },
    //       method: 'GET'
    //     }).then(response => {
    //       if (response.status === 200) {
    //         response.json().then(value => {
    //           const img = value.image;
    //           console.log(value.image);
    //           setImage(img.type + "," + img.image_data)
    //         })
    //       }
    
    //     })
    //     }
        
        
    //   }, [])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    function handleClose() {
        //   timerComponents = []
        props.handleClose();

    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth="md"
            PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }}
            classes={{ paper: classes.dialog }}

        >
            <DialogTitle id="scroll-dialog-title">
                {event.name}
                <div className={classes.icons}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <MailIcon></MailIcon>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </div>
                <div className={classes.root}>
                    <AppBar style={{ alignItems: 'center' }} position="static" color="secondary">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        //   centered
                        >
                            <Tab label="About" {...a11yProps(0)} />
                            <Tab label="Timeline" {...a11yProps(1)} />
                            <Tab label="Announcements" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                </div>
            </DialogTitle>
            <DialogContent  dividers={true} >
            <AboutEventPanel 
            value={value} 
            index={0} 
            imageUrl={props.imageUrl} 
            event={props.event}></AboutEventPanel>
            <EventsTimeLinePanel value={value} index={1} event={props.event}></EventsTimeLinePanel>
            </DialogContent>
            <DialogActions>
                {/* <div className={classes.bottomTags}>
            {tags!= null && tags.map(val =>{
                return <Chip variant="outlined" color="primary"  label={val}></Chip>
            })}
            <Chip variant="outlined" color="primary"  label="Free"></Chip>
            </div> */}

                <Button variant="contained" onClick={props.handleClose} color="primary">
                    Register
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventsDialog;