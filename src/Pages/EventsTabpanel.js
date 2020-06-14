import React from 'react';
import Button from '@material-ui/core/Button';
import EventCard from '../Components/EventCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';



function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    }
}));

function EventsTabPanel(props) {
    const { children, value, url, index, ...other } = props;
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = function () {
        setOpen(true);
    }
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                    <EventCard click={handleClick} url={url}></EventCard>
                    <EventCard url={url}></EventCard>
                    <EventCard url={url}></EventCard>
                    <EventCard url={url}></EventCard>
                    <div>
                        <Dialog
                            open={open}
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

                        >
                            <DialogTitle id="scroll-dialog-title">
                                DevHack
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

                            </DialogTitle>
                            <DialogContent dividers={true}>
                                <DialogContentText
                                    id="scroll-dialog-description"
                                // ref={descriptionElementRef}
                                >
                                    <div>
                                        <Grid container component="main" className={classes.root}>
                                            <Grid item xs={12} sm={12} md={5} lg={3} elevation={6}>
                                                <Tabs
                                                    orientation="vertical"
                                                    variant="scrollable"
                                                    // value={value}
                                                    // onChange={handleChange}
                                                    aria-label="Vertical tabs example"
                                                    className={classes.tabs}
                                                >
                                                    <Tab label="About" {...a11yProps(0)} />
                                                    <Tab label="Prizes" {...a11yProps(1)} />
                                                    <Tab label="Item Three" {...a11yProps(2)} />
                                                </Tabs>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={7} lg={7} elevation={6}>
                                                <Typography>Hello</Typography>
                                            </Grid>

                                        </Grid>


                                    </div>

                                </DialogContentText>
                            </DialogContent>
                            {/* <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
                            </Button>
                        </DialogActions> */}
                        </Dialog>
                    </div>

                </div>

            )}
        </div>
    );
}

export default EventsTabPanel;