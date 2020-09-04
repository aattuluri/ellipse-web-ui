import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import UpdateInfoTabPanel from './UpdateInfoTabPanel';
import UpdatePasswordTabPanel from './UpdatePasswordTabPanel';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    
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
    },
}));

function UpdateProfile(props) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleClose() {
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
            style={{ minHeight: "400px" }}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }}
            classes={{ paper: classes.dialog }}>
            <DialogTitle id="scroll-dialog-title">
                <div className={classes.icons}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize="large" />
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
                            aria-label="scrollable auto tabs example">
                            <Tab label="Update info" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                </div>
            </DialogTitle>
            <DialogContent dividers={true}>
                <UpdateInfoTabPanel value={value} index={0}></UpdateInfoTabPanel>
                <UpdatePasswordTabPanel value={value} index={1}></UpdatePasswordTabPanel>
            </DialogContent>
            <DialogActions alignItems="center">
            </DialogActions>
        </Dialog>
    )
}

export default UpdateProfile;