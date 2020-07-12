import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import UpdateInfoTabPanel from './UpdateInfoTabPanel';
import UpdatePasswordTabPanel from './UpdatePasswordTabPanel';


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
    bottomTags:{
        position: 'absolute',
        left: theme.spacing(1),
        bottom: theme.spacing(1),
    }
}));

function UpdateProfile(props) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleClose(){
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
            style={{minHeight:"400px"}}
            PaperProps={{
                style: {
                    backgroundColor: "#1C1C1E",
                    boxShadow: 'none',
                },
            }}

        >
            <DialogTitle id="scroll-dialog-title">
                {/* {props.name}
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
                </div> */}
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
                            <Tab label="Update info" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                            {/* <Tab label="Announcements" {...a11yProps(2)} /> */}
                        </Tabs>
                    </AppBar>
                </div>
            </DialogTitle>
            <DialogContent dividers={true}>
            <UpdateInfoTabPanel value={value} index={0}></UpdateInfoTabPanel>
            <UpdatePasswordTabPanel value={value} index={1}></UpdatePasswordTabPanel>
                
            </DialogContent>
            <DialogActions alignItems="center">
            <Button>Update Profile</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateProfile;