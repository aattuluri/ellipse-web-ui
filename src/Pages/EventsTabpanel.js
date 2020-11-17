import React from 'react';
import Button from '@material-ui/core/Button';
import EventCard from '../Components/EventCard';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withRouter} from "react-router";
import List from '@material-ui/core/List';
import EventsDialog from '../Components/EventsDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SortLeftPanel from '../Components/SortLeftPanel';
import MobileSortPanel from '../Components/MobileSortPanel';
import ImageDialog from '../Components/ImageDialog';
// import EventsContext from '../EventsContext';
// import Skeleton from '@material-ui/lab/Skeleton';
// import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
// import GridListEvents from '../Components/GridListEvents';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ActiveEventsContext from '../ActiveEventsContext';

import FeedBackDialog from '../Components/FeedBackDialog';
// function a11yProps(index) {
//     return {
//         id: `scrollable-auto-tab-${index}`,
//         'aria-controls': `scrollable-auto-tabpanel-${index}`,
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
        height: '89vh',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        top: theme.spacing(10),
        // zIndex: 3,
        // borderRadius: theme.spacing(50)
    },
    subRpaper: {
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',

    },
    postButton: {
        borderRadius: theme.spacing(50),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        // color: theme.palette.primary.main
        backgroundColor: theme.palette.primary.main
    },
    root: {
        background: theme.palette.primary.light,
        position: 'sticky',
        top: theme.spacing(10),
        marginLeft: theme.spacing(1),
        // height: '89vh',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        // bottom: 0,
        // zIndex: 3,
    },
    leftSubPaper: {
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',
        [theme.breakpoints.down('md')]: {
            maxHeight: '78vh',
        },
    },
    root2: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(0),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        minHeight: 300,
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    filterTextField: {
        padding: theme.spacing(1),
        height: theme.spacing(5)
    },
    filterButton: {
        margin: theme.spacing(1),
        width: theme.spacing(10),
        borderRadius: theme.spacing(50)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 10,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    mobileFilterButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    skeleton: {
        textDecorationColor: theme.palette.primary.dark,
    },
    feedBackButton: {
        borderRadius: theme.spacing(50),
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        paddingBottom: theme.spacing(1)
    }

}));

function EventsTabPanel({ history }) {
    localStorage.setItem('tabIndex',0);
    // const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    // const url = user.imageUrl;
    const token = localStorage.getItem('token');
    const {currentUser} = React.useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    // const [allEvents, setAllEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState("");
    const [sortStartDate, setSortStartDate] = React.useState(null);
    const [sortEndDate, setSortEndDate] = React.useState(null);
    // const [sortType, setSortType] = React.useState(null);
    // const [sortEventMode, setSortEventMode] = React.useState(null);
    const [sortCollegeType, setSortCollegeType] = React.useState("All");
    const [sortedEventsArray, setSortedEventsArray] = React.useState([]);
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [feeSortChecked, setFeeSortChecked] = React.useState([0]);
    const [modeSortChecked, setModeSortChecked] = React.useState([0]);
    const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
    // const [selectedImage, setSelectedImage] = React.useState(null);
    const {activeEvents} = React.useContext(ActiveEventsContext);
    const [registerdEvents, setRegisteredEvents] = React.useState([]);
    const [feedBackOpen,setFeedBackOpen] = React.useState(false);

    

    React.useEffect(() => {
        // console.log(allEvents);
        setRegisteredEvents(activeEvents.filter((value) => value.registered === true))
    }, [activeEvents])
    // console.log(registerdEvents);
    if (!token) {
        // return <Redirect to="/" />;
        history.replace("/")
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = function (event, image) {
        // console.log(id);
        setSelectedEvent(event);
        // setSelectedImage(image);
        setOpen(true);
        // history.push('eventdetails')
    }
    const handlePostButtonClick = () => {
        history.push('/post')
    }

    const handleSortDateChange = (date) => {
        console.log(date);
        setSortStartDate(date);
    };
    const handleEndSortDateChange = (date) => {
        setSortEndDate(date);
    }

    const handleFeedBackButtonClick = () =>{
        setFeedBackOpen(true);
    }

    const closeFeedBckDialog = () =>{
        setFeedBackOpen(false);
    }

    // function handleSortEventModeChamge(event, value) {
    //     console.log(event);
    //     console.log(value);
    // }
    // console.log(allEvents);
    function handleSortCollegeChange(event, value) {
        setSortCollegeType(value);
    }
    async function handleSortApplyButton() {
        // console.log(sortStartDate);
        // console.log(modeSortChecked);
        // console.log(sortCollegeType);
        // console.log(sortCollegeType);
        //     console.log(user);
        setFilterDialogOpen(false);
        if (sortStartDate != null && sortEndDate != null) {
            const dateRangeSortedEvents = sortByDateRange(sortStartDate, sortEndDate, activeEvents);
            setSortedEventsArray(dateRangeSortedEvents);
            setIsFiltered(true);
            if (modeSortChecked.length > 1) {
                console.log(sortByMode(dateRangeSortedEvents));
                const typeSortedEvents = sortByMode(dateRangeSortedEvents);
                setSortedEventsArray(typeSortedEvents);
                setIsFiltered(true);
                if (feeSortChecked.length > 1) {
                    const feeSortedEvents = sortByCost(typeSortedEvents);
                    setSortedEventsArray(feeSortedEvents);
                    setIsFiltered(true);
                    if (sortCollegeType === currentUser.college_name) {
                        const collegeSortedEvents = sortByCollege(feeSortedEvents);
                        setSortedEventsArray(collegeSortedEvents);
                        setIsFiltered(true);
                    }
                }
            }
            else if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(dateRangeSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
                if (sortCollegeType === currentUser.college_name) {
                    const collegeSortedEvents = sortByCollege(feeSortedEvents);
                    setSortedEventsArray(collegeSortedEvents);
                    setIsFiltered(true);
                }
            }
            else if (sortCollegeType === currentUser.collegeName) {
                const collegeSortedEvents = sortByCollege(dateRangeSortedEvents);
                setSortedEventsArray(collegeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (sortStartDate != null) {
            const dateSortedEvents = await sortByDate(sortStartDate, activeEvents)
            setSortedEventsArray(dateSortedEvents);
            setIsFiltered(true);
            if (modeSortChecked.length > 1) {
                console.log(sortByMode(dateSortedEvents));
                const typeSortedEvents = sortByMode(dateSortedEvents);
                setSortedEventsArray(typeSortedEvents);
                setIsFiltered(true);
                if (feeSortChecked.length > 1) {
                    const feeSortedEvents = sortByCost(dateSortedEvents);
                    setSortedEventsArray(feeSortedEvents);
                    setIsFiltered(true);
                    if (sortCollegeType === currentUser.collegeName) {
                        const collegeSortedEvents = sortByCollege(feeSortedEvents);
                        setSortedEventsArray(collegeSortedEvents);
                        setIsFiltered(true);
                    }
                }
            }
            else if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(dateSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
                if (sortCollegeType === currentUser.collegeName) {
                    const collegeSortedEvents = sortByCollege(feeSortedEvents);
                    setSortedEventsArray(collegeSortedEvents);
                    setIsFiltered(true);
                }
            }
            else if (sortCollegeType === currentUser.collegeName) {
                const collegeSortedEvents = sortByCollege(dateSortedEvents);
                setSortedEventsArray(collegeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (modeSortChecked.length > 1) {
            const typeSortedEvents = sortByMode(activeEvents);
            // console.log(sortByMode(activeEvents));

            setSortedEventsArray(typeSortedEvents);
            setIsFiltered(true);
            if (feeSortChecked.length > 1) {
                const feeSortedEvents = sortByCost(typeSortedEvents);
                setSortedEventsArray(feeSortedEvents);
                setIsFiltered(true);
            }
        }
        else if (feeSortChecked.length > 1) {
            const feeSortedEvents = sortByCost(activeEvents);
            setSortedEventsArray(feeSortedEvents);
            setIsFiltered(true);
        }
        else if (sortCollegeType === currentUser.college_name) {
            // console.log(sortCollegeType);
            // console.log(currentUser.college_name);
            const collegeSortedEvents = sortByCollege(activeEvents);
            setSortedEventsArray(collegeSortedEvents);
            setIsFiltered(true);
        }
    }

    function sortByDateRange(date1, date2, sEvents) {
        var sortedEvents = [];
        // console.log(typeof (date1));
        // console.log(typeof (date1));
        sEvents.forEach(sEvent => {
            const d = new Date(sEvent.start_time);
            if (date1.getTime() <= d.getTime() && d.getTime() <= date2.getTime()) {
                sortedEvents.push(sEvent);
            }
        })
        return sortedEvents;
    }

    function sortByDate(date, tEvents) {
        var sDEvents = [];
        tEvents.forEach(async sevent => {
            const x = `${date.getDate()}` + date.getMonth() + date.getFullYear();
            const d = new Date(sevent.start_time);
            const y = `${d.getDate()}` + d.getMonth() + d.getFullYear();
            console.log(y);
            if (x === y) {
                console.log(sevent);
                sDEvents.push(sevent);
            }
            // console.log(sortedEventsArray);
        })
        // console.log(sDEvents);
        return sDEvents;
    }
    function sortByMode(sEvents) {
        var sortedEvents = [];
        sEvents.forEach(sevent => {
            if (modeSortChecked.includes(sevent.event_mode)) {
                console.log("ddd");
                sortedEvents.push(sevent);
            }
        })
        // console.log(sortedEvents);
        return sortedEvents;
    }

    function sortByCost(sEvents) {
        var sortedEvents = [];
        sEvents.forEach(sevent => {
            if (feeSortChecked.includes(sevent.fee_type)) {
                sortedEvents.push(sevent);
            }
        })
        return sortedEvents;
    }

    function sortByCollege(sEvents) {
        var sortedEvents = [];
        sEvents.forEach(sevent => {
            
            if (currentUser.college_name === sevent.college_name) {
                sortedEvents.push(sevent);
            }
        })
        return sortedEvents;
    }

    function handlesortDiscardButton() {
        setModeSortChecked([0])
        setFeeSortChecked([0])
        setSortedEventsArray([]);
        setSortStartDate(null);
        setSortEndDate(null);
        setIsFiltered(false);
        setFilterDialogOpen(false);
        setSortCollegeType("All")
        // setChecked(null);
    }
    function handlefilterButtonClicked() {
        setFilterDialogOpen(true);
    }
    function handleFilterClose() {
        setFilterDialogOpen(false);
    }
    function handleImageDialogClose() {
        setImageDialogOpen(false);
    }
    function handleImageDialogOpen(event) {
        // console.log(image);
        setSelectedEvent(event);
        setImageDialogOpen(true);
    }

    function handleRegistrationButton(event) {
        setSelectedEvent(event);
        history.push('/event/register/' + event._id);
    }

    const handleRegisterdEventClick = (event) => () => {
        setSelectedEvent(event);
        setOpen(true);

    }

    return (
        <div>
            <Grid container component="main" style={{marginBottom: "50px"}}>
                <Grid item xs={false} md={3} lg={2} style={{ padding: "10px" }} >
                    <Paper className={classes.root}>
                        <Paper className={classes.leftSubPaper}>
                            <SortLeftPanel
                                handleSortDateChange={handleSortDateChange}
                                sortStartDate={sortStartDate}
                                handleEndSortDateChange={handleEndSortDateChange}
                                sortEndDate={sortEndDate}
                                handleSortCollegeChange={handleSortCollegeChange}
                                feeChecked={feeSortChecked}
                                modeChecked={modeSortChecked}
                                sortCollgeType={sortCollegeType}
                                setFeeChecked={setFeeSortChecked}
                                setModeChecked={setModeSortChecked}
                                handleSortApplyButton={handleSortApplyButton}
                                handlesortDiscardButton={handlesortDiscardButton}>
                            </SortLeftPanel>
                        </Paper>
                    </Paper>
                    <Button className={classes.mobileFilterButton} variant="outlined" onClick={handlefilterButtonClicked} >Filters</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={8}>
                    {/* <Typography variant="h5" style={{ paddingTop: '5px' }}>
                        Your College Events
                    </Typography>
                    <GridListEvents click={handleClick} events={allEvents.filter((event) => event.college_name === user.college_name)} ></GridListEvents> */}
                    <Typography variant="h5" style={{ paddingTop: '5px',paddingBottom: '7px' }}>
                        {/* Active Events */}
                    </Typography>
                    {/* {activeEvents.length === 0 && <div>
                        <Skeleton variant="rect" animation="wave" height={118} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <br></br><br></br>
                        <Skeleton variant="rect" animation="wave" height={118} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </div>} */}
                    {
                        activeEvents.length === 0 && <Typography align="center">No events, check back later</Typography>
                    }
                    {
                        isFiltered ? sortedEventsArray.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={handleClick}
                                    url={currentUser.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    event={event}
                                    feeType={event.feesType}
                                    imageDialog={handleImageDialogOpen}
                                    handleReg={handleRegistrationButton}
                                    eventId={event}
                                >
                                </EventCard>)
                        }) : activeEvents.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    click={handleClick}
                                    url={currentUser.imageUrl}
                                    name={event.name}
                                    startTime={event.start_time}
                                    endTime={event.finish_time}
                                    eventMode={event.eventMode}
                                    eventType={event.eventType}
                                    regEndTime={event.registrationEndTime}
                                    eventId={event}
                                    feeType={event.feesType}
                                    imageDialog={handleImageDialogOpen}
                                    handleReg={handleRegistrationButton}
                                    event={event}
                                >
                                </EventCard>)
                        })}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={2} >
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handlePostButtonClick}>
                        <AddIcon />
                    </Fab>
                    <Paper className={classes.rpaper}>
                        <Paper className={classes.subRpaper}>
                            <Button
                                onClick={handlePostButtonClick}
                                variant="contained"
                                fullWidth
                                size="large"
                                className={classes.postButton} >
                                Post Event
                            </Button>
                            <List className={classes.root2}>
                                
                                <Typography variant="body2">Registered Events</Typography>
                                {
                                    registerdEvents.map((event, index) => {
                                        return <React.Fragment key={index} >
                                        <ListItem onClick={handleRegisterdEventClick(event)} key={index} button>
                                            <ListItemAvatar>
                                                <Avatar  variant="square"
                                                    alt={event.name}
                                                    src={process.env.REACT_APP_API_URL+`/api/image?id=${event.poster_url}`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText  primary={event.name} />
                                            
                                        </ListItem>
                                        <Divider  /></React.Fragment>
                                    })
                                }
                            </List>
                            <Button
                                onClick={handleFeedBackButtonClick}
                                variant="outlined"
                                fullWidth
                                size="large"
                                className={classes.feedBackButton}>
                                Report Bug/Feedback
                            </Button>
                        </Paper>
                    </Paper>
                </Grid>
            
            </Grid>
            <div>
            <FeedBackDialog open={feedBackOpen} handleClose={closeFeedBckDialog}></FeedBackDialog>
                {open && <EventsDialog
                    open={open}
                    event={selectedEvent}
                    // imageUrl={selectedImage}
                    handleClose={handleClose}
                    handleReg={handleRegistrationButton}
                    imageDialog={handleImageDialogOpen}
                >
                </EventsDialog>}
                <ImageDialog
                    // image={selectedImage}
                    event={selectedEvent}
                    open={imageDialogOpen}
                    handleClose={handleImageDialogClose}>
                </ImageDialog>
                <Dialog
                    open={filterDialogOpen}
                    onClose={handleFilterClose}
                    fullWidth={true}
                    scroll="paper"
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth="sm" PaperProps={{
                        style: {
                            backgroundColor: "#1C1C1E",
                            boxShadow: 'none',
                        },
                    }}>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogContent>
                        <MobileSortPanel
                            handleSortDateChange={handleSortDateChange}
                            sortStartDate={sortStartDate}
                            handleEndSortDateChange={handleEndSortDateChange}
                            sortEndDate={sortEndDate}
                            handleSortCollegeChange={handleSortCollegeChange}
                            feeChecked={feeSortChecked}
                            modeChecked={modeSortChecked}
                            setFeeChecked={setFeeSortChecked}
                            setModeChecked={setModeSortChecked}
                            handleSortApplyButton={handleSortApplyButton}
                            handlesortDiscardButton={handlesortDiscardButton}>
                        </MobileSortPanel>
                    </DialogContent>
                </Dialog>
            </div>
        </div>



    );
}

export default withRouter(EventsTabPanel);

