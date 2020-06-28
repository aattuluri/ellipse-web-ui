import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import EventCard from '../Components/EventCard';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import ShareIcon from '@material-ui/icons/Share';
import Paper from '@material-ui/core/Paper';
import EventPost from './EventPost';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import DialogActions from '@material-ui/core/DialogActions';
// import EventDetailsTab from './EventDetails';
import AppBar from '@material-ui/core/AppBar';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

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

    },
    rpaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.primary.light,
        margin: theme.spacing(1),
        position: 'sticky',
        top: theme.spacing(10),
        zIndex: 3,
        // borderRadius: theme.spacing(50)
    },
    postButton: {
        borderRadius: theme.spacing(50)
    },
    root: {
        background: theme.palette.primary.light,
        position: 'sticky',
        top: theme.spacing(10),
        marginLeft: theme.spacing(1),
        bottom: 0,
        zIndex: 3,
    },
    root2: {
        marginTop: theme.spacing(5),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        borderRadius: theme.spacing(2)
    },
    filterTextField: {
        padding: theme.spacing(1),
        height: theme.spacing(5)
    },
    filterButton: {
        margin: theme.spacing(1),
        width: theme.spacing(10),
        borderRadius: theme.spacing(50)
    }

}));

function EventsTabPanel({ history }) {
    // const { children, value, url, index, ...other } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    // const url = user.imageUrl;
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [allEvents, setAllEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState("");
    const [sortDate, setSortDate] = React.useState(null);
    const [sortType, setSortType] = React.useState(null);
    const [sortEventMode, setSortEventMode] = React.useState(null);
    const [sortCollegeType, setSortCollegeType] = React.useState("");
    const [sortedEventsArray, setSortedEventsArray] = React.useState([]);
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [finalEvents, setFinalEvents] = React.useState([]);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = function (id) {
        console.log(id);
        setSelectedEvent(id);
        setOpen(true);
        // history.push('eventdetails')
    }
    const handlePostButtonClick = () => {
        history.push('/post')
    }
    useEffect(() => {
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
                setFinalEvents(value);
            })
        })
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(allEvents);

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(checked);
        setChecked(newChecked);
    };


    console.log(checked);
    const handleSortDateChange = (date) => {
        console.log(date);
        setSortDate(date);
    };

    function handleSortEventModeChamge(event, value) {
        console.log(event);
        console.log(value);
    }

    function handleSortCollegeChange(event, value) {
        console.log(value)
        setSortCollegeType(value);
    }

    function handleSortApplyButton() {
        console.log(sortDate);
        console.log(checked);
        console.log(sortCollegeType);
        if (sortDate != null) {
            console.log(sortByDate(sortDate, allEvents));
            const dateSortedEvents = sortByDate(sortDate, allEvents)
            console.log(dateSortedEvents);
            setIsFiltered(true);
                setSortedEventsArray(dateSortedEvents);
            if(checked.length > 0){
                console.log(sortByMode(dateSortedEvents));
                const typeSortedEvents = sortByMode(dateSortedEvents);
                // isFiltered(true);
                setIsFiltered(true);
                setSortedEventsArray(typeSortedEvents);
            }
            // else{
            //     setIsFiltered(true);
            //     console.log(sortedEventsArray);
            //     setSortedEventsArray(dateSortedEvents);
            // }
        }
        else if(checked.length > 0){
            const typeSortedEvents = sortByMode(allEvents);
            // console.log(sortByMode(allEvents));
            setIsFiltered(true);
            setSortedEventsArray(typeSortedEvents);
        }

        setFinalEvents(sortedEventsArray);
        console.log(sortedEventsArray);
        console.log(finalEvents);
    }

    function sortByDate(date, tEvents) {
        var sDEvents = [];
        tEvents.forEach(async sevent => {
            const x = `${date.getDate()}` + date.getMonth() + date.getFullYear();
            const d = new Date(sevent.start_time);
            const y = `${d.getDate()}` + d.getMonth() + d.getFullYear();
            console.log(y);
            if (x == y) {
                console.log(sevent);
                sDEvents.push(sevent);
                // setSDEvents(sDEvents =>[
                //     ...sDEvents,sevent
                // ])
                // setIsFiltered(true);
            }
            console.log(sortedEventsArray);
        })
        console.log(sDEvents);
        return sDEvents;
    }
    function sortByMode(sEvents){
        var sortedEvents = [];
        console.log(sEvents);
        sEvents.forEach(sevent =>{
            console.log(checked);
            console.log(sevent.eventMode);
            if(checked.includes(sevent.eventMode)){
                console.log("ddd");
                sortedEvents.push(sevent);
            }
        })
        console.log(sortedEvents);
        return sortedEvents;
    }

    function handlesortDiscardButton() {
        setSortedEventsArray([]);
        setSortEventMode(null);
        setIsFiltered(false);
        // setChecked(null);
    }
    console.log(sortedEventsArray);
    console.log(allEvents);
    console.log(finalEvents);
    return (
        <div>
            <Grid container component="main">
                <Grid item xs={12} sm={12} md={3} lg={2} spacing={2} style={{ padding: "10px" }}>
                    <Paper className={classes.root}>
                        <Typography index={0}>Filters</Typography>
                        {/* <TextField className={classes.filterTextField} variant='standard' label="By Date" fullWidth></TextField> */}
                        {/* <form>

                        </form> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                //   minDate={Date.now()}
                                fullWidth
                                required
                                variant="inline"
                                format="dd MMM yyyy"
                                margin="normal"
                                id="startDate"
                                label="Event Start Date"
                                name="startDate"
                                defaultValue=''
                                value={sortDate}
                                onChange={handleSortDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>


                        <FormControl fullWidth >
                            <InputLabel htmlFor="outlined-age-native-simple">Sort By</InputLabel>
                            <Select
                                fullWidth
                                native
                                label="Event Mode"
                                onChange={handleSortEventModeChamge}
                                inputProps={{
                                    name: 'sortBy',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value="eventSortDate">Event Start Date</option>
                                <option value="recentlyAdded">Recently added</option>
                            </Select>
                        </FormControl>
                        <Typography style={{ paddingTop: "10px" }}>Event Mode</Typography>
                        <List className={classes.root}>
                            {["online", "offline"].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                color="default"
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value} />

                                    </ListItem>
                                );
                            })}
                        </List>

                        <Typography>College</Typography>
                        <RadioGroup aria-label="address" name="address" defaultValue="All" onChange={handleSortCollegeChange} style={{ display: "inline" }}>
                            <List className={classes.root}>
                                {["All", `${user.collegeName}`].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                            <ListItemIcon>
                                                <FormControlLabel value={value} control={<Radio color="default" />} label={value} />
                                            </ListItemIcon>
                                            {/* <ListItemText id={labelId} primary={value} /> */}

                                        </ListItem>
                                    );
                                })}
                            </List>

                        </RadioGroup>

                        <Button className={classes.filterButton} onClick={handleSortApplyButton} variant="contained" > Apply </Button>
                        <Button className={classes.filterButton} onClick={handlesortDiscardButton} variant="contained">Discard</Button>
                    </Paper>

                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={8} spacing={2}>
                    {
                        isFiltered ? sortedEventsArray.map((event, index) => {
                            return (
                                <EventCard
                                    click={handleClick}
                                    url={user.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    eventId={event}
                                >

                                </EventCard>)
                        }) : allEvents.map((event, index) => {
                            return (
                                <EventCard
                                    click={handleClick}
                                    url={user.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    eventId={event}
                                >

                                </EventCard>)
                        })}
                    {/* <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard>
                    <EventCard click={handleClick} url ={user.imageUrl}></EventCard> */}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={2} spacing={5}>
                    <Paper className={classes.rpaper}>
                        <Button
                            onClick={handlePostButtonClick}
                            variant="contained"
                            fullWidth
                            size="large"
                            className={classes.postButton} >
                            Post Event
                        </Button>
                        <List className={classes.root2}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary">
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Summer BBQ"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                to Scott, Alex, Jennifer
                                            </Typography>
                                            {" — Wish I could come, but I'm out of town this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>


                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Oui Oui"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Sandra Adams
                                            </Typography>
                                            {' — Do you have Paris recommendations? Have you ever…'}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Oui Oui"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Sandra Adams
                                            </Typography>
                                            {' — Do you have Paris recommendations? Have you ever…'}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Oui Oui"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Sandra Adams
                                            </Typography>
                                            {' — Do you have Paris recommendations? Have you ever…'}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>

                    </Paper>


                </Grid>
            </Grid>
            <div>
                {/* <EventDetailsTab a = {true}></EventDetailsTab> */}
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
                        <img height="160" width="150" src={selectedEvent.poster}></img>
                        <DialogContentText
                            id="scroll-dialog-description"
                            // ref={descriptionElementRef}
                            tabIndex={-1}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                >
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                    <Tab label="Item Four" {...a11yProps(3)} />
                                    <Tab label="Item Five" {...a11yProps(4)} />
                                    <Tab label="Item Six" {...a11yProps(5)} />
                                    <Tab label="Item Seven" {...a11yProps(6)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Five
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                Item Six
                            </TabPanel>
                            <TabPanel value={value} index={6}>
                                Item Seven
                            </TabPanel>

                            {[...new Array(50)]
                                .map(
                                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                )
                                .join('\n')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Register
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>



    );
}

export default withRouter(EventsTabPanel);



 //             <Grid item xs={12} sm={12} md={9} lg={6} spacing={2} className={classes.flex_col_scroll}>
            //             <GridList cellHeight={160} className={classes.gridList} cols={3}>

            //   <GridListTile  cols={3}>
            //   <EventCard></EventCard>
            //   </GridListTile>
            //   <GridListTile  cols={3}>
        //       <EventCard></EventCard>
        //       </GridListTile>
        //       <GridListTile  cols={3}>
        //       <EventCard></EventCard>
        //       </GridListTile>
        //       <GridListTile  cols={3}>
        //       <EventCard></EventCard>
        //       </GridListTile>
        //       <GridListTile  cols={3}>
        //       <EventCard></EventCard>
        //       </GridListTile>

        //   </GridList>

        //                     {/* <EventCard click={handleClick}></EventCard>
        //                     <EventCard></EventCard>
        //                     <EventCard></EventCard>
        //                     <EventCard></EventCard>
        //                     <EventCard></EventCard>
        //                     <EventCard></EventCard> */}

        //                 </Grid>
        //                 <Grid item xs={12} sm={12} md={4} lg={3} spacing={5}>
        //                     <Paper className={classes.rpaper}>
        //                         <Button onClick={handlePostButtonClick} variant="contained" size="large" className={classes.postButton} >Post Event</Button>
        //                     </Paper>
        //                     <List className={classes.root}>
        //                         <ListItem alignItems="flex-start">
        //                             <ListItemAvatar>
        //                                 <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        //                             </ListItemAvatar>
        //                             <ListItemText
        //                                 primary="Brunch this weekend?"
        //                                 secondary={
        //                                     <React.Fragment>
        //                                         <Typography
        //                                             component="span"
        //                                             variant="body2"
        //                                             className={classes.inline}
        //                                             color="textPrimary"
        //                                         >
        //                                             Ali Connors
        //                                         </Typography>
        //                                         {" — I'll be in your neighborhood doing errands this…"}
        //                                     </React.Fragment>
        //                                 }
        //                             />
        //                         </ListItem>
        //                         <Divider variant="inset" component="li" />
        //                         <ListItem alignItems="flex-start">
        //                             <ListItemAvatar>
        //                                 <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        //                             </ListItemAvatar>
        //                             <ListItemText
        //                                 primary="Summer BBQ"
        //                                 secondary={
        //                                     <React.Fragment>
        //                                         <Typography
        //                                             component="span"
        //                                             variant="body2"
        //                                             className={classes.inline}
        //                                             color="textPrimary"
        //                                         >
        //                                             to Scott, Alex, Jennifer
        //                                         </Typography>
        //                                         {" — Wish I could come, but I'm out of town this…"}
        //                                     </React.Fragment>
        //                                 }
        //                             />
        //                         </ListItem>
        //                         <Divider variant="inset" component="li" />
        //                         <ListItem alignItems="flex-start">
        //                             <ListItemAvatar>
        //                                 <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        //                             </ListItemAvatar>
        //                             <ListItemText
        //                                 primary="Oui Oui"
        //                                 secondary={
        //                                     <React.Fragment>
        //                                         <Typography
        //                                             component="span"
        //                                             variant="body2"
        //                                             className={classes.inline}
        //                                             color="textPrimary"
        //                                         >
        //                                             Sandra Adams
        //                                         </Typography>
        //                                         {' — Do you have Paris recommendations? Have you ever…'}
        //                                     </React.Fragment>
        //                                 }
        //                             />
        //                         </ListItem>
        //                     </List>

        //                 </Grid>
        //             </Grid>


        //                     {/* <DialogActions>
        //                         <Button onClick={handleClose} color="primary">
        //                             Cancel
        //                         </Button>
        //                         <Button onClick={handleClose} color="primary">
        //                             Subscribe
        //                         </Button>
        //                     </DialogActions> */}
        //                 </Dialog>
        //             </div>

        //         </div>

        //         {/* )} */}
        //     </div>